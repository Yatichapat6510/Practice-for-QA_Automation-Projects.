/*
 * ==========================================================================
 * store.js : ที่เก็บและจัดการข้อมูล Test Case (State management)
 * ==========================================================================
 * หลักการ: "ข้อมูลอยู่ที่ store ที่เดียว" (single source of truth)
 *   ผู้ใช้กดปุ่ม -> main.js เรียก store.add()/update()/remove()
 *   -> store แจ้ง event "change" -> main.js บันทึก localStorage + วาดหน้าใหม่
 *   หน้าเว็บจึงตรงกับข้อมูลเสมอ ไม่ต้องไล่แก้ DOM ทีละจุด
 *
 * แนวคิด OOP ที่ใช้ (เหมือนในโฟลเดอร์ OOP/)
 * - class + extends EventTarget  สืบทอดความสามารถ addEventListener/dispatchEvent ของเบราว์เซอร์
 * - #private field / method      ภายนอกแก้ #cases ตรง ๆ ไม่ได้ ต้องผ่านเมธอด (Encapsulation)
 * - getter (get all, get stats)  อ่านค่าเหมือน property แต่คำนวณสด
 * - คืน "สำเนา" ทุกครั้ง           ภายนอกแก้ข้อมูลที่ได้ไป ไม่กระทบข้อมูลจริง
 *
 * Array methods ที่ใช้: find, findIndex, filter, map, some, sort, reduce, includes
 * ไฟล์นี้ไม่แตะ DOM เลย -> นำไปใช้กับหน้าอื่นหรือทดสอบแยกได้
 * ==========================================================================
 */

import { MODULES, PRIORITY_ORDER, STATUSES } from "./constants.js";
import { generateId } from "./utils.js";
import { normalizeTestCase, validateTestCase } from "./validation.js";

// คัดลอก test case 1 ตัว (tags เป็น array ต้องคัดลอกแยก ไม่งั้นยังชี้ array เดิม)
const copyCase = (testCase) => ({ ...testCase, tags: [...testCase.tags] });

export class TestCaseStore extends EventTarget {
	/** @type {Array<object>} */
	#cases = [];

	/** @param {unknown[]} initialCases ข้อมูลเริ่มต้น (เช่น จาก localStorage) ตัวที่ผิดรูปแบบจะถูกข้าม */
	constructor(initialCases = []) {
		super(); // ต้องเรียกก่อนใช้ this เพราะ extends EventTarget
		this.importMany(initialCases, { replace: true, silent: true });
	}

	// ---------- อ่านข้อมูล ----------

	/** ทุกเคส (สำเนา) */
	get all() {
		return this.#cases.map(copyCase);
	}

	get size() {
		return this.#cases.length;
	}

	/** หาเคสจาก id ไม่พบคืน undefined */
	findById(id) {
		const found = this.#cases.find((testCase) => testCase.id === id);
		return found ? copyCase(found) : undefined;
	}

