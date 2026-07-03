// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // ✅ กำหนด baseUrl — ไม่ต้องพิมพ์ full URL ทุกครั้ง
    baseUrl: 'https://www.saucedemo.com',

    // เวลารอ element (milliseconds) — default 4000
    defaultCommandTimeout: 6000,

    // บันทึก video ตอนรัน (ปิดไว้ก่อนเพื่อความเร็ว)
    video: false,

    // ถ่าย screenshot อัตโนมัติเมื่อ test fail
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // สำหรับ plugin เพิ่มเติม (ตอนนี้ปล่อยว่างไว้ก่อน)
    },
  },
})