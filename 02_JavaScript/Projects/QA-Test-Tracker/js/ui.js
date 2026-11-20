/*
 * ==========================================================================
 * ui.js : ทุกอย่างที่เกี่ยวกับหน้าเว็บ (DOM)
 * ==========================================================================
 * DOM (Document Object Model) = HTML ในรูปออบเจ็กต์ที่ JS อ่าน/แก้ได้
 *
 * คำสั่ง DOM ที่ใช้ในไฟล์นี้
 *   หา element     document.querySelector("#id"), element.querySelector(".class"), closest()
 *   สร้าง          document.createElement("li"), template.content.cloneNode(true), new Option()
 *   ใส่ข้อความ      element.textContent = "..."  (ปลอดภัย: แสดงเป็นข้อความเสมอ)
 *   class          element.classList.add / remove / toggle
 *   attribute      element.setAttribute(), element.dataset.xxx (= data-xxx), element.hidden
 *   CSS variable   element.style.setProperty("--value", 40)
 *   เพิ่ม/ลบ        parent.append(child), parent.replaceChildren(...), element.remove()
 *   ฟอร์ม          new FormData(form), form.elements.ชื่อ, form.reset()
 *
 * ความปลอดภัย (สำคัญสำหรับ QA): ไฟล์นี้ใช้ textContent แทน innerHTML กับข้อมูลผู้ใช้ทุกจุด
 * ถ้าใช้ innerHTML แล้วผู้ใช้กรอกชื่อเคสเป็น <img src=x onerror=alert(1)>
 * โค้ดนั้นจะถูกรันได้ (ช่องโหว่ XSS) ลองกรอกทดสอบดูได้ จะเห็นเป็นข้อความธรรมดา
 * ==========================================================================
 */

import { LIMITS, PRIORITIES, STATUSES, TOAST_DURATION_MS } from "./constants.js";
import { formatDate, formatDateTime, percent } from "./utils.js";

// ---------- รวม element ที่ใช้บ่อยไว้ที่เดียว (หาครั้งเดียว ใช้ซ้ำ) ----------
// script type="module" รันหลัง HTML โหลดเสร็จ จึงหา element ได้ทันที
const $ = (selector) => document.querySelector(selector);

export const elements = {
	form: $("#case-form"),
	formTitle: $("#form-title"),
	submitButton: $("[data-submit-label]"),
	editHint: $("[data-edit-hint]"),
	titleCounter: $("#title-counter"),

	search: $("#search"),
	filterStatus: $("#filter-status"),
	filterPriority: $("#filter-priority"),
	sortBy: $("#sort-by"),
	resultCount: $("#result-count"),
	tbody: $("#case-tbody"),
	rowTemplate: $("#case-row-template"),
	emptyState: $("#empty-state"),
	emptyText: $("[data-empty-text]"),

	statsSection: $("#stats-section"),
	progressBar: $("#progress-bar"),
	progressText: $("#progress-text"),
	passRateBar: $("#pass-rate-bar"),
	passRateText: $("#pass-rate-text"),
	moduleChart: $("#module-chart"),

	themeToggle: $("#theme-toggle"),
	loadSampleButton: $("#load-sample"),
	exportButton: $("#export-json"),
	importInput: $("#import-file"),
	clearAllButton: $("#clear-all"),
	year: $("#year"),

	confirmDialog: $("#confirm-dialog"),
	confirmMessage: $("#confirm-message"),
	toastContainer: $("#toast-container"),
};

// ==================== Select / Dropdown ====================

/**
 * เติม option ต่อท้าย select
 * new Option(ข้อความ, value) = สร้าง <option value="...">ข้อความ</option>
 * @param {HTMLSelectElement} select
 * @param {Array<[string, string]>} entries [[value, label], ...]
 */
export function populateSelect(select, entries) {
	for (const [value, label] of entries) {
		select.append(new Option(label, value));
	}
}

// ==================== ตารางรายการเคส ====================

/**
 * สร้าง 1 แถวจาก <template>
 * cloneNode(true) = คัดลอกพร้อมลูกทั้งหมด (false = คัดลอกแค่ตัวเอง)
 */
