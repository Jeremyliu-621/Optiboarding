const puppeteer = require('C:/Users/jerem/CODE2026/personal-projects/Optiboarding/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');

const TOKENS = [
  '--color-canvas-default',
  '--color-canvas-subtle',
  '--color-canvas-inset',
  '--color-border-default',
  '--color-border-muted',
  '--color-fg-default',
  '--color-fg-muted',
  '--color-fg-on-emphasis',
  '--color-accent-fg',
  '--color-accent-emphasis',
  '--color-success-fg',
  '--color-success-emphasis',
  '--color-attention-fg',
  '--color-attention-subtle',
  '--color-danger-fg',
  '--color-danger-subtle',
  '--color-done-fg',
  '--color-done-emphasis',
  '--color-done-subtle',
  '--color-diff-blob-deletion-num-bg',
  '--color-diff-blob-addition-num-bg',
];

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to GitHub PR page...');
  // Use a known public PR page
  await page.goto('https://github.com/torvalds/linux/pull/1064', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  console.log('Forcing dark mode via data attributes...');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark');
    document.documentElement.setAttribute('data-dark-theme', 'dark');
  });

  // Wait for styles to apply
  await new Promise(r => setTimeout(r, 2000));

  console.log('Extracting CSS custom properties...');
  const tokens = await page.evaluate((tokenList) => {
    const style = getComputedStyle(document.documentElement);
    const result = {};
    for (const token of tokenList) {
      result[token] = style.getPropertyValue(token).trim();
    }
    return result;
  }, TOKENS);

  console.log('\n=== GITHUB DARK MODE CSS TOKENS ===\n');
  for (const [token, value] of Object.entries(tokens)) {
    console.log(`${token}: ${value}`);
  }

  // Also try to get some additional tokens that might be useful
  console.log('\n=== ADDITIONAL DIFF TOKENS ===\n');
  const extraTokens = await page.evaluate(() => {
    const style = getComputedStyle(document.documentElement);
    const extra = [
      '--color-diff-blob-deletion-line-bg',
      '--color-diff-blob-addition-line-bg',
      '--color-diff-blob-deletion-word-bg',
      '--color-diff-blob-addition-word-bg',
      '--color-neutral-muted',
      '--color-neutral-subtle',
      '--color-scale-gray-0',
      '--color-scale-gray-1',
      '--color-scale-gray-2',
      '--color-scale-gray-3',
      '--color-scale-gray-9',
      '--color-scale-gray-8',
      '--color-scale-gray-7',
    ];
    const result = {};
    for (const token of extra) {
      result[token] = style.getPropertyValue(token).trim();
    }
    return result;
  });

  for (const [token, value] of Object.entries(extraTokens)) {
    console.log(`${token}: ${value}`);
  }

  // Take screenshot
  console.log('\nTaking screenshot...');
  const screenshotPath = 'C:/Users/jerem/CODE2026/personal-projects/Optiboarding/screenshot-github-dark.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`Screenshot saved to: ${screenshotPath}`);

  // Also check computed background colors on actual elements to verify
  console.log('\n=== COMPUTED STYLES ON ACTUAL ELEMENTS ===\n');
  const elementStyles = await page.evaluate(() => {
    const results = {};

    // Body/main bg
    const body = document.body;
    results['body-bg'] = getComputedStyle(body).backgroundColor;

    // Try to find a PR comment box
    const commentBox = document.querySelector('.comment-body, .js-comment-body, [class*="comment"]');
    if (commentBox) {
      results['comment-bg'] = getComputedStyle(commentBox).backgroundColor;
      results['comment-border'] = getComputedStyle(commentBox).borderColor;
    }

    // PR header / title area
    const prTitle = document.querySelector('.js-issue-title, h1.gh-header-title');
    if (prTitle) {
      results['pr-title-color'] = getComputedStyle(prTitle).color;
    }

    // Labels/badges
    const badge = document.querySelector('.State, .gh-header-meta .State');
    if (badge) {
      results['badge-bg'] = getComputedStyle(badge).backgroundColor;
      results['badge-color'] = getComputedStyle(badge).color;
    }

    return results;
  });

  for (const [key, value] of Object.entries(elementStyles)) {
    console.log(`${key}: ${value}`);
  }

  // Save all results to a file
  const allResults = { tokens, extraTokens, elementStyles };
  fs.writeFileSync(
    'C:/Users/jerem/CODE2026/personal-projects/Optiboarding/dark-tokens-raw.json',
    JSON.stringify(allResults, null, 2)
  );
  console.log('\nResults saved to dark-tokens-raw.json');

  await browser.close();
  console.log('Done!');
})().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
