/*
 * ==========================================================================
 * main.js : จุดเริ่มต้นของแอป (Entry point) เชื่อมทุกไฟล์เข้าด้วยกัน
 * ==========================================================================
 * index.html โหลดไฟล์นี้ไฟล์เดียว: <script type="module" src="js/main.js">
 * ไฟล์อื่นถูกดึงมาผ่าน import ต่อกันเป็นทอด ๆ
 *
 *   main.js ─┬─ store.js ──── validation.js ── constants.js, utils.js
 *            ├─ ui.js     (DOM ทั้งหมด)
 *            ├─ api.js    (fetch / อ่านไฟล์)
 *            ├─ theme.js  (ธีมสว่าง/มืด)
 *            └─ storage.js (localStorage)
 *
 * Data flow (ทิศทางข้อมูลวิ่งทางเดียว อ่านง่าย debug ง่าย)
 *   [ผู้ใช้คลิก/พิมพ์] -> event listener ในไฟล์นี้ -> store.add()/update()/remove()
 *   -> store ส่ง event "change" -> บันทึก localStorage + render() วาดหน้าใหม่
 *
 * Event ที่ใช้: submit, reset, input, change, click, keydown, storage
 * เทคนิค: Event delegation (ฟังที่ parent ตัวเดียวแทนการฟังทุกปุ่ม)
 * ==========================================================================
 */

import { fetchSampleCases, readJsonFile } from "./api.js";
import { MODULES, PRIORITIES, SEARCH_DEBOUNCE_MS, STATUSES, STORAGE_KEYS } from "./constants.js";
import { storage } from "./storage.js";
import { TestCaseStore } from "./store.js";
import { initTheme } from "./theme.js";
import {
	clearFieldError,
	clearFieldErrors,
	confirmAction,
	elements,
	fillForm,
	populateSelect,
	readForm,
	renderCases,
	renderStats,
	setBusy,
	setFormMode,
	showFieldErrors,
	showToast,
	updateTitleCounter,
} from "./ui.js";
import { debounce, downloadFile, todayISO } from "./utils.js";

// ==================== 1) State: ข้อมูลของแอป ====================

// โหลดข้อมูลเดิมจาก localStorage (ไม่มี = array ว่าง)
const store = new TestCaseStore(storage.get(STORAGE_KEYS.cases, []));

// ค่าตัวกรองปัจจุบัน (แยกจากข้อมูลเคส เพราะเป็นสถานะของหน้าจอ ไม่ต้องบันทึก)
const filters = { search: "", status: "all", priority: "all", sortBy: "newest" };

// ==================== 2) Render: วาดหน้าจากข้อมูล ====================

function render() {
	renderCases(store.query(filters), store.size);
	renderStats(store.stats);
}

// ทุกครั้งที่ข้อมูลเปลี่ยน: บันทึก + วาดใหม่ (ที่เดียว ไม่ต้องเรียกซ้ำในทุก handler)
store.addEventListener("change", (event) => {
	storage.set(STORAGE_KEYS.cases, store.all);
	render();
	console.debug("[store] change:", event.detail); // เปิด DevTools > Console > Verbose เพื่อดู
});

// ==================== 3) ฟอร์มเพิ่ม/แก้ไข ====================

function resetForm() {
	elements.form.reset(); // จะเรียก event "reset" ด้านล่างต่อ
}

elements.form.addEventListener("submit", (event) => {
	event.preventDefault(); // ยกเลิกพฤติกรรมเดิมของฟอร์ม (โหลดหน้าใหม่) เพื่อจัดการเองด้วย JS

	const data = readForm(elements.form);
	const isEdit = data.id !== "";
	const result = isEdit ? store.update(data.id, data) : store.add(data);

	if (!result.ok) {
		showFieldErrors(elements.form, result.errors);
		showToast("กรุณาตรวจสอบข้อมูลในฟอร์ม", "error");
		return; // early return: จบฟังก์ชันทันที ไม่ต้องซ้อน if-else ลึก
	}

	showToast(isEdit ? `แก้ไข "${result.testCase.title}" แล้ว` : `เพิ่ม "${result.testCase.title}" แล้ว`, "success");
	resetForm();
	elements.form.elements.title.focus();
});

// "reset" เกิดก่อนเบราว์เซอร์ล้างค่า -> ใช้ล้าง error และออกจากโหมดแก้ไข
// setTimeout 0 = รอให้เบราว์เซอร์ล้างค่าเสร็จก่อน แล้วอัปเดตตัวนับตัวอักษร
elements.form.addEventListener("reset", () => {
	clearFieldErrors(elements.form);
	setFormMode("create");
	setTimeout(() => updateTitleCounter(elements.form.elements.title), 0);
});

