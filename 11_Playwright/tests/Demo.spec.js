import { test, expect } from '@playwright/test';

test('สามารถ login ด้วย Credentials ที่ถูกต้อง', async ({ page }) => {
    //1. ไปหน้า Login 
    await page.goto('http://saucedemo.com');

    //2. กรอก credentials (Playwright รอให้ field พร้อมก่อน auto)
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    //3. คลิก login button
    await page.click('#login-button');

    //4. ตรวจว่า login สำเร็จ
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
});





// Playwright Test จัดการ Browser + Context ให้อัตโนมัติ
// เราแค่ใช้ { page } ที่ inject มาให้
test('auto managed', async ({ page }) => {
  await page.goto('/');   // ใช้ page ได้เลย
});

// ถ้าต้องการ multi-tab — ใช้ context
test('multi tab scenario', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();
  await page1.goto('/cart');
  await page2.goto('/wishlist');
});

// Multi-user scenario — context แยกกัน = session แยกกัน
test('admin and user', async ({ browser }) => {
  const adminCtx = await browser.newContext({ storageState: 'admin.json' });
  const userCtx  = await browser.newContext({ storageState: 'user.json' });
  // admin และ user login แยกกัน ไม่กระทบกัน
});





// ทดสอบ API โดยตรง — ไม่ต้องผ่าน browser
test('GET /posts returns 100 items', async ({ request }) => {
  const response = await request.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveLength(100);
  expect(data[0]).toHaveProperty('title');
});

// UI + API ใน test เดียว — ทรงพลังมาก!
test('login แล้ว verify API response', async ({ page }) => {
  // Mock API
  await page.route('**/api/user', route =>
    route.fulfill({ json: { name: 'Test User', role: 'admin' } })
  );
  await page.goto('/dashboard');
  // UI แสดงข้อมูลจาก mocked API
  await expect(page.locator('.username')).toHaveText('Test User');
});





const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await (await browser.newContext()).newPage();
        
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => {
      const f = request.failure();
      console.log('REQUEST FAILED:', request.url(), f && f.errorText);
    });

    await page.goto('http://localhost:8080/Dashboard.html', { waitUntil: 'networkidle' });
    await new Promise(r => setTimeout(r, 2000));
        
    await browser.close();
    console.log('Done');
  } catch (e) {
    console.log('TEST SCRIPT ERROR:', e);
  }
})();
