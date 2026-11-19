// @ts-nocheck
// @ts-ignore
import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/why-fiab',
  '/team-members',
  '/careers',
  '/blog/is-your-financial-model-worthless',
  '/contact-us',
];

const VIEWPORT_WIDTHS = [1440, 768, 375];

const LONG_TEXT = 'A'.repeat(120);

for (const route of ROUTES) {
  test.describe(`Text overflow check: ${route}`, () => {
    for (const width of VIEWPORT_WIDTHS) {
      test(`no horizontal overflow at width ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(route, { waitUntil: 'domcontentloaded' });

        await page.evaluate((text) => {
          const targets = document.querySelectorAll('h1, h2, h3, p, .eyebrow');
          targets.forEach((el) => {
            el.textContent = text;
          });
        }, LONG_TEXT);

        const { scrollWidth, innerWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
        }));

        expect(scrollWidth).toBeLessThanOrEqual(innerWidth);
      });
    }
  });
}
