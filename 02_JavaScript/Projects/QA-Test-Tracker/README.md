# QA Test Tracker

ตัวอย่าง Use case ที่ใช้ **HTML + CSS + JavaScript ทำงานร่วมกัน** เป็นเว็บจัดการ Test Case แบบเล็ก ๆ ไม่ใช้ framework หรือ library ใด ๆ ทุกไฟล์มีคอมเมนต์ภาษาไทยอธิบายทีละส่วน

สิ่งที่ทำได้: เพิ่ม/แก้ไข/ลบ Test Case, ค้นหา กรอง เรียงลำดับ, เปลี่ยนสถานะ, ดูสรุปผลเป็นตัวเลขและกราฟ, บันทึกอัตโนมัติ, โหลด/นำเข้า/ส่งออก JSON, ธีมมืด, คีย์ลัด และใช้บนมือถือได้

## วิธีเปิด

ต้องเปิดผ่าน **local server** ถ้าดับเบิลคลิก `index.html` ตรง ๆ (`file://`) เบราว์เซอร์จะบล็อก `import`/`export` ของ JS module และ `fetch` ข้อมูลตัวอย่าง

เลือกวิธีใดวิธีหนึ่ง:

| วิธี | ขั้นตอน |
| --- | --- |
| VS Code Live Server | ติดตั้ง extension "Live Server" แล้วคลิกขวาที่ `index.html` > **Open with Live Server** |
| Python | `python -m http.server 5500` ในโฟลเดอร์นี้ แล้วเปิด http://localhost:5500 |
| Node.js | `npx serve .` ในโฟลเดอร์นี้ แล้วเปิด URL ที่แสดง |

เปิดแล้วกด **โหลดข้อมูลตัวอย่าง** ที่ด้านล่างของหน้า เพื่อดู Test Case ของ Sauce Demo 8 เคส

## โครงสร้างไฟล์ (อะไรอยู่ที่ไหน)

```
QA-Test-Tracker/
├── index.html                 โครงสร้างหน้าเว็บทั้งหมด (HTML)
├── README.md                  ไฟล์นี้
├── assets/
│   └── favicon.svg            รูปภาพ/ไอคอน (ไฟล์ static ที่ไม่ใช่โค้ด)
├── css/                       หน้าตา แยกตามหน้าที่ โหลดตามลำดับนี้
│   ├── base.css               1) ตัวแปรสี ธีมมืด reset ตัวอักษร utility
│   ├── layout.css             2) โครงหน้า header/grid/footer + responsive + print
│   ├── components.css         3) ชิ้นส่วน UI: ปุ่ม ฟอร์ม ตาราง การ์ด dialog toast
│   └── animations.css         4) @keyframes + prefers-reduced-motion
├── js/                        พฤติกรรม แยกเป็น ES module ตามหน้าที่
│   ├── main.js                จุดเริ่มต้น: ผูก event ทั้งหมด เชื่อมทุกไฟล์
│   ├── store.js               เก็บ/จัดการข้อมูล (class, private field, EventTarget)
│   ├── ui.js                  ทุกอย่างที่แตะ DOM: render ตาราง สถิติ ฟอร์ม toast dialog
│   ├── validation.js          ทำความสะอาด + ตรวจข้อมูล (pure function)
│   ├── api.js                 fetch ข้อมูล / อ่านไฟล์ (async/await)
│   ├── storage.js             localStorage แบบปลอดภัย (try/catch)
│   ├── theme.js               สลับธีมสว่าง/มืด
│   ├── utils.js               ฟังก์ชันช่วยทั่วไป (debounce, format วันที่, ดาวน์โหลดไฟล์)
│   └── constants.js           ค่าคงที่: สถานะ ความสำคัญ โมดูล key ของ storage
└── data/
    └── sample-test-cases.json ข้อมูลตัวอย่าง (โหลดด้วย fetch)
```

**หลักการแยกไฟล์:** แยกตาม "หน้าที่" ไม่ใช่ตามขนาด

