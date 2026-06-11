const puppeteer = require('puppeteer-core');
const path = require('path');

async function runTest() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const imgPath = 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\7e8b6701-d4d6-47eb-b0de-686a6340d6a7\\premium-success-screenshot.png';

  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1100 });

  page.on('console', msg => {
    console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  try {
    console.log("Navigating to live feedback page...");
    await page.goto('https://9jobs.co/client-service-feedback', { waitUntil: 'networkidle2' });

    console.log("Filling out feedback form...");
    await page.type('input[name="full_name"]', 'Premium UI Tester');
    
    // Select the 5th star button
    const starButtons = await page.$$('button[aria-label^="Rate"]');
    if (starButtons.length >= 5) {
      console.log("Clicking 5th star button...");
      await starButtons[4].click();
    } else {
      await page.click('button[aria-label="Rate 5 stars"]');
    }

    await page.type('textarea[name="experience_message"]', 'Testing the newly redesigned premium success screen.');

    console.log("Submitting form...");
    await page.click('button[type="submit"]');

    console.log("Waiting for success screen to render...");
    await page.waitForFunction(
      () => document.body.innerText.includes("Thank You for Your Feedback!"),
      { timeout: 10000 }
    );

    // Give it 1.5 seconds for transitions to complete
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Taking success screenshot...");
    await page.screenshot({ path: imgPath });
    console.log(`Saved screenshot to: ${imgPath}`);

    console.log("E2E verification completed successfully!");
  } catch (err) {
    console.error("Verification failed:", err.message);
  } finally {
    await browser.close();
  }
}

runTest();
