const puppeteer = require('C:/Users/jerem/CODE2026/personal-projects/Optiboarding/node_modules/puppeteer');
const fs = require('fs');

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
  '--color-diff-blob-deletion-line-bg',
  '--color-diff-blob-addition-line-bg',
  '--color-diff-blob-deletion-word-bg',
  '--color-diff-blob-addition-word-bg',
  '--color-neutral-muted',
  '--color-neutral-subtle',
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
  await page.goto('https://github.com/torvalds/linux/pull/1064', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  console.log('Forcing dark mode and waiting for style application...');
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-color-mode', 'dark');
    document.documentElement.setAttribute('data-dark-theme', 'dark');
    document.documentElement.setAttribute('data-light-theme', 'light');
  });

  // Wait for CSS to re-apply
  await new Promise(r => setTimeout(r, 3000));

  console.log('Checking current data attributes on <html>...');
  const attrs = await page.evaluate(() => {
    const el = document.documentElement;
    return {
      'data-color-mode': el.getAttribute('data-color-mode'),
      'data-dark-theme': el.getAttribute('data-dark-theme'),
      'data-light-theme': el.getAttribute('data-light-theme'),
    };
  });
  console.log('Attributes:', attrs);

  // Strategy: inject a test div with dark-mode context and read computed values
  console.log('\nExtracting tokens by reading computed style on html element after dark mode...');

  const tokens = await page.evaluate((tokenList) => {
    // Try reading from html element which has the data attributes
    const html = document.documentElement;
    const style = getComputedStyle(html);

    const result = {};
    for (const token of tokenList) {
      const val = style.getPropertyValue(token).trim();
      result[token] = val || null;
    }
    return result;
  }, TOKENS);

  // If still empty, try injecting a probe element
  const allEmpty = Object.values(tokens).every(v => !v);
  console.log('All empty from root?', allEmpty);

  if (allEmpty) {
    console.log('\nTrying probe element approach...');
    const probeTokens = await page.evaluate((tokenList) => {
      // Create a probe element inside the page body
      const probe = document.createElement('div');
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      document.body.appendChild(probe);

      const style = getComputedStyle(probe);
      const result = {};
      for (const token of tokenList) {
        result[token] = style.getPropertyValue(token).trim();
      }
      document.body.removeChild(probe);
      return result;
    }, TOKENS);

    console.log('\n=== Probe element results ===');
    for (const [t, v] of Object.entries(probeTokens)) {
      console.log(`${t}: "${v}"`);
    }
  }

  // Try extracting from actual CSS stylesheets
  console.log('\nSearching CSS stylesheets for dark-theme rules...');
  const cssTokens = await page.evaluate((tokenList) => {
    const result = {};
    const sheets = Array.from(document.styleSheets);

    for (const sheet of sheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule.cssText && (
            rule.cssText.includes('dark') ||
            rule.cssText.includes('data-color-mode')
          )) {
            const text = rule.cssText;
            for (const token of tokenList) {
              if (text.includes(token) && !result[token]) {
                // Extract the value
                const re = new RegExp(token.replace(/[-]/g, '\\$&') + '\\s*:\\s*([^;]+);');
                const match = text.match(re);
                if (match) {
                  result[token] = match[1].trim();
                }
              }
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheet, skip
      }
    }
    return result;
  }, TOKENS);

  console.log('\n=== CSS Stylesheet extraction ===');
  for (const [t, v] of Object.entries(cssTokens)) {
    console.log(`${t}: ${v}`);
  }

  // Try reading the actual body background to verify dark mode is active
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('\nBody background (computed):', bodyBg);

  // Get the actual :root style after dark mode
  console.log('\nTrying window.getComputedStyle on html directly for CSS vars...');
  const rootVarsCheck = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    // Try a few we know exist
    return {
      test1: s.getPropertyValue('--color-canvas-default'),
      test2: s.getPropertyValue('--color-fg-default'),
      test3: s.getPropertyValue('--bgColor-default'),
      test4: s.getPropertyValue('--fgColor-default'),
      test5: s.getPropertyValue('--color-primer-fg-disabled'),
    };
  });
  console.log('Root var check:', rootVarsCheck);

  // Try GitHub's newer token names
  console.log('\nTrying GitHub Primer v2 token names...');
  const v2Tokens = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    const names = [
      '--bgColor-default',
      '--bgColor-muted',
      '--bgColor-subtle',
      '--bgColor-inset',
      '--fgColor-default',
      '--fgColor-muted',
      '--fgColor-link',
      '--borderColor-default',
      '--borderColor-muted',
      '--bgColor-open-emphasis',
      '--bgColor-closed-emphasis',
      '--bgColor-done-emphasis',
      '--bgColor-merged-emphasis',
      '--fgColor-open',
      '--fgColor-closed',
      '--fgColor-done',
      '--fgColor-merged',
      '--bgColor-success-emphasis',
      '--bgColor-danger-emphasis',
      '--bgColor-attention-emphasis',
      '--fgColor-success',
      '--fgColor-danger',
      '--fgColor-attention',
      '--bgColor-success-muted',
      '--bgColor-danger-muted',
      '--bgColor-attention-muted',
      '--diffBlob-deletion-bgColor-line',
      '--diffBlob-addition-bgColor-line',
      '--diffBlob-deletion-bgColor-num',
      '--diffBlob-addition-bgColor-num',
      '--diffBlob-deletion-fgColor-num',
      '--diffBlob-addition-fgColor-num',
      '--diffBlob-deletion-bgColor-word',
      '--diffBlob-addition-bgColor-word',
    ];
    const result = {};
    for (const n of names) {
      result[n] = s.getPropertyValue(n).trim();
    }
    return result;
  });

  console.log('\n=== GitHub Primer v2 tokens ===');
  for (const [t, v] of Object.entries(v2Tokens)) {
    if (v) console.log(`${t}: ${v}`);
  }

  // Take screenshot after dark mode
  console.log('\nTaking screenshot...');
  await page.screenshot({ path: 'C:/Users/jerem/CODE2026/personal-projects/Optiboarding/screenshot-github-dark.png' });
  console.log('Screenshot saved.');

  // Get ALL CSS custom properties from the page
  console.log('\nExtracting ALL CSS custom properties from computed style...');
  const allProps = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    const props = {};
    // Modern browsers expose all props via this
    for (let i = 0; i < s.length; i++) {
      const name = s[i];
      if (name.startsWith('--')) {
        props[name] = s.getPropertyValue(name).trim();
      }
    }
    return props;
  });

  const propCount = Object.keys(allProps).length;
  console.log(`Found ${propCount} CSS custom properties`);

  // Filter to color-related ones
  const colorProps = {};
  for (const [k, v] of Object.entries(allProps)) {
    if (k.includes('color') || k.includes('bg') || k.includes('fg') || k.includes('border') || k.includes('diff')) {
      colorProps[k] = v;
    }
  }

  console.log('\n=== All color-related CSS vars ===');
  for (const [k, v] of Object.entries(colorProps)) {
    console.log(`${k}: ${v}`);
  }

  // Save everything
  fs.writeFileSync(
    'C:/Users/jerem/CODE2026/personal-projects/Optiboarding/dark-tokens-full.json',
    JSON.stringify({ tokens, cssTokens, v2Tokens, allProps, bodyBg }, null, 2)
  );
  console.log('\nAll results saved to dark-tokens-full.json');

  await browser.close();
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