function createRow(testCase) {
	const row = elements.rowTemplate.content.firstElementChild.cloneNode(true);
	// หาช่องในแถวจาก data-field="..." (ไม่ผูกกับ class ที่ใช้จัดสไตล์)
	const field = (name) => row.querySelector(`[data-field="${name}"]`);

	// dataset.id = "..." -> data-id="..." ใน HTML (main.js อ่านกลับตอนคลิกปุ่ม)
	row.dataset.id = testCase.id;
	row.dataset.status = testCase.status; // CSS ใช้ทำแถบสีซ้าย [data-status="pass"]

	field("title").textContent = testCase.title;
	field("steps").textContent = testCase.steps;
	field("expected").textContent = testCase.expected;
	field("module").textContent = testCase.module;

	const priorityBadge = field("priority");
	priorityBadge.textContent = PRIORITIES[testCase.priority];
	priorityBadge.classList.add(`badge--${testCase.priority}`);

	// สร้าง <span class="tag"> ต่อแท็ก ด้วย map แล้วกระจาย (...) ใส่ append
	field("tags").append(
		...testCase.tags.map((tag) => {
			const span = document.createElement("span");
			span.className = "tag";
			span.textContent = tag;
			return span;
		}),
	);

	// รวมข้อความเสริม เฉพาะส่วนที่มีค่า (filter(Boolean) ตัด false/"" ออก)
	field("meta").textContent = [
		`อัปเดต ${formatDateTime(testCase.updatedAt)}`,
		testCase.plannedDate && `วางแผน ${formatDate(testCase.plannedDate)}`,
		testCase.automated && "🤖 Automated",
	]
		.filter(Boolean)
		.join(" · ");

	const statusSelect = row.querySelector('[data-action="status"]');
	populateSelect(statusSelect, Object.entries(STATUSES));
	statusSelect.value = testCase.status;
	statusSelect.dataset.status = testCase.status;

	return row;
}

/**
 * วาดตารางใหม่ทั้งหมด
 * DocumentFragment = กล่องชั่วคราวนอกหน้าเว็บ ใส่ทุกแถวเสร็จแล้วค่อยใส่หน้าครั้งเดียว
 * (เบราว์เซอร์คำนวณ layout ครั้งเดียว เร็วกว่าใส่ทีละแถว)
 */
export function renderCases(cases, totalCount) {
	const fragment = document.createDocumentFragment();
	cases.forEach((testCase) => fragment.append(createRow(testCase)));
	elements.tbody.replaceChildren(fragment); // ลบของเก่าทั้งหมด แล้วใส่ของใหม่

	const isEmpty = cases.length === 0;
	elements.emptyState.hidden = !isEmpty;
	elements.tbody.closest(".table-wrapper").hidden = isEmpty;
	elements.emptyText.textContent =
		totalCount === 0 ? 'ยังไม่มี Test Case ลองเพิ่มจากฟอร์ม หรือกด "โหลดข้อมูลตัวอย่าง"' : "ไม่พบเคสที่ตรงกับการค้นหา/ตัวกรอง";

	elements.resultCount.textContent = `แสดง ${cases.length} จาก ${totalCount} เคส`;
}

// ==================== สรุปผล ====================

/** เปลี่ยนตัวเลข และเล่นแอนิเมชัน pop เฉพาะตัวที่ค่าเปลี่ยนจริง */
function updateNumber(element, value) {
	const text = String(value);
	if (element.textContent === text) return;
	element.textContent = text;

	// เทคนิคเล่นแอนิเมชันซ้ำ: ลบ class -> บังคับเบราว์เซอร์คำนวณ (อ่าน offsetWidth) -> ใส่ class ใหม่
	element.classList.remove("is-updated");
	void element.offsetWidth;
	element.classList.add("is-updated");
}