- **HTML:** มีไฟล์เดียว เพราะเป็นหน้าเดียว (ถ้ามีหลายหน้า ให้วางไว้ที่ root เช่น `about.html`)
- **CSS:** จากกว้างไปแคบ ตัวแปร > โครงหน้า > ชิ้นส่วน > แอนิเมชัน
- **JS:** แยกส่วน "ข้อมูล" (`store`, `validation`) ออกจากส่วน "หน้าจอ" (`ui`) ไฟล์ข้อมูลไม่แตะ DOM จึงทดสอบแยกและนำไปใช้ซ้ำได้
- **ไฟล์ที่ไม่ใช่โค้ด:** `assets/` เก็บรูป/ฟอนต์ ส่วน `data/` เก็บ JSON

## HTML, CSS, JS ทำงานร่วมกันอย่างไร

```
            ┌─────────────── index.html ────────────────┐
            │  <form id="case-form">  <tbody>  <dialog> │
            └───────┬───────────────────────▲───────────┘
   CSS เลือกด้วย    │ class / [data-*]      │ JS แก้ DOM: textContent,
   .btn [data-status]                       │ classList, dataset, hidden,
            ▼                               │ style.setProperty("--value")
      css/*.css                       js/ui.js
                                            ▲
  ผู้ใช้คลิก/พิมพ์ ──► js/main.js ──► js/store.js ──► event "change"
                     (event listener)  (แก้ข้อมูล)    ├─► storage.js (บันทึก)
                                                      └─► ui.js (วาดหน้าใหม่)
```

ตัวอย่างการทำงานร่วมกันที่ควรดูในโค้ด:

| สิ่งที่เห็นบนจอ | HTML | CSS | JS |
| --- | --- | --- | --- |
| ธีมมืด | ปุ่ม `#theme-toggle` | `:root[data-theme="dark"]` เปลี่ยนค่าตัวแปร | `theme.js` ตั้ง `dataset.theme` |
| แถบสีซ้ายของแถวตามสถานะ | `<template>` แถว | `.case-row[data-status="pass"]` | `ui.js` ตั้ง `row.dataset.status` |
| กราฟแท่งตามโมดูล | `<ul id="module-chart">` | `width: calc(var(--value) * 1%)` | `fill.style.setProperty("--value", 40)` |
| ช่องกรอกผิดเป็นสีแดง | `<p data-error-for="title">` | `.field.is-invalid .input`, `:user-invalid` | `showFieldErrors()` ใส่ class |
| ฟอร์มโหมดแก้ไขมีกรอบเหลือง | `<form data-mode>` | `.panel--form:has(form[data-mode="edit"])` | `setFormMode("edit")` |
| ตัวเลขสถิติเด้ง | `.stat-card__value` | `@keyframes pop` | `classList.add("is-updated")` |
| กล่องยืนยันลบ | `<dialog>` + `<form method="dialog">` | `::backdrop` | `confirmAction()` คืน Promise |
| ตารางกลายเป็นการ์ดบนมือถือ | `<td data-label="โมดูล">` | `@media` + `content: attr(data-label)` | (ไม่ต้องใช้ JS) |

## สรุปความรู้ที่มีในโปรเจกต์

<details>
<summary><b>HTML</b></summary>

- โครงสร้าง semantic: `header` `nav` `main` `aside` `section` `article` `footer`
- head: `meta charset/viewport/description`, `link` (CSS, favicon, preconnect), `script type="module"`
- ฟอร์ม: `input` (text, search, date, checkbox, radio, file, hidden), `select`, `option`, `textarea`, `datalist`, `fieldset`, `legend`, `label for`, `output`, `required`, `minlength`, `maxlength`, `novalidate`
- ตาราง: `table`, `caption`, `thead`, `tbody`, `th scope`
- อื่น ๆ: `template`, `dialog`, `details`/`summary`, `progress`, `dl`/`dt`/`dd`, `kbd`, `noscript`, inline `svg`
- Accessibility: `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-live`, `aria-pressed`, `role`, skip link
- `data-*` สำหรับ JS/CSS และ `data-testid` สำหรับ automated test
</details>

<details>
<summary><b>CSS</b></summary>

