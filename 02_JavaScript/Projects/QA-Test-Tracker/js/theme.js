/*
 * ==========================================================================
 * theme.js : สลับธีมสว่าง / มืด
 * ==========================================================================
 * JS กับ CSS ทำงานร่วมกันอย่างไร
 *   1) JS ตั้ง attribute: document.documentElement.dataset.theme = "dark"
 *      ผลลัพธ์ใน HTML: <html data-theme="dark">
 *   2) CSS (base.css) มีกฎ :root[data-theme="dark"] { --color-bg: ... }
 *      เปลี่ยนค่าตัวแปรสี -> ทุก element ที่ใช้ var(--color-...) เปลี่ยนตามทันที
 *   JS ไม่ต้องรู้เลยว่าสีอะไร แค่สลับ "สถานะ" ส่วน CSS ตัดสินหน้าตาเอง
 *
 * ลำดับการเลือกธีม: ค่าที่ผู้ใช้เคยเลือก (localStorage) -> ค่าของระบบปฏิบัติการ (matchMedia)
 * ==========================================================================
 */

import { STORAGE_KEYS } from "./constants.js";
import { storage } from "./storage.js";

const root = document.documentElement; // = <html>
// matchMedia: ใช้ media query ใน JS ได้ (เหมือน @media ใน CSS)
const systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function getSavedTheme() {
	const saved = storage.get(STORAGE_KEYS.theme, null);
	return saved === "light" || saved === "dark" ? saved : null;
}

function getPreferredTheme() {
	return getSavedTheme() ?? (systemDarkQuery.matches ? "dark" : "light");
}

/**
 * ตั้งธีมและอัปเดตปุ่มให้ตรงกัน
 * @param {"light"|"dark"} theme
 * @param {HTMLButtonElement} button
 */
function applyTheme(theme, button) {
	const isDark = theme === "dark";
	root.dataset.theme = theme;

	// aria-pressed บอกโปรแกรมอ่านหน้าจอว่าโหมดมืดเปิดอยู่หรือไม่ (ค่าต้องเป็น string)
	button.setAttribute("aria-pressed", String(isDark));
	button.querySelector("[data-theme-icon]").textContent = isDark ? "☀️" : "🌙";
	button.querySelector("[data-theme-label]").textContent = isDark ? "โหมดสว่าง" : "โหมดมืด";
}

/** เรียกครั้งเดียวตอนเริ่มแอป */
export function initTheme(button) {
	applyTheme(getPreferredTheme(), button);

	button.addEventListener("click", () => {
		const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
		applyTheme(nextTheme, button);
		storage.set(STORAGE_KEYS.theme, nextTheme); // จำค่าที่ผู้ใช้เลือก
	});

	// ผู้ใช้เปลี่ยนธีมของระบบปฏิบัติการขณะเปิดหน้าอยู่ -> ตามด้วย (ถ้ายังไม่เคยเลือกเอง)
	systemDarkQuery.addEventListener("change", (event) => {
		if (getSavedTheme() === null) {
			applyTheme(event.matches ? "dark" : "light", button);
		}
	});
}
