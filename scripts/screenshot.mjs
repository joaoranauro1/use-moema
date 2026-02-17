import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, "..", "screenshots");
mkdirSync(outDir, { recursive: true });

const mode = process.argv[2] || "sections";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

if (mode === "full") {
  await page.screenshot({ path: resolve(outDir, "full-page.png"), fullPage: true });
  console.log("Saved: screenshots/full-page.png");
} else {
  // Capture viewport screenshots scrolling through the page
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = 900;
  const steps = Math.ceil(totalHeight / viewportHeight);

  for (let i = 0; i < steps; i++) {
    const y = i * viewportHeight;
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(500);
    const name = `section-${String(i + 1).padStart(2, "0")}.png`;
    await page.screenshot({ path: resolve(outDir, name) });
    console.log(`Saved: screenshots/${name}`);
  }
}

await browser.close();