// "input" เกิดทุกครั้งที่ค่าเปลี่ยน (พิมพ์ทีละตัว) ฟังที่ form ตัวเดียว ครอบคลุมทุกช่อง
elements.form.addEventListener("input", (event) => {
	clearFieldError(event.target); // เริ่มแก้แล้ว ซ่อน error ของช่องนั้น
	if (event.target.name === "title") updateTitleCounter(event.target);
});

// ==================== 4) ค้นหา / กรอง / เรียง ====================

// debounce: รอหยุดพิมพ์ 250ms ค่อยค้นหา
const handleSearch = debounce((value) => {
	filters.search = value;
	render();
}, SEARCH_DEBOUNCE_MS);

elements.search.addEventListener("input", (event) => handleSearch(event.target.value));

// select ใช้ event "change" (เกิดเมื่อเลือกค่าใหม่เสร็จ)
// [element, ชื่อ key ใน filters] วน loop ผูก event ทีเดียว 3 ตัว
for (const [select, key] of [
	[elements.filterStatus, "status"],
	[elements.filterPriority, "priority"],
	[elements.sortBy, "sortBy"],
]) {
	select.addEventListener("change", () => {
		filters[key] = select.value; // bracket notation: filters["status"] = ...
		render();
	});
}

// ==================== 5) ปุ่มในตาราง: Event delegation ====================
/*
 * แถวในตารางถูกสร้างใหม่ทุกครั้งที่ render ถ้าผูก event ที่ปุ่มแต่ละตัวต้องผูกใหม่ทุกรอบ
 * Event delegation: ผูกที่ <tbody> ตัวเดียว เพราะ event "ลอยขึ้น" (bubble) จากปุ่มมาถึง parent
 * แล้วดูว่าต้นทางคือปุ่มอะไรจาก event.target.closest(...)
 */
elements.tbody.addEventListener("click", async (event) => {
	const button = event.target.closest("button[data-action]");
	if (!button) return; // คลิกที่อื่นในตาราง ไม่ใช่ปุ่ม

	const { id } = button.closest("tr").dataset; // destructuring: const id = ...dataset.id
	const testCase = store.findById(id);
	if (!testCase) return;

	switch (button.dataset.action) {
		case "edit":
			clearFieldErrors(elements.form);
			fillForm(elements.form, testCase);
			setFormMode("edit");
			elements.form.scrollIntoView({ behavior: "smooth", block: "start" });
			elements.form.elements.title.focus({ preventScroll: true });
			break;

		case "delete": {
			// await รอผู้ใช้ตอบใน dialog (handler เป็น async จึงใช้ await ได้)
			const confirmed = await confirmAction(`ต้องการลบเคส "${testCase.title}" ใช่หรือไม่?`);
			if (!confirmed) return;
			store.remove(id);
			if (elements.form.elements.id.value === id) resetForm(); // ลบตัวที่กำลังแก้อยู่
			showToast("ลบเคสแล้ว", "success");
			break;
		}
	}
});

// เปลี่ยนสถานะจาก select ในแถว (delegation เหมือนกัน แต่ฟัง "change")
elements.tbody.addEventListener("change", (event) => {
	const select = event.target;
	if (!select.matches('select[data-action="status"]')) return; // matches() ตรวจว่าตรง selector ไหม

	const { id } = select.closest("tr").dataset;
	const result = store.setStatus(id, select.value);
	if (result.ok) {
		showToast(`"${result.testCase.title}" -> ${STATUSES[select.value]}`, select.value === "fail" ? "warning" : "success");
	}
});

// ==================== 6) ปุ่มจัดการข้อมูลใน footer ====================

// async/await + try/catch/finally
elements.loadSampleButton.addEventListener("click", async () => {
	setBusy(elements.loadSampleButton, true);
	try {
		const sampleCases = await fetchSampleCases();
		const { imported, duplicates, invalid } = store.importMany(sampleCases);
		if (imported === 0) {
			showToast("ข้อมูลตัวอย่างถูกโหลดไว้แล้ว", "info");
		} else {
			const skipped = duplicates + invalid;
			showToast(`โหลดตัวอย่าง ${imported} เคส${skipped ? ` (ข้าม ${skipped})` : ""}`, "success");
		}
	} catch (error) {
		console.error(error);
		// location.protocol: เปิดไฟล์ตรง ๆ จะเป็น "file:" ซึ่ง fetch ใช้ไม่ได้
		const hint = location.protocol === "file:" ? " ต้องเปิดผ่าน local server (ดู README)" : "";
		showToast(`${error.message}${hint}`, "error");
	} finally {
		// finally ทำงานเสมอ ไม่ว่าสำเร็จหรือ error -> คืนสถานะปุ่ม
		setBusy(elements.loadSampleButton, false);
	}
});

