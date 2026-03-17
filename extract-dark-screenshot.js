const puppeteer = require('C:/Users/jerem/CODE2026/personal-projects/Optiboarding/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  // Try a real PR that exists
  console.log('Navigating to a known GitHub PR...');
  await page.goto('https://github.com/facebook/react/pull/28072', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  // Force dark mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark');
    document.documentElement.setAttribute('data-dark-theme', 'dark');
    document.documentElement.setAttribute('data-light-theme', 'light');
  });

  await new Promise(r => setTimeout(r, 2000));

  const title = await page.title();
  console.log('Page title:', title);

  await page.screenshot({
    path: 'C:/Users/jerem/CODE2026/personal-projects/Optiboarding/screenshot-github-dark-pr.png',
    fullPage: false
  });
  console.log('Screenshot saved.');

  await browser.close();
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
