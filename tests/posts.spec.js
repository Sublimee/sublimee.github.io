import {expect, test} from "@playwright/test";
import {readFile} from "node:fs/promises";

const posts = JSON.parse(await readFile(new URL("../posts/posts.json", import.meta.url), "utf8"));

for (const post of posts) {
    test(`post page renders metadata and local media: ${post.url}`, async ({page}) => {
        await page.goto(post.url);

        await expect(page.locator("article.post h1")).toHaveText(post.title);
        await expect(page.locator("article.post time")).toHaveAttribute("datetime", post.date);
        await expect(page.locator(".brand")).toHaveAttribute("href", "/");
        await expect(page.locator(".post-top-link")).toHaveAttribute("href", "../index.html");
        await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute("href", "/favicon-32x32.png");
        await expect(page.locator('link[rel="apple-touch-icon"][sizes="180x180"]')).toHaveAttribute(
            "href",
            "/apple-touch-icon.png",
        );

        const brokenImages = await page.locator("img").evaluateAll((images) =>
            images
                .filter((image) => !image.complete || image.naturalWidth === 0)
                .map((image) => image.getAttribute("src")),
        );
        expect(brokenImages).toEqual([]);

        await page.locator(".post-top-link").click();
        await expect(page).toHaveURL(/\/index\.html$/);
        await expect(page.locator(".article-item")).toHaveCount(posts.length);

        await page.goto(post.url);
        await page.locator(".back-link").click();
        await expect(page).toHaveURL(/\/index\.html$/);
        await expect(page.locator(".article-item")).toHaveCount(posts.length);
    });
}

for (const post of posts) {
    test(`post page exposes the expected header: ${post.url}`, async ({page}) => {
        const consoleErrors = [];
        page.on("console", (message) => {
            if (message.type() === "error") {
                consoleErrors.push(message.text());
            }
        });

        await page.goto(post.url);

        await expect(page).toHaveTitle(/.+ \| magusev\.ru/);
        await expect(page.locator(".brand")).toHaveText("magusev.ru");

        const header = page.locator(".site-header");
        await expect(header.getByRole("link", {name: "Telegram", exact: true})).toHaveAttribute(
            "href",
            "https://t.me/senior_junior_dev",
        );
        await expect(header.getByRole("link", {name: "LinkedIn", exact: true})).toHaveAttribute(
            "href",
            "https://www.linkedin.com/in/maksim-gusev-b70670b1/",
        );
        await expect(header.getByRole("link", {name: "Резюме", exact: true})).toHaveAttribute(
            "href",
            "/Gusev_Maksim_CV.pdf",
        );

        for (const link of await header.locator(".social-link").all()) {
            await expect(link).toHaveAttribute("target", "_blank");
            await expect(link).toHaveAttribute("rel", /noreferrer/);
            await expect(link).toHaveAttribute("rel", /noopener/);
        }

        expect(consoleErrors).toEqual([]);
    });
}
