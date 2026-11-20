/*
 * ==========================================================================
 * storage.js : อ่าน/เขียน localStorage อย่างปลอดภัย
 * ==========================================================================
 * localStorage = ที่เก็บข้อมูลในเบราว์เซอร์ ปิดแท็บ/ปิดเครื่องแล้วข้อมูลยังอยู่
 * - เก็บได้เฉพาะ string -> ต้องแปลงด้วย JSON.stringify() ตอนเก็บ และ JSON.parse() ตอนอ่าน
 * - แยกตาม origin (โดเมน + port) เปิดคนละ port ข้อมูลจะไม่เห็นกัน
 * - อาจ throw error ได้ เช่น โหมด private ของบางเบราว์เซอร์, พื้นที่เต็ม, ข้อมูลเสีย
 *   จึงห่อทุกคำสั่งด้วย try...catch และมีค่าสำรอง (fallback) เสมอ
 *
 * เปรียบเทียบ: sessionStorage ใช้แบบเดียวกัน แต่ข้อมูลหายเมื่อปิดแท็บ
 * ==========================================================================
 */

export const storage = {
	/**
	 * อ่านค่า ถ้าไม่มีหรืออ่านไม่ได้ คืน fallback
	 * @template T
	 * @param {string} key
	 * @param {T} fallback
	 * @returns {T}
	 */
	get(key, fallback) {
		try {
			const raw = localStorage.getItem(key); // ไม่มี key นี้ -> null
			return raw === null ? fallback : JSON.parse(raw);
		} catch (error) {
			// JSON.parse("{ข้อมูลเสีย") จะ throw SyntaxError มาที่นี่
			console.warn(`[storage] อ่าน "${key}" ไม่สำเร็จ ใช้ค่าเริ่มต้นแทน`, error);
			return fallback;
		}
	},

	/**
	 * เขียนค่า คืน true ถ้าสำเร็จ
	 * @param {string} key
	 * @param {unknown} value
	 * @returns {boolean}
	 */
	set(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return true;
		} catch (error) {
			// เช่น QuotaExceededError เมื่อพื้นที่เต็ม (ประมาณ 5MB ต่อ origin)
			console.warn(`[storage] บันทึก "${key}" ไม่สำเร็จ`, error);
			return false;
		}
	},

	remove(key) {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			console.warn(`[storage] ลบ "${key}" ไม่สำเร็จ`, error);
		}
	},
};