elements.exportButton.addEventListener("click", () => {
	if (store.size === 0) {
		showToast("ยังไม่มีข้อมูลให้ส่งออก", "warning");
		return;
	}
	// JSON.stringify(ค่า, null, 2) = จัดรูปแบบเว้นวรรค 2 ช่อง อ่านง่าย
	const content = JSON.stringify({ exportedAt: new Date().toISOString(), testCases: store.all }, null, 2);
	downloadFile(`qa-test-cases-${todayISO()}.json`, content);
	showToast(`ส่งออก ${store.size} เคสแล้ว`, "success");
});

elements.importInput.addEventListener("change", async (event) => {
	const input = event.target;
	const [file] = input.files; // array destructuring: เอาไฟล์แรก
	try {
		const list = await readJsonFile(file);
		const { imported, duplicates, invalid } = store.importMany(list);
		showToast(`นำเข้า ${imported} เคส · ซ้ำ ${duplicates} · ผิดรูปแบบ ${invalid}`, imported > 0 ? "success" : "warning");
	} catch (error) {
		showToast(error.message, "error");
	} finally {
		input.value = ""; // ล้างค่า เพื่อให้เลือกไฟล์เดิมซ้ำได้ (ไม่งั้น "change" จะไม่เกิด)
	}
});

elements.clearAllButton.addEventListener("click", async () => {
	if (store.size === 0) {
		showToast("ไม่มีข้อมูลให้ลบ", "info");
		return;
	}
	if (await confirmAction(`ลบ Test Case ทั้งหมด ${store.size} เคส? ย้อนกลับไม่ได้`)) {
		store.clear();
		resetForm();
		showToast("ลบข้อมูลทั้งหมดแล้ว", "success");
	}
});

// ==================== 7) คีย์ลัด ====================
/*
 * event.key  = ตัวอักษรที่ได้ (ขึ้นกับภาษาคีย์บอร์ด: แป้นไทยกด N ได้ "ื")
 * event.code = ตำแหน่งปุ่มบนคีย์บอร์ด ("KeyN" เสมอ ไม่ว่าภาษาอะไร) -> เหมาะกับคีย์ลัด
 */
document.addEventListener("keydown", (event) => {
	if (elements.confirmDialog.open) return; // dialog จัดการ Esc เอง

	if (event.key === "Escape" && elements.form.dataset.mode === "edit") {
		resetForm();
		return;
	}

	// กำลังพิมพ์ในช่องกรอก หรือกดร่วมกับ Ctrl/Alt/Cmd -> ไม่ใช่คีย์ลัดของเรา
	const isTyping = event.target.closest("input, textarea, select, [contenteditable]");
	if (isTyping || event.ctrlKey || event.metaKey || event.altKey) return;

	if (event.code === "Slash") {
		event.preventDefault(); // ไม่ให้พิมพ์ "/" ลงช่องค้นหา
		elements.search.focus();
	} else if (event.code === "KeyN") {
		event.preventDefault();
		elements.form.elements.title.focus();
	}
});

// ==================== 8) ซิงก์ข้ามแท็บ ====================
// event "storage" เกิดในแท็บ "อื่น" เมื่อแท็บหนึ่งแก้ localStorage (แท็บที่แก้เองจะไม่ได้รับ)
window.addEventListener("storage", (event) => {
	if (event.key !== STORAGE_KEYS.cases) return;
	store.importMany(storage.get(STORAGE_KEYS.cases, []), { replace: true });
});

// ==================== 9) เริ่มต้นแอป ====================

function init() {
	// เติม dropdown จาก constants.js (Object.entries แปลง { pass: "ผ่าน" } เป็น [["pass", "ผ่าน"]])
	populateSelect(elements.form.elements.module, MODULES.map((name) => [name, name]));
	populateSelect(elements.filterStatus, Object.entries(STATUSES));
	populateSelect(elements.filterPriority, Object.entries(PRIORITIES));

	initTheme(elements.themeToggle);
	elements.year.textContent = new Date().getFullYear();
	updateTitleCounter(elements.form.elements.title);
	render();

	// เปิดให้ทดลองใน DevTools Console ได้ เช่น qaTracker.store.all, qaTracker.store.stats
	window.qaTracker = { store, filters, render };
}

init();
