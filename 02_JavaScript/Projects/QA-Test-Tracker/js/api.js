/*
 * ==========================================================================
 * api.js : โหลดข้อมูลจากภายนอก (fetch และอ่านไฟล์)
 * ==========================================================================
 * Asynchronous (ทำงานแบบไม่รอ): การโหลดข้อมูลใช้เวลา ถ้ารอแบบปกติหน้าเว็บจะค้าง
 * JS จึงให้ผลลัพธ์เป็น Promise ("สัญญาว่าจะได้ค่าในอนาคต")
 *
 * async function  = ฟังก์ชันที่คืน Promise เสมอ และใช้ await ข้างในได้
 * await promise   = หยุดรอ (เฉพาะในฟังก์ชันนี้) จน Promise เสร็จ แล้วได้ค่าออกมา
 * try / catch     = จับ error จาก await (เช่น เน็ตหลุด, ไฟล์ไม่มี, JSON เสีย)
 *
 * เขียนแบบ .then() ก็ได้ผลเหมือนกัน แต่ async/await อ่านง่ายกว่า:
 *   fetch(url).then((res) => res.json()).then((data) => ...).catch((err) => ...)
 * ==========================================================================
 */

import { SAMPLE_DATA_URL } from "./constants.js";
import { wait } from "./utils.js";

/**
 * โหลดข้อมูลตัวอย่างจากไฟล์ JSON ด้วย fetch
 * @param {string} url
 * @returns {Promise<object[]>}
 */
export async function fetchSampleCases(url = SAMPLE_DATA_URL) {
	// จำลองเครือข่ายช้า เพื่อให้เห็นสถานะ "กำลังโหลด..." บนปุ่ม (ระบบจริงไม่ต้องมี)
	await wait(600);

	// AbortSignal.timeout(5000): ยกเลิกเองถ้าเกิน 5 วินาที ไม่ให้รอตลอดไป
	const response = await fetch(url, { signal: AbortSignal.timeout(5000) });

	// fetch ไม่ throw เมื่อได้ HTTP 404/500 ต้องตรวจ response.ok เอง (true เมื่อ status 200-299)
	if (!response.ok) {
		throw new Error(`โหลดข้อมูลไม่สำเร็จ (HTTP ${response.status})`);
	}

	const data = await response.json(); // แปลง body เป็นออบเจ็กต์ (ก็เป็น Promise เหมือนกัน)
	return extractTestCases(data);
}

/**
 * อ่านไฟล์ JSON ที่ผู้ใช้เลือกจาก <input type="file">
 * file.text() คืน Promise<string> (แบบเก่าใช้ FileReader + onload)
 * @param {File} file
 * @returns {Promise<object[]>}
 */
export async function readJsonFile(file) {
	if (!file) {
		throw new Error("ยังไม่ได้เลือกไฟล์");
	}
	if (file.size > 1024 * 1024) {
		throw new Error("ไฟล์ใหญ่เกิน 1MB");
	}

	const text = await file.text();
	let data;
	try {
		data = JSON.parse(text);
	} catch {
		// catch แบบไม่ใส่ตัวแปร ใช้เมื่อไม่ต้องการรายละเอียด error
		throw new Error("ไฟล์ไม่ใช่ JSON ที่ถูกต้อง");
	}
	return extractTestCases(data);
}

/**
 * รองรับ 2 รูปแบบ: [ ... ] หรือ { "testCases": [ ... ] } (รูปแบบที่ปุ่มส่งออกสร้าง)
 * @param {unknown} data
 */
function extractTestCases(data) {
	const list = Array.isArray(data) ? data : data?.testCases;
	if (!Array.isArray(list)) {
		throw new Error('รูปแบบข้อมูลไม่ถูกต้อง ต้องเป็น array หรือ { "testCases": [...] }');
	}
	return list;
}
