const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const FFMPEG_EXE = 'C:\\Users\\USER\\AppData\\Roaming\\Python\\Python314\\site-packages\\imageio_ffmpeg\\binaries\\ffmpeg-win-x86_64-v7.1.exe';

const reels = [
  { id: '2073172209905679', name: '2026-06-16-reel.mp4' },
  { id: '994647379841554', name: '2026-06-14-reel.mp4' },
  { id: '1678972533228200', name: '2026-06-13-reel.mp4' },
  { id: '870653288812733', name: '2026-06-08-reel.mp4' }
];

function downloadFile(url, destPath) {
  const cleanUrl = url.replace(/&bytestart=\d+/, '').replace(/&byteend=\d+/, '');
  return new Promise((resolve, reject) => {
    https.get(cleanUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed: Status Code ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function processReel(reel) {
  console.log(`\n========================================`);
  console.log(`Processing Reel ID: ${reel.id} -> ${reel.name}`);
  console.log(`========================================`);

  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  const videoUrls = [];
  const audioUrls = [];

  page.on('response', (response) => {
    const url = response.url();
    const contentType = response.headers()['content-type'] || '';
    if (contentType.includes('video') || url.includes('mime=video') || url.includes('.mp4')) {
      const efgMatch = url.match(/efg=([^&]+)/);
      let efg = null;
      if (efgMatch) {
        try {
          const jsonStr = Buffer.from(decodeURIComponent(efgMatch[1]), 'base64').toString('utf8');
          efg = JSON.parse(jsonStr);
        } catch (e) {}
      }
      
      if (efg) {
        if (efg.vencode_tag && efg.vencode_tag.includes('audio')) {
          audioUrls.push({ url, efg });
        } else {
          videoUrls.push({ url, efg });
        }
      }
    }
  });

  try {
    const reelUrl = `https://www.facebook.com/reel/${reel.id}/`;
    console.log(`Navigating to ${reelUrl}...`);
    await page.goto(reelUrl, { waitUntil: 'networkidle2' });
    
    console.log("Waiting for media streams to play/load...");
    await new Promise(r => setTimeout(r, 12000));
  } catch (err) {
    console.error("Navigation error:", err);
  } finally {
    await browser.close();
  }

  // Find best video URL (highest bitrate)
  videoUrls.sort((a, b) => (b.efg.bitrate || 0) - (a.efg.bitrate || 0));
  const bestVideo = videoUrls[0];
  const bestAudio = audioUrls[0];

  if (!bestVideo || !bestAudio) {
    console.error(`Could not find video/audio streams for Reel ${reel.id}!`);
    console.log(`Videos found: ${videoUrls.length}, Audios found: ${audioUrls.length}`);
    return false;
  }

  console.log(`Best Video: ${bestVideo.efg.vencode_tag} | Bitrate: ${bestVideo.efg.bitrate}`);
  console.log(`Best Audio: ${bestAudio.efg.vencode_tag} | Bitrate: ${bestAudio.efg.bitrate}`);

  const tempVideoFile = path.join(__dirname, `temp_video_${reel.id}.mp4`);
  const tempAudioFile = path.join(__dirname, `temp_audio_${reel.id}.mp4`);
  const destDir = path.join(__dirname, '..', 'public', 'social-imports');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const mergedFile = path.join(destDir, reel.name);

  try {
    console.log("Downloading video stream...");
    await downloadFile(bestVideo.url, tempVideoFile);
    console.log("Downloading audio stream...");
    await downloadFile(bestAudio.url, tempAudioFile);

    console.log("Merging video and audio using ffmpeg...");
    const cmd = `"${FFMPEG_EXE}" -y -i "${tempVideoFile}" -i "${tempAudioFile}" -c:v libx264 -pix_fmt yuv420p -movflags +faststart -c:a aac -map 0:v:0 -map 1:a:0 "${mergedFile}"`;
    execSync(cmd, { stdio: 'ignore' });
    
    console.log(`Successfully saved merged video: ${mergedFile}`);
    console.log(`Final file size: ${fs.statSync(mergedFile).size} bytes`);
    return true;
  } catch (err) {
    console.error(`Failed to process Reel ${reel.id}:`, err.message);
    return false;
  } finally {
    if (fs.existsSync(tempVideoFile)) fs.unlinkSync(tempVideoFile);
    if (fs.existsSync(tempAudioFile)) fs.unlinkSync(tempAudioFile);
  }
}

async function main() {
  console.log("Starting download of all Facebook Reels...");
  let succeeded = 0;
  for (const reel of reels) {
    const success = await processReel(reel);
    if (success) succeeded++;
  }
  console.log(`\n========================================`);
  console.log(`Completed! Succeeded: ${succeeded}/${reels.length}`);
  console.log(`========================================`);
}

main().catch(console.error);
