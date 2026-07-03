import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce',
};

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test('should redirect to /inventory on successful login', async ({ page }) => {
    await page.fill('#user-name', CREDENTIALS.username);
    await page.fill('#password', CREDENTIALS.password);
    await page.click('#login-button');

    await expect(page).toHaveURL(`${BASE_URL}/inventory.html`);
  });

  test('should display inventory page header after login', async ({ page }) => {
    await page.fill('#user-name', CREDENTIALS.username);
    await page.fill('#password', CREDENTIALS.password);
    await page.click('#login-button');

    await expect(page.locator('.app_logo')).toBeVisible();
    await expect(page.locator('.inventory_container')).toBeVisible();
  });

  test('should show error on invalid credentials', async ({ page }) => {
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match'
    );
  });

  test('should show error when username is empty', async ({ page }) => {
    await page.fill('#password', CREDENTIALS.password);
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username is required'
    );
  });

  test('should show error when password is empty', async ({ page }) => {
    await page.fill('#user-name', CREDENTIALS.username);
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toContainText(
      'Password is required'
    );
  });
});