	/**
	 * ค้นหา + กรอง + เรียงลำดับ ในฟังก์ชันเดียว
	 * Destructuring พร้อมค่าเริ่มต้น: ไม่ส่งตัวไหนมา ใช้ค่าหลัง =
	 */
	query({ search = "", status = "all", priority = "all", sortBy = "newest" } = {}) {
		const keyword = search.trim().toLowerCase();

		const result = this.#cases.filter((testCase) => {
			if (status !== "all" && testCase.status !== status) return false;
			if (priority !== "all" && testCase.priority !== priority) return false;
			if (keyword === "") return true;

			// รวมทุกช่องที่ค้นได้เป็นข้อความเดียว แล้วหาคำค้นในนั้น
			const haystack = [testCase.title, testCase.module, testCase.steps, testCase.expected, ...testCase.tags]
				.join(" ")
				.toLowerCase();
			return haystack.includes(keyword);
		});

		// sort() แก้ array เดิม แต่ result เป็น array ใหม่จาก filter() แล้ว จึงไม่กระทบ #cases
		// comparator คืนค่า < 0 = a มาก่อน, > 0 = b มาก่อน
		const byNewest = (a, b) => b.createdAt.localeCompare(a.createdAt); // ISO string เรียงแบบข้อความได้
		const comparators = {
			newest: byNewest,
			oldest: (a, b) => a.createdAt.localeCompare(b.createdAt),
			priority: (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || byNewest(a, b),
			title: (a, b) => a.title.localeCompare(b.title, "th"), // localeCompare รองรับการเรียงภาษาไทย
		};
		result.sort(comparators[sortBy] ?? byNewest);

		return result.map(copyCase);
	}

	/**
	 * สถิติสำหรับหน้าสรุป ใช้ reduce รวมค่าใน loop เดียว
	 * @returns {{ total: number, counts: Record<string, number>, byModule: Record<string, number>, executed: number, automated: number }}
	 */
	get stats() {
		// เริ่มทุกสถานะ/โมดูลที่ 0 ก่อน (Object.fromEntries แปลง [[key, value], ...] เป็นออบเจ็กต์)
		const initial = {
			counts: Object.fromEntries(Object.keys(STATUSES).map((key) => [key, 0])),
			byModule: Object.fromEntries(MODULES.map((name) => [name, 0])),
			automated: 0,
		};

		const summary = this.#cases.reduce((acc, testCase) => {
			acc.counts[testCase.status]++;
			acc.byModule[testCase.module]++;
			if (testCase.automated) acc.automated++;
			return acc; // reduce ต้องคืน accumulator ทุกรอบ
		}, initial);

		const total = this.#cases.length;
		return {
			...summary,
			total,
			counts: { total, ...summary.counts },
			executed: total - summary.counts["not-run"],
		};
	}

	// ---------- เขียนข้อมูล: ทุกเมธอดคืน { ok, ... } ให้ผู้เรียกรู้ผล ----------

	/** เพิ่มเคสใหม่ */
	add(raw) {
		const data = normalizeTestCase(raw);
		const { valid, errors } = validateTestCase(data);
		if (!valid) return { ok: false, errors };

		const now = new Date().toISOString();
		const testCase = { id: generateId(), ...data, createdAt: now, updatedAt: now };
		this.#cases.push(testCase);
		this.#emit("add", { id: testCase.id });
		return { ok: true, testCase: copyCase(testCase) };
	}

	/** แก้ไขเคส: ส่งมาเฉพาะช่องที่ต้องการเปลี่ยนก็ได้ (ช่องอื่นใช้ค่าเดิม) */
	update(id, changes) {
		const index = this.#cases.findIndex((testCase) => testCase.id === id);
		if (index === -1) return { ok: false, errors: { id: "ไม่พบเคสที่ต้องการแก้ไข" } };

		const current = this.#cases[index];
		// spread ซ้อน: ค่าใน changes ทับค่าใน current
		const data = normalizeTestCase({ ...current, ...changes });
		const { valid, errors } = validateTestCase(data);
		if (!valid) return { ok: false, errors };

		const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
		this.#cases[index] = updated;
		this.#emit("update", { id });
		return { ok: true, testCase: copyCase(updated) };
	}

	setStatus(id, status) {
		return this.update(id, { status });
	}

	remove(id) {
		const before = this.#cases.length;
		this.#cases = this.#cases.filter((testCase) => testCase.id !== id);
		const removed = this.#cases.length < before;
		if (removed) this.#emit("remove", { id });
		return removed;
	}

	clear() {
		this.#cases = [];
		this.#emit("clear");
	}

	/**
	 * นำเข้าหลายเคส (จากไฟล์ JSON / ข้อมูลตัวอย่าง / localStorage)
	 * @param {unknown[]} rawList
	 * @param {{ replace?: boolean, silent?: boolean }} options
	 *   replace: แทนที่ข้อมูลเดิมทั้งหมด / silent: ไม่ส่ง event (ใช้ตอนสร้าง store)
	 * @returns {{ imported: number, duplicates: number, invalid: number }}
	 */
	importMany(rawList, { replace = false, silent = false } = {}) {
		if (!Array.isArray(rawList)) {
			throw new TypeError("ข้อมูลที่นำเข้าต้องเป็น array");
		}

		const next = replace ? [] : [...this.#cases];
		const existingIds = new Set(next.map((testCase) => testCase.id)); // Set.has() ค้นหาเร็วกว่า array.includes()
		const result = { imported: 0, duplicates: 0, invalid: 0 };

		for (const raw of rawList) {
			const testCase = this.#prepareImported(raw);
			if (!testCase) {
				result.invalid++;
			} else if (existingIds.has(testCase.id)) {
				result.duplicates++;
			} else {
				existingIds.add(testCase.id);
				next.push(testCase);
				result.imported++;
			}
		}

		this.#cases = next;
		if (!silent && (result.imported > 0 || replace)) {
			this.#emit("import", result);
		}
		return result;
	}

	/** แปลงข้อมูล array เป็น JSON ได้ตรง ๆ: JSON.stringify(store) */
	toJSON() {
		return this.all;
	}

	// ---------- Private methods ----------

	/** แปลงข้อมูลนำเข้า 1 ตัว ผิดรูปแบบคืน null */
	#prepareImported(raw) {
		if (typeof raw !== "object" || raw === null) return null;

		const data = normalizeTestCase(raw);
		if (!validateTestCase(data).valid) return null;

		const now = new Date().toISOString();
		const isValidDate = (value) => typeof value === "string" && !Number.isNaN(Date.parse(value));
		return {
			id: typeof raw.id === "string" && raw.id.trim() !== "" ? raw.id.trim() : generateId(),
			...data,
			createdAt: isValidDate(raw.createdAt) ? raw.createdAt : now,
			updatedAt: isValidDate(raw.updatedAt) ? raw.updatedAt : now,
		};
	}

	/**
	 * ส่ง event "change" ให้ทุกคนที่ฟังอยู่ (Observer pattern)
	 * CustomEvent แนบข้อมูลเพิ่มใน detail ได้ ผู้ฟังอ่านจาก event.detail
	 */
	#emit(action, detail = {}) {
		this.dispatchEvent(new CustomEvent("change", { detail: { action, ...detail } }));
	}
}
