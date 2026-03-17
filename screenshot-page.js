const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait 3 seconds for animations/fonts to settle
  await new Promise(r => setTimeout(r, 3000));

  // Screenshot 1: Hero section (top of page)
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot-hero.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Hero screenshot saved');

  // Get full page height
  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Full page height:', fullHeight);

  // Screenshot 2: Middle section
  const midScroll = Math.floor(fullHeight * 0.35);
  await page.evaluate((y) => window.scrollTo(0, y), midScroll);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot-middle.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Middle screenshot saved');

  // Screenshot 3: Lower middle (testimonials/features)
  const lowerScroll = Math.floor(fullHeight * 0.65);
  await page.evaluate((y) => window.scrollTo(0, y), lowerScroll);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot-lower.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Lower screenshot saved');

  // Screenshot 4: Footer
  await page.evaluate((maxY) => window.scrollTo(0, maxY), fullHeight);
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: 'screenshot-footer.png', clip: { x: 0, y: 0, width: 1440, height: 900 } });
  console.log('Footer screenshot saved');

  // Full page screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'screenshot-fullpage.png', fullPage: true });
  console.log('Full page screenshot saved');

  await browser.close();
  console.log('Done.');
})();
