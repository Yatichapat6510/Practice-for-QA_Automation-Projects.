/*
 * ==========================================================================
 * validation.js : ทำความสะอาดและตรวจสอบข้อมูล Test Case
 * ==========================================================================
 * แยก 2 ขั้นตอนชัดเจน
 * 1) normalizeTestCase()  แปลงข้อมูลดิบ (จากฟอร์ม / ไฟล์ JSON) ให้อยู่ในรูปแบบมาตรฐาน
 *                         เช่น ตัดช่องว่าง, แปลงแท็กเป็น array, แปลง checkbox เป็น boolean
 * 2) validateTestCase()   ตรวจตามกฎ คืน { valid, errors } โดย errors = { ชื่อช่อง: "ข้อความ" }
 *
 * ทำไมต้องตรวจใน JS ทั้งที่ HTML มี required/minlength แล้ว?
 * - ข้อมูลไม่ได้มาจากฟอร์มอย่างเดียว (นำเข้าไฟล์ JSON, localStorage ที่ถูกแก้)
 * - ผู้ใช้ปิด/แก้ attribute ใน DevTools ได้ ตรวจฝั่ง JS เสมอจึงปลอดภัยกว่า
 *
 * ไฟล์นี้เป็น "pure function" ไม่แตะหน้าเว็บ (DOM) -> เขียน unit test ได้ง่าย
 * ==========================================================================
 */

import { LIMITS, MODULES, PRIORITIES, STATUSES } from "./constants.js";
import { parseTags } from "./utils.js";

/**
 * @typedef {Object} TestCaseData   (JSDoc: อธิบายรูปร่างข้อมูล editor จะช่วยเติมโค้ดให้)
 * @property {string} title
 * @property {string} module
 * @property {"high"|"medium"|"low"} priority
 * @property {"not-run"|"pass"|"fail"|"blocked"} status
 * @property {string} steps
 * @property {string} expected
 * @property {string[]} tags
 * @property {string} plannedDate   "" หรือ "YYYY-MM-DD"
 * @property {boolean} automated
 */

/**
 * แปลงข้อมูลดิบให้เป็นรูปแบบมาตรฐาน
 * ?? (nullish coalescing) = ถ้าค่าซ้ายเป็น null/undefined ใช้ค่าขวา
 *   ต่างจาก || ที่ใช้ค่าขวาเมื่อค่าซ้ายเป็น falsy ทุกชนิด (รวมถึง "" และ 0)
 *
 * @param {Record<string, unknown>} raw
 * @returns {TestCaseData}
 */
export function normalizeTestCase(raw = {}) {
	const text = (value) => String(value ?? "").trim();

	return {
		title: text(raw.title),
		module: text(raw.module),
		priority: text(raw.priority),
		status: text(raw.status) || "not-run", // ไม่ระบุสถานะ = ยังไม่ทดสอบ
		steps: text(raw.steps),
		expected: text(raw.expected),
		// Array.isArray: ข้อมูลจาก JSON เป็น array อยู่แล้ว / จากฟอร์มเป็นข้อความ "a, b"
		tags: Array.isArray(raw.tags) ? parseTags(raw.tags.join(",")) : parseTags(raw.tags ?? ""),
		plannedDate: text(raw.plannedDate),
		automated: raw.automated === true || raw.automated === "on" || raw.automated === "true",
	};
}

/**
 * ตรวจข้อมูลตามกฎ
 * Object.hasOwn(obj, key): ตรวจว่ามี key นี้ "ในตัวออบเจ็กต์เอง"
 * (ปลอดภัยกว่า key in obj เพราะ "toString" in STATUSES ก็เป็น true จาก prototype)
 *
 * @param {TestCaseData} data
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateTestCase(data) {
	const errors = {};

	if (data.title.length < LIMITS.titleMin) {
		errors.title = `ชื่อเคสต้องมีอย่างน้อย ${LIMITS.titleMin} ตัวอักษร`;
	} else if (data.title.length > LIMITS.titleMax) {
		errors.title = `ชื่อเคสต้องไม่เกิน ${LIMITS.titleMax} ตัวอักษร`;
	}

	if (!MODULES.includes(data.module)) {
		errors.module = "กรุณาเลือกโมดูล";
	}

	if (!Object.hasOwn(PRIORITIES, data.priority)) {
		errors.priority = "กรุณาเลือกระดับความสำคัญ";
	}

	if (!Object.hasOwn(STATUSES, data.status)) {
		errors.status = "สถานะไม่ถูกต้อง";
	}

	if (data.steps === "") {
		errors.steps = "กรุณากรอกขั้นตอนการทดสอบ";
	}

	if (data.expected === "") {
		errors.expected = "กรุณากรอกผลลัพธ์ที่คาดหวัง";
	}

	if (data.tags.length > LIMITS.maxTags) {
		errors.tags = `ใส่แท็กได้ไม่เกิน ${LIMITS.maxTags} แท็ก`;
	} else if (data.tags.some((tag) => !/^[\p{L}\p{M}\p{N}_-]+$/u.test(tag))) {
		// \p{L} = ตัวอักษรทุกภาษา, \p{M} = สระ/วรรณยุกต์ที่ซ้อนบนล่าง (เช่น ็ ่ ิ ในภาษาไทย)
		// \p{N} = ตัวเลข  ต้องมี flag u (unicode) จึงใช้ \p{...} ได้
		errors.tags = "แท็กใช้ได้เฉพาะตัวอักษร ตัวเลข - และ _";
	}

	// /^\d{4}-\d{2}-\d{2}$/ = รูปแบบ YYYY-MM-DD
	if (data.plannedDate !== "" && (!/^\d{4}-\d{2}-\d{2}$/.test(data.plannedDate) || Number.isNaN(Date.parse(data.plannedDate)))) {
		errors.plannedDate = "รูปแบบวันที่ไม่ถูกต้อง";
	}

	return { valid: Object.keys(errors).length === 0, errors };
}
