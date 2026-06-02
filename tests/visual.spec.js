import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const posts = JSON.parse(await readFile(new URL("../posts/posts.json", import.meta.url), "utf8"));
const representativePost =
  posts.find((post) => post.url === "posts/boris-cherny-claude-code.html") ?? posts[0];

const desktopViewport = { width: 1280, height: 900 };
const mobileViewport = { width: 390, height: 844 };

test.describe("visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  test("home page desktop", async ({ page }) => {
    await openHomePage(page, desktopViewport);

    await expect(page).toHaveScreenshot("home-desktop.png", { fullPage: true });
  });

  test("home page mobile", async ({ page }) => {
    await openHomePage(page, mobileViewport);

    await expect(page).toHaveScreenshot("home-mobile.png", { fullPage: true });
  });

  test("post page desktop", async ({ page }) => {
    await openPostPage(page, desktopViewport);

    await expect(page).toHaveScreenshot("post-desktop.png", { fullPage: true });
  });

  test("post page mobile", async ({ page }) => {
    await openPostPage(page, mobileViewport);

    await expect(page).toHaveScreenshot("post-mobile.png", { fullPage: true });
  });
});

async function openHomePage(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto("/");
  await expect(page.locator(".article-item")).toHaveCount(posts.length);
  await waitForStableRender(page);
}

async function openPostPage(page, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(representativePost.url);
  await expect(page.locator("article.post h1")).toHaveText(representativePost.title);
  await waitForStableRender(page);
  await waitForImages(page);
}

async function waitForStableRender(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts?.ready.then(() => undefined));
}

async function waitForImages(page) {
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map((image) => {
        if (image.complete) {
          return undefined;
        }

        return new Promise((resolve, reject) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", reject, { once: true });
        });
      }),
    );

    const brokenImages = images
      .filter((image) => image.naturalWidth === 0)
      .map((image) => image.getAttribute("src"));

    if (brokenImages.length > 0) {
      throw new Error(`Broken images: ${brokenImages.join(", ")}`);
    }
  });
}
