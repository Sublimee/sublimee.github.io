import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_TEST_PORT ?? 4173);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.001,
      pathTemplate: "{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}-{platform}{ext}",
      scale: "css",
      threshold: 0.2,
    },
  },
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer: {
    command: `node tools/static-server.mjs --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
