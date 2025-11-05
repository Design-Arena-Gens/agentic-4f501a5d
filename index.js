import puppeteer from 'puppeteer';

async function searchYouTube() {
  console.log('Launching browser...');

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();

    console.log('Navigating to YouTube...');
    await page.goto('https://www.youtube.com', { waitUntil: 'networkidle2' });

    console.log('Waiting for search box...');
    await page.waitForSelector('input#search', { timeout: 10000 });

    console.log('Typing search query...');
    await page.type('input#search', 'How to make vegan dishes?', { delay: 100 });

    console.log('Clicking search button...');
    await page.click('button#search-icon-legacy');

    console.log('Waiting for search results...');
    await page.waitForSelector('ytd-video-renderer', { timeout: 10000 });

    console.log('Search completed successfully!');
    console.log('Browser will remain open. Press Ctrl+C to close.');

    // Keep browser open
    await new Promise(() => {});

  } catch (error) {
    console.error('Error:', error.message);
    await browser.close();
    process.exit(1);
  }
}

searchYouTube();