- Custom properties (`--color-primary`, `var()`) + ธีมมืดด้วยการเปลี่ยนค่าตัวแปร
- Selector: element, class, id, attribute `[data-status="pass"]`, descendant, child `>`
- Pseudo-class: `:hover` `:focus` `:focus-visible` `:active` `:disabled` `:checked` `:empty` `:nth-child()` `:last-child` `:not()` `:has()` `:user-invalid`
- Pseudo-element: `::before` `::after` `::placeholder` `::selection` `::backdrop` `::-webkit-progress-value`
- Layout: Flexbox, Grid (`grid-template-areas`, `repeat(auto-fit, minmax())`), `position` sticky/absolute/fixed
- ฟังก์ชัน: `calc()` `clamp()` `min()` `color-mix()` `attr()` `linear-gradient()`
- Responsive: `@media (max-width)`, `@media print`, `@media (prefers-reduced-motion)`
- `transition`, `@keyframes`, `animation`, `transform`
- การตั้งชื่อแบบ BEM (`block__element--modifier`) และเรื่อง specificity
</details>

<details>
<summary><b>JavaScript</b></summary>

- ES Modules: `import` / `export`
- ไวยากรณ์: `const`/`let`, template literal, arrow function, destructuring, spread/rest, default parameter, `?.`, `??`, `switch`, early return
- Array: `map` `filter` `reduce` `find` `findIndex` `some` `sort` `includes` `forEach` + `Set`, `Object.entries/fromEntries/keys/hasOwn/freeze`
- OOP: `class`, `extends EventTarget`, `#private`, getter, `CustomEvent` (Observer pattern)
- DOM: `querySelector`, `closest`, `matches`, `createElement`, `template.content.cloneNode`, `DocumentFragment`, `append`, `replaceChildren`, `textContent`, `classList`, `dataset`, `hidden`, `style.setProperty`
- Event: `submit` `reset` `input` `change` `click` `keydown` `storage`, `preventDefault`, event delegation, `{ once: true }`
- ฟอร์ม: `FormData`, `form.elements`, `RadioNodeList`, validation ฝั่ง JS
- Async: `Promise`, `async`/`await`, `try`/`catch`/`finally`, `fetch`, `response.ok`, `AbortSignal.timeout`, `file.text()`
- Browser API: `localStorage`, `matchMedia`, `Intl.DateTimeFormat`, `crypto.randomUUID`, `Blob` + `URL.createObjectURL`, `dialog.showModal()`
- เทคนิค: debounce (closure), ป้องกัน XSS ด้วย `textContent`
</details>

## ลำดับการอ่านโค้ดที่แนะนำ

1. `index.html` ดูโครงหน้าและ `id`/`data-*` ที่ JS ใช้
2. `css/base.css` > `layout.css` > `components.css` > `animations.css`
3. `js/constants.js` > `utils.js` > `storage.js` > `validation.js` (ไฟล์เล็ก ไม่แตะหน้าเว็บ)
4. `js/store.js` (หัวใจของข้อมูล)
5. `js/ui.js` (การวาดหน้า)
6. `js/main.js` (เชื่อมทุกอย่าง อ่านตามหมายเลขหัวข้อ 1-9)

## แบบฝึกหัดต่อยอด

- เพิ่มสถานะใหม่ `"skipped"` (แก้ `constants.js` และสีใน `components.css`)
- เพิ่มช่อง "ผู้ทดสอบ" ในฟอร์ม แล้วให้ค้นหาได้
- เพิ่มปุ่ม "ทำซ้ำเคส" (duplicate) ในแต่ละแถว
- เก็บค่าตัวกรองไว้ใน URL (`URLSearchParams`) เพื่อแชร์ลิงก์ได้
- **สำหรับ QA:** เขียน Playwright test ทดสอบหน้านี้ โดยใช้ `data-testid` ที่เตรียมไว้ เช่น `page.getByTestId("submit-case")`

## ทดลองใน DevTools

เปิด DevTools (F12) > Console แล้วลองพิมพ์:

```js
qaTracker.store.all          // ข้อมูลทั้งหมด
qaTracker.store.stats        // สถิติ
qaTracker.store.query({ status: "fail" })
localStorage.getItem("qa-tracker:cases")
```

ลองกรอกชื่อเคสเป็น `<img src=x onerror=alert(1)>` จะเห็นว่าแสดงเป็นข้อความธรรมดา ไม่ถูกรันเป็นโค้ด (ดูคำอธิบายหัวไฟล์ `ui.js`)
