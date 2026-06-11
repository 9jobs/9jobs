const { execSync } = require('child_process');
const path = require('path');

function takeScreenshot(url, filename) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outputPath = path.resolve(__dirname, '..', '..', filename);
  
  console.log(`Taking screenshot of ${url} and saving to ${outputPath}...`);
  try {
    const cmd = `"${chromePath}" --headless=new --disable-gpu --screenshot="${outputPath}" --window-size=1280,1024 ${url}`;
    const out = execSync(cmd);
    console.log("Success:", out.toString());
  } catch (err) {
    console.error("Error executing chrome:", err.message);
    if (err.stderr) {
      console.error("Stderr:", err.stderr.toString());
    }
  }
}

// Take screenshot of the feedback page before submit
takeScreenshot('https://9jobs.co/client-service-feedback', 'before-submit.png');
