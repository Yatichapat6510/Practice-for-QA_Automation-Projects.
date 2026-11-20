/*
 * ==========================================================================
 * utils.js : ฟังก์ชันช่วยเหลือทั่วไป (ไม่ผูกกับหน้าเว็บนี้ นำไปใช้โปรเจกต์อื่นได้)
 * ==========================================================================
 * generateId     สร้างรหัสไม่ซ้ำ              (crypto.randomUUID, optional chaining ?.)
 * formatDateTime แปลงวันที่เป็นภาษาไทย        (Intl.DateTimeFormat)
 * formatDate     แปลงเฉพาะวันที่
 * todayISO       วันที่วันนี้แบบ YYYY-MM-DD
 * debounce       หน่วงการเรียกฟังก์ชัน         (closure + setTimeout)
 * wait           รอเวลาแบบ Promise             (Promise + async/await)
 * parseTags      แปลง "a, b, a" -> ["a","b"]   (split, map, filter, Set)
 * percent        คำนวณเปอร์เซ็นต์ กันหารด้วย 0
 * downloadFile   สร้างไฟล์ให้ดาวน์โหลด          (Blob + URL.createObjectURL)
 * ==========================================================================
 */

/**
 * สร้าง id ไม่ซ้ำ
 * crypto?.randomUUID: ?. (optional chaining) ถ้า crypto ไม่มี จะได้ undefined แทนการ error
 * crypto.randomUUID ใช้ได้เฉพาะ https หรือ localhost จึงมีแผนสำรอง
 * @returns {string}
 */
export function generateId() {
	if (typeof globalThis.crypto?.randomUUID === "function") {
		return crypto.randomUUID();
	}
	// แผนสำรอง: เวลาปัจจุบัน + เลขสุ่ม แปลงเป็นฐาน 36 (0-9a-z) ให้สั้นลง
	return `tc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// สร้าง formatter ครั้งเดียวแล้วใช้ซ้ำ (เร็วกว่าสร้างใหม่ทุกครั้ง)
// "th-TH" = รูปแบบไทย ปีเป็น พ.ศ. อัตโนมัติ
const dateTimeFormatter = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" });
const dateFormatter = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" });

/**
 * @param {string} isoString เช่น "2026-11-18T09:30:00.000Z"
 * @returns {string} เช่น "18 พ.ย. 2569 16:30"
 */
export function formatDateTime(isoString) {
	const date = new Date(isoString);
	// new Date("ขยะ") ไม่ error แต่ได้ Invalid Date -> getTime() เป็น NaN
	return Number.isNaN(date.getTime()) ? "-" : dateTimeFormatter.format(date);
}

/**
 * @param {string} dateString รูปแบบ "YYYY-MM-DD" จาก <input type="date">
 */
export function formatDate(dateString) {
	// ใส่ T00:00 เพื่อให้ตีความเป็นเวลาท้องถิ่น (ถ้าไม่ใส่ JS ตีความเป็น UTC อาจเลื่อนวัน)
	const date = new Date(`${dateString}T00:00`);
	return Number.isNaN(date.getTime()) ? "-" : dateFormatter.format(date);
}

/** วันที่วันนี้ตามเวลาท้องถิ่น รูปแบบ YYYY-MM-DD (ใช้ตั้งชื่อไฟล์ export) */
export function todayISO() {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() เริ่มที่ 0
	const day = String(now.getDate()).padStart(2, "0");
	return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Debounce: เรียก fn เมื่อหยุดเรียกไปแล้ว delay มิลลิวินาที
 * ใช้กับช่องค้นหา: พิมพ์ "login" 5 ตัว -> ค้นหา 1 ครั้งตอนหยุดพิมพ์ แทนการค้น 5 ครั้ง
 *
 * Closure: ตัวแปร timerId ถูก "จำ" ไว้ในฟังก์ชันที่ return ออกไป
 * เรียกกี่ครั้งก็ใช้ timerId ตัวเดิม จึงยกเลิกตัวจับเวลาก่อนหน้าได้
 *
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
	let timerId;
	return (...args) => {
		// ...args (rest parameter) รับอาร์กิวเมนต์ทั้งหมดเป็น array
		clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay); // ...args (spread) กระจายกลับเป็นอาร์กิวเมนต์
	};
}

/**
 * รอเวลา: await wait(500) = หยุดรอ 0.5 วินาที (ไม่บล็อกหน้าเว็บ)
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * แปลงข้อความแท็กเป็น array ที่สะอาด
 * " Smoke, ui ,, smoke " -> ["smoke", "ui"]
 * @param {string} text
 * @returns {string[]}
 */
export function parseTags(text) {
	const tags = String(text)
		.split(",") // ["  Smoke", " ui ", "", " smoke "]
		.map((tag) => tag.trim().toLowerCase()) // ["smoke", "ui", "", "smoke"]
		.filter(Boolean); // ตัดค่าว่าง (falsy) ออก -> ["smoke", "ui", "smoke"]
	return [...new Set(tags)]; // Set เก็บค่าไม่ซ้ำ แล้ว spread กลับเป็น array -> ["smoke", "ui"]
}

/** คำนวณเปอร์เซ็นต์ปัดเป็นจำนวนเต็ม total = 0 คืน 0 (กันได้ NaN) */
export function percent(part, total) {
	return total === 0 ? 0 : Math.round((part / total) * 100);
}

/**
 * สร้างไฟล์จากข้อความแล้วสั่งดาวน์โหลด (ไม่ต้องมี server)
 * 1) Blob = ก้อนข้อมูลไฟล์ในหน่วยความจำ
 * 2) URL.createObjectURL = สร้าง URL ชั่วคราวชี้ไปที่ Blob
 * 3) สร้าง <a download> แล้วสั่ง click() ด้วยโค้ด
 * 4) revokeObjectURL คืนหน่วยความจำ
 */
export function downloadFile(filename, content, mimeType = "application/json") {
	const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.append(link);
	link.click();
	link.remove();
	setTimeout(() => URL.revokeObjectURL(url), 0); // รอให้เบราว์เซอร์เริ่มดาวน์โหลดก่อน
}
