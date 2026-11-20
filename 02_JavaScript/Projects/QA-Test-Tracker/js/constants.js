/*
 * ==========================================================================
 * constants.js : ค่าคงที่ที่ใช้ร่วมกันทั้งแอป
 * ==========================================================================
 * รวมค่าที่ใช้หลายไฟล์ไว้ที่เดียว ถ้าจะเพิ่มสถานะหรือโมดูลใหม่ แก้ที่ไฟล์นี้ไฟล์เดียว
 * (dropdown ในหน้าเว็บ, การตรวจข้อมูล, การนับสถิติ จะอัปเดตตามเอง)
 *
 * export      = ส่งค่าออกไปให้ไฟล์อื่นใช้
 * import      = ไฟล์อื่นดึงไปใช้ เช่น import { STATUSES } from "./constants.js";
 *               (ใน browser ต้องใส่นามสกุล .js เสมอ)
 * Object.freeze = ล็อกออบเจ็กต์ไม่ให้แก้ไข/เพิ่ม/ลบ property ป้องกันการแก้ค่าคงที่โดยไม่ตั้งใจ
 * ==========================================================================
 */

// key ที่ใช้เก็บข้อมูลใน localStorage (ใส่ prefix "qa-tracker:" กันชนกับเว็บอื่นบน localhost เดียวกัน)
export const STORAGE_KEYS = Object.freeze({
	cases: "qa-tracker:cases",
	theme: "qa-tracker:theme",
});

// สถานะของ Test Case  { ค่าที่เก็บในระบบ: "ข้อความที่แสดงผล" }
// ลำดับ key ในออบเจ็กต์ = ลำดับใน dropdown
export const STATUSES = Object.freeze({
	"not-run": "ยังไม่ทดสอบ",
	pass: "ผ่าน",
	fail: "ไม่ผ่าน",
	blocked: "ติดปัญหา",
});

export const PRIORITIES = Object.freeze({
	high: "สูง",
	medium: "กลาง",
	low: "ต่ำ",
});

// ใช้ตอนเรียงลำดับ: ตัวเลขน้อย = สำคัญกว่า
export const PRIORITY_ORDER = Object.freeze({ high: 0, medium: 1, low: 2 });

// โมดูลของระบบที่ทดสอบ (อ้างอิง Sauce Demo ที่ใช้ในโปรเจกต์ Playwright/Robot ของ repo นี้)
export const MODULES = Object.freeze(["Login", "Inventory", "Cart", "Checkout", "Other"]);

// ข้อจำกัดของข้อมูล (ใช้ทั้ง validation.js และตัวนับตัวอักษรใน main.js)
export const LIMITS = Object.freeze({
	titleMin: 5,
	titleMax: 100,
	maxTags: 5,
});

export const SAMPLE_DATA_URL = "data/sample-test-cases.json";
export const TOAST_DURATION_MS = 3000;
export const SEARCH_DEBOUNCE_MS = 250;
