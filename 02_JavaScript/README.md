# 02_JavaScript

แบบฝึกหัด JavaScript, HTML และ CSS เรียงจากพื้นฐานไปจนถึงโปรเจกต์ที่ใช้ทั้งสามภาษาร่วมกัน

## โครงสร้างโฟลเดอร์

```
02_JavaScript/
├── README.md               ไฟล์นี้ (แผนที่โฟลเดอร์)
├── JavaScript/             1) พื้นฐาน JS: ตัวแปร string array object loop function async
├── HTML/                   2) พื้นฐาน HTML DOM (index.html)
├── CSS/                    2) สไตล์ของ HTML/index.html
├── OOP/                    3) OOP ด้วย class: รันด้วย Node.js
│   ├── Class.js
│   ├── Encapsulation.js
│   ├── Inheritance.js
│   ├── Polymorphism.js
│   ├── Abstraction.js
│   ├── OOP_Combined.js     ใช้ทั้ง 5 เรื่องร่วมกัน (ร้านสัตว์เลี้ยง)
│   └── OOP.test.js         ชุดทดสอบ (node --test)
└── Projects/               4) โปรเจกต์ที่ใช้ HTML + CSS + JS ร่วมกัน
    └── QA-Test-Tracker/    เว็บจัดการ Test Case (มี README ของตัวเอง)
```

## ลำดับการเรียนที่แนะนำ

| ลำดับ | โฟลเดอร์ | วิธีรัน |
| :---: | --- | --- |
| 1 | [`JavaScript/`](JavaScript/) | `node "JavaScript/Array.js"` หรือเปิด Run ใน VS Code |
| 2 | [`HTML/`](HTML/) + [`CSS/`](CSS/) | เปิดใน Live Server |
| 3 | [`OOP/`](OOP/) | `cd OOP` แล้ว `node Class.js`, `node OOP_Combined.js`, `node --test` |
| 4 | [`Projects/QA-Test-Tracker/`](Projects/QA-Test-Tracker/) | เปิด `index.html` ด้วย Live Server (ดู [README](Projects/QA-Test-Tracker/README.md)) |

## หลักการจัดไฟล์: ไฟล์ใหม่ควรวางที่ไหน

| ถ้าเป็น... | วางที่ | ตัวอย่าง |
| --- | --- | --- |
| แบบฝึกหัด JS ไฟล์เดียว รันด้วย Node | `JavaScript/` | `JavaScript/Set and Map.js` |
| เรื่อง OOP / class | `OOP/` | `OOP/Interface.js` |
| แบบฝึก HTML/CSS เล็ก ๆ ไม่กี่ไฟล์ | `HTML/` และ `CSS/` | |
| เว็บที่มีหลายไฟล์ทำงานร่วมกัน | โฟลเดอร์ใหม่ใน `Projects/` | `Projects/Todo-App/` |

ภายในแต่ละโปรเจกต์เว็บ ให้ใช้โครงเดียวกับ `QA-Test-Tracker`:

```
Projects/ชื่อโปรเจกต์/
├── index.html      หน้าเว็บ (หลายหน้าก็วางที่ระดับนี้)
├── README.md       วิธีเปิดและคำอธิบาย
├── css/            ไฟล์ .css
├── js/             ไฟล์ .js (main.js เป็นจุดเริ่มต้น)
├── assets/         รูป ไอคอน ฟอนต์
└── data/           ไฟล์ JSON / ข้อมูลตัวอย่าง
```

> **หมายเหตุ:** [`HTML/index.html`](HTML/index.html) อ้างถึง `style.css` และ `Start.js` แบบ path เดียวกับตัวเอง แต่ไฟล์จริงอยู่ที่ `CSS/style.css` และ `JavaScript/Start.js` ถ้าจะใช้งานให้แก้ path เป็น `../CSS/style.css` และ `../JavaScript/Start.js`