export function renderStats(stats) {
	// Object.entries({ total: 3, pass: 1 }) -> [["total", 3], ["pass", 1]]
	for (const [key, value] of Object.entries(stats.counts)) {
		const valueElement = elements.statsSection.querySelector(`[data-stat="${key}"] .stat-card__value`);
		if (valueElement) updateNumber(valueElement, value);
	}

	const progress = percent(stats.executed, stats.total);
	const passRate = percent(stats.counts.pass, stats.executed);
	elements.progressBar.value = progress;
	elements.progressText.textContent = `${progress}%`;
	elements.passRateBar.value = passRate;
	elements.passRateText.textContent = `${passRate}%`;

	renderModuleChart(stats.byModule, stats.total);
}

/** กราฟแท่ง: JS แค่ส่งตัวเลขผ่าน CSS variable --value ส่วน CSS วาดความกว้างเอง */
function renderModuleChart(byModule, total) {
	if (total === 0) {
		const empty = document.createElement("li");
		empty.className = "bar-chart__empty";
		empty.textContent = "ยังไม่มีข้อมูล";
		elements.moduleChart.replaceChildren(empty);
		return;
	}

	const items = Object.entries(byModule).map(([moduleName, count]) => {
		const item = document.createElement("li");
		item.className = "bar-chart__item";

		const label = document.createElement("span");
		label.textContent = moduleName;

		const track = document.createElement("span");
		track.className = "bar-chart__track";
		const fill = document.createElement("span");
		fill.className = "bar-chart__fill";
		fill.style.setProperty("--value", percent(count, total)); // CSS: width: calc(var(--value) * 1%)
		track.append(fill);

		const value = document.createElement("span");
		value.className = "bar-chart__value";
		value.textContent = count;

		item.append(label, track, value); // append รับหลายตัวพร้อมกันได้
		return item;
	});

	elements.moduleChart.replaceChildren(...items);
}

// ==================== ฟอร์ม ====================

/**
 * อ่านค่าฟอร์มเป็นออบเจ็กต์
 * Object.fromEntries(new FormData(form)) = { title: "...", module: "...", ... } (ใช้ name ของ input เป็น key)
 * checkbox ที่ไม่ได้ติ๊กจะไม่อยู่ใน FormData เลย จึงอ่าน .checked แยก
 */
export function readForm(form) {
	const data = Object.fromEntries(new FormData(form));
	data.automated = form.elements.automated.checked;
	return data;
}

/** ใส่ข้อมูลเคสลงฟอร์ม (ตอนกดแก้ไข) */
export function fillForm(form, testCase) {
	const { elements: fields } = form; // destructuring + เปลี่ยนชื่อตัวแปร: form.elements -> fields
	fields.id.value = testCase.id;
	fields.title.value = testCase.title;
	fields.module.value = testCase.module;
	fields.priority.value = testCase.priority; // radio group (RadioNodeList) ตั้งค่าที่ถูกเลือกได้ตรง ๆ
	fields.steps.value = testCase.steps;
	fields.expected.value = testCase.expected;
	fields.tags.value = testCase.tags.join(", ");
	fields.plannedDate.value = testCase.plannedDate;
	fields.automated.checked = testCase.automated;
	updateTitleCounter(fields.title);
}

/** สลับหน้าตาฟอร์มระหว่าง "เพิ่ม" และ "แก้ไข" */
export function setFormMode(mode) {
	const isEdit = mode === "edit";
	elements.form.dataset.mode = mode; // CSS: .panel--form:has(form[data-mode="edit"])
	elements.formTitle.textContent = isEdit ? "แก้ไข Test Case" : "เพิ่ม Test Case";
	elements.submitButton.textContent = isEdit ? "บันทึกการแก้ไข" : "เพิ่มเคส";
	elements.editHint.hidden = !isEdit;
	if (!isEdit) elements.form.elements.id.value = "";
}

/** แสดง error ใต้ช่องที่ผิด และ focus ช่องแรกที่ผิด */
export function showFieldErrors(form, errors) {
	clearFieldErrors(form);

	for (const [name, message] of Object.entries(errors)) {
		const errorElement = form.querySelector(`[data-error-for="${name}"]`);
		if (!errorElement) continue;
		errorElement.textContent = message;
		errorElement.closest(".field")?.classList.add("is-invalid");
		getControl(form, name)?.setAttribute("aria-invalid", "true");
	}

	const firstInvalidName = Object.keys(errors)[0];
	getControl(form, firstInvalidName)?.focus();
}

