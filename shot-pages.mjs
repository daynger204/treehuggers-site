import { chromium } from 'playwright';
import { mkdirSync } from 'fs';
import path from 'path';

const outDir = '/workspace/site-migration/rebuild-shots';
mkdirSync(outDir, { recursive: true });

const pages = [
  '/', '/what-we-do', '/caterpillars', '/fertilizer', '/emeraldashborer',
  '/dutch-elm', '/faq', '/links', '/book-now'
];
const widths = [1280, 390];
const base = 'http://127.0.0.1:4321';

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

for (const w of widths) {
  const context = await browser.newContext({
    viewport: { width: w, height: w === 390 ? 844 : 900 },
    deviceScaleFactor: w === 390 ? 2 : 1,
  });
  const page = await context.newPage();
  for (const p of pages) {
    const name = p === '/' ? 'home' : p.slice(1);
    const url = base + p;
    console.log('shot', w, url);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(outDir, `${name}_${w}.png`),
      fullPage: true,
    });
  }
  if (w === 390) {
    await page.goto(base + '/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    await page.click('[data-burger]');
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outDir, 'home_390_menu-open.png'), fullPage: true });
    await page.click('[data-open-services]');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, 'home_390_menu-services.png'), fullPage: true });
  }
  if (w === 1280) {
    await page.goto(base + '/', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(400);
    await page.hover('.nav-folder');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(outDir, 'home_1280_services-dropdown.png'), fullPage: false });
  }
  await context.close();
}

await browser.close();
console.log('done');
