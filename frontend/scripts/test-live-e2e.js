const puppeteer = require('puppeteer-core');
const path = require('path');

async function runTest() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const beforeImg = path.resolve(__dirname, '..', '..', 'before-submit.png');
  const afterImg = path.resolve(__dirname, '..', '..', 'after-submit.png');

  console.log("Launching headless Chrome...");
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 });

  // Capture console messages
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  // Capture network requests/responses
  page.on('requestfailed', request => {
    console.error(`[BROWSER NETWORK FAIL] ${request.method()} ${request.url()} - ${request.failure().errorText}`);
  });
  page.on('response', response => {
    if (response.url().includes('/api/client-service-feedback')) {
      console.log(`[BROWSER NETWORK API] ${response.status()} ${response.url()}`);
    }
  });

  try {
    console.log("Navigating to live feedback page...");
    await page.goto('https://9jobs.co/client-service-feedback', { waitUntil: 'networkidle2' });

    console.log("Taking before-submit screenshot...");
    await page.screenshot({ path: beforeImg });
    console.log(`Saved: ${beforeImg}`);

    console.log("Filling out feedback form...");
    await page.type('input[name="full_name"]', 'Live E2E Tester');
    
    // Select the 5th star
    // The stars are buttons. Let's select the 5th button inside the star rating container.
    // In our code: button tag with aria-label="Rate 5 stars" (or similar)
    const starButtons = await page.$$('button[aria-label^="Rate"]');
    if (starButtons.length >= 5) {
      console.log("Clicking 5th star button...");
      await starButtons[4].click();
    } else {
      console.log("Star buttons not found, clicking fallback selector...");
      await page.click('button[aria-label="Rate 5 stars"]');
    }

    await page.type('textarea[name="experience_message"]', 'Excellent service! Highly recommend working with 9Jobs for all recruitment and resume needs in Australia.');

    console.log("Submitting form...");
    // Click submit button
    await page.click('button[type="submit"]');

    console.log("Waiting for success screen to render...");
    // The success screen renders a page-title "Thank You for Your Feedback!"
    await page.waitForFunction(
      () => document.body.innerText.includes("Thank You for Your Feedback!"),
      { timeout: 10000 }
    );

    console.log("Taking after-submit success screenshot...");
    await page.screenshot({ path: afterImg });
    console.log(`Saved: ${afterImg}`);

    console.log("E2E Test completed successfully!");
  } catch (err) {
    console.error("Test failed:", err.message);
  } finally {
    await browser.close();
  }
}

runTest();