export function clearFieldErrors(form) {
	form.querySelectorAll("[data-error-for]").forEach((element) => (element.textContent = ""));
	form.querySelectorAll(".is-invalid").forEach((element) => element.classList.remove("is-invalid"));
	form.querySelectorAll('[aria-invalid="true"]').forEach((element) => element.removeAttribute("aria-invalid"));
}

/** ล้าง error เฉพาะช่องเดียว (เรียกตอนผู้ใช้เริ่มแก้ช่องนั้น) */
export function clearFieldError(control) {
	const fieldElement = control.closest(".field");
	if (!fieldElement?.classList.contains("is-invalid")) return;
	fieldElement.classList.remove("is-invalid");
	fieldElement.querySelector("[data-error-for]").textContent = "";
	control.removeAttribute("aria-invalid");
}

/** form.elements.priority เป็น RadioNodeList (radio หลายตัว) -> เลือกตัวแรกไว้ focus */
function getControl(form, name) {
	const control = form.elements[name];
	return control instanceof RadioNodeList ? control[0] : control;
}

export function updateTitleCounter(input) {
	const length = input.value.length;
	elements.titleCounter.textContent = `${length}/${LIMITS.titleMax}`;
	// classList.toggle(ชื่อ, เงื่อนไข): true = ใส่ class, false = เอาออก
	elements.titleCounter.classList.toggle("is-near-limit", length >= LIMITS.titleMax * 0.9);
}

// ==================== ปุ่ม / Toast / Dialog ====================

/** ปุ่มสถานะกำลังทำงาน: ปิดปุ่ม + เปลี่ยนข้อความ แล้วคืนค่าเดิมเมื่อเสร็จ */
export function setBusy(button, isBusy, busyText = "กำลังโหลด...") {
	button.disabled = isBusy;
	button.setAttribute("aria-busy", String(isBusy));
	if (isBusy) {
		button.dataset.originalText = button.textContent;
		button.textContent = busyText;
	} else if (button.dataset.originalText) {
		button.textContent = button.dataset.originalText;
		delete button.dataset.originalText; // ลบ data-original-text ออกจาก element
	}
}

/**
 * แสดงข้อความแจ้งเตือนชั่วคราว
 * @param {string} message
 * @param {"info"|"success"|"error"|"warning"} type
 */
export function showToast(message, type = "info") {
	const toast = document.createElement("div");
	toast.className = `toast toast--${type}`;
	toast.textContent = message;
	toast.dataset.testid = "toast";
	elements.toastContainer.append(toast);

	const removeToast = () => {
		toast.classList.add("is-leaving"); // เล่นแอนิเมชันออก (animations.css)
		// { once: true } = ฟัง event ครั้งเดียวแล้วถอดตัวเองออก
		toast.addEventListener("animationend", () => toast.remove(), { once: true });
		setTimeout(() => toast.remove(), 1000); // กันกรณีแอนิเมชันไม่เล่น (remove ซ้ำได้ ไม่ error)
	};
	setTimeout(removeToast, TOAST_DURATION_MS);
	toast.addEventListener("click", removeToast, { once: true }); // คลิกเพื่อปิดก่อนเวลา
}

/**
 * กล่องยืนยันแบบ Promise: ใช้แทน confirm() ของเบราว์เซอร์ที่แต่งหน้าตาไม่ได้
 *   const ok = await confirmAction("ลบใช่ไหม?");
 * new Promise((resolve) => ...) = สร้าง Promise เอง แล้วเรียก resolve(ค่า) เมื่อได้คำตอบ
 * @returns {Promise<boolean>}
 */
export function confirmAction(message) {
	const dialog = elements.confirmDialog;
	elements.confirmMessage.textContent = message;
	dialog.returnValue = "";

	return new Promise((resolve) => {
		// ปิดด้วยปุ่ม -> returnValue = value ของปุ่ม / ปิดด้วย Esc -> returnValue = ""
		dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true });
		dialog.showModal();
	});
}
