import { test, expect } from "@playwright/test";

const WEB = process.env.WEB_URL ?? "http://localhost:5173";
const API = process.env.API_URL ?? "http://127.0.0.1:3000";

test("web UI returns orchestrated prompt (plain text)", async ({ page }) => {
  await page.goto(`${WEB}?api=${encodeURIComponent(API)}`);
  await page.selectOption("#target", "cursor");
  await page.fill("#prompt", "help me create a web application that can save songs and play them, use python + react + fastapi + postgres");
  await page.click("#go");
  await page.waitForSelector("#out");
  const text = await page.locator("#out").textContent();
  expect(text).toBeTruthy();
  expect(text).not.toContain("Error:");
  expect(text).toMatch(/System:|Prompt Orchestrator|Plan:/);
});

test("web UI returns JSON when mode is JSON", async ({ page }) => {
  await page.goto(`${WEB}?api=${encodeURIComponent(API)}`);
  await page.selectOption("#mode", "json");
  await page.selectOption("#target", "chatgpt");
  await page.fill("#prompt", "build a CRUD todo app with Next.js, Prisma, PostgreSQL");
  await page.click("#go");
  await page.waitForSelector("#out");
  const text = await page.locator("#out").textContent();
  expect(text).toBeTruthy();
  expect(() => JSON.parse(text!)).not.toThrow();
});

