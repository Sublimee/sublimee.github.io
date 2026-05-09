import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const posts = JSON.parse(await readFile(new URL("../posts/posts.json", import.meta.url), "utf8"));
const sortedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

test("home page loads the blog index from posts.json", async ({ page }) => {
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("/");

  await expect(page).toHaveTitle("magusev.ru");
  await expect(page.locator(".brand")).toHaveText("magusev.ru");
  await expect(page.locator("#articles-empty")).toBeHidden();

  const articles = page.locator(".article-item");
  await expect(articles).toHaveCount(sortedPosts.length);

  for (const [index, post] of sortedPosts.entries()) {
    const article = articles.nth(index);

    await expect(article.locator(".article-title")).toHaveText(post.title);
    await expect(article.locator(".article-description")).toHaveText(post.description);
    await expect(article.locator("time")).toHaveAttribute("datetime", post.date);
    await expect(article.locator("a.article-link")).toHaveAttribute("href", post.url);
  }

  expect(consoleErrors).toEqual([]);
});

test("header exposes the expected social links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Telegram" })).toHaveAttribute(
    "href",
    "https://t.me/senior_junior_dev",
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/maksim-gusev-b70670b1/",
  );

  for (const link of await page.locator(".social-link").all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noreferrer/);
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
});

test("article list shows an empty state when posts cannot be loaded", async ({ page }) => {
  await page.route("**/posts/posts.json", (route) =>
    route.fulfill({
      body: "{}",
      contentType: "application/json",
      status: 500,
    }),
  );

  await page.goto("/");

  await expect(page.locator(".article-item")).toHaveCount(0);
  await expect(page.locator("#articles-empty")).toBeVisible();
});

test("home page fits a mobile viewport without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.locator(".article-item")).toHaveCount(sortedPosts.length);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});
