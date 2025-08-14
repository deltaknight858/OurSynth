import { test, expect } from '@playwright/test';

// Test persistent Halo Scrollbar states in TimeMachine

test.describe('HaloScrollArea Scrollbar', () => {
  test('default state', async ({ page }) => {
    await page.goto('/studio');
    const area = page.locator('.HaloScrollArea');
    await expect(area).toBeVisible();
    await expect(area).toHaveScreenshot('scrollbar-default.png');
  });

  test('hover state', async ({ page }) => {
    await page.goto('/studio');
    const area = page.locator('.HaloScrollArea');
    await area.hover();
    await expect(area).toHaveScreenshot('scrollbar-hover.png');
  });

  test('isScrolling state', async ({ page }) => {
    await page.goto('/studio');
    const area = page.locator('.HaloScrollArea');
    await area.evaluate(el => { el.scrollTop = 100; });
    await expect(area).toHaveScreenshot('scrollbar-scrolling.png');
  });

  test('reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/studio');
    const area = page.locator('.HaloScrollArea');
    await expect(area).toHaveScreenshot('scrollbar-reduced-motion.png');
  });
});
