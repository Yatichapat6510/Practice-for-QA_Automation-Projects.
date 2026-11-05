# Practice writing code for QA Projects

พื้นที่ฝึกเขียนโค้ดและ Test Automation สำหรับงาน QA ตั้งแต่พื้นฐาน Python/JavaScript ไปจนถึงชุดทดสอบ Web, API และ Mobile พร้อม CI บน GitHub Actions

ระบบที่ใช้เป็นเป้าหมายทดสอบหลักคือ [Sauce Demo](https://www.saucedemo.com) (เว็บ) และ [My Demo App](https://github.com/saucelabs/my-demo-app-android) (Android)

## โครงสร้างโฟลเดอร์

| โฟลเดอร์ | เนื้อหา | รันใน CI |
| --- | --- | :---: |
| [`01_Python/`](01_Python/) | แบบฝึกหัด Python: function, OOP, exception, assignment | – |
| [`02_JavaScript/`](02_JavaScript/) | แบบฝึกหัด JavaScript: array, object, async/await, HTML/CSS เบื้องต้น | – |
| [`03_HTML-Resources/`](03_HTML-Resources/) | หน้า HTML สรุป roadmap และเตรียมสัมภาษณ์งาน QA | – |
| [`04_Playwright/`](04_Playwright/) | Playwright (JavaScript) ชุดทดสอบหลักบน Sauce Demo + แบบฝึกหัด | ✅ |
| [`05_Robot-Framework/`](05_Robot-Framework/) | Robot Framework + SeleniumLibrary/RequestsLibrary ทดสอบ UI และ API | ✅ |
| [`06_Appium/`](06_Appium/) | Appium บน Android ด้วย pytest และ Robot Framework (Page Object Model) | ✅ |
| [`07_cypress/`](07_cypress/) | Cypress บน Sauce Demo | ✅ |
| [`07_Workshops/`](07_Workshops/) | เนื้อหา workshop (Playwright, Robot, Postman, JMeter, SQL) แต่ละชุดมี dependency ของตัวเอง | – |
| [`08_Selenium/`](08_Selenium/) | สคริปต์ Selenium (Python) | – |
| [`09_Logs-Output/`](09_Logs-Output/) | log และรายงานจากการรันที่เก็บไว้อ้างอิง | – |
| [`11_Exam-Interview-Prep/`](11_Exam-Interview-Prep/), [`12_Prepare for exams and interviews/`](12_Prepare%20for%20exams%20and%20interviews/) | แบบทดสอบจำลองสำหรับเตรียมสอบ/สัมภาษณ์ | – |
| [`13_Postman/`](13_Postman/) | Postman collection และสำเนาโปรเจกต์สำหรับ portfolio (ดู [README](13_Postman/README.md)) | – |
| [`14_Maestro/`](14_Maestro/) | Maestro flow (YAML) บน Android ใช้ test case ชุดเดียวกับ Appium | ✅ |

> `07_cypress/` และ `07_Workshops/` ใช้เลขนำหน้าซ้ำกัน ยังไม่ได้เปลี่ยนชื่อเพื่อไม่ให้ path ใน CI และเอกสารเสียหาย

README ของแต่ละโมดูลมีขั้นตอนติดตั้งและคำสั่งรันโดยละเอียด: [Playwright](04_Playwright/README.md) · [Robot Framework](05_Robot-Framework/README.md) · [Appium](06_Appium/README.md) · [Maestro](14_Maestro/README.md)

## รันชุดทดสอบในเครื่อง

สิ่งที่ต้องมี: Python 3.11+, Node.js 20+ และ Google Chrome

```powershell
# Playwright
cd 04_Playwright
npm ci
npx playwright install chrome
npm test

# Robot Framework
cd 05_Robot-Framework
pip install -r requirements.txt
robot -d results tests/

# Cypress
cd 07_cypress
npm ci
npx cypress run --browser chrome --spec "cypress/e2e/1-getting-started/**/*.cy.js"
```

ชุด Appium และ Maestro ต้องมี Android emulator/อุปกรณ์จริงและ Appium server ดูขั้นตอนใน [06_Appium/README.md](06_Appium/README.md) และ [14_Maestro/README.md](14_Maestro/README.md)

## CI (GitHub Actions)

Workflow อยู่ที่ [`.github/workflows/`](.github/workflows/)

| Workflow | ทริกเกอร์ | สิ่งที่รัน |
| --- | --- | --- |
| [`playwright.yml`](.github/workflows/playwright.yml) | เปลี่ยนไฟล์ใน `04_Playwright/` | `npm test` บน Chrome |
| [`robot_ci.yml`](.github/workflows/robot_ci.yml) | ทุก push / pull request | `robot tests/` ใน `05_Robot-Framework/` |
| [`cypress.yml`](.github/workflows/cypress.yml) | เปลี่ยนไฟล์ใน `07_cypress/` | สเปกใน `cypress/e2e/1-getting-started/` |
| [`mobile.yml`](.github/workflows/mobile.yml) | เปลี่ยนไฟล์ใน `06_Appium/` หรือ `14_Maestro/` | pytest, Robot และ Maestro บน Android emulator |

หมายเหตุสำหรับชุด Robot Framework: เมื่อมีตัวแปร `CI` (GitHub Actions ตั้งให้อัตโนมัติ) keyword `Open Browser For Test` ใน [`resources/browser.robot`](05_Robot-Framework/resources/browser.robot) จะเปิด Chrome แบบ headless และ `--no-sandbox` เพื่อให้ทำงานบน runner ได้ ส่วนในเครื่องจะเปิดเบราว์เซอร์ตามปกติ

## ข้อควรรู้

- ชุดทดสอบเว็บเรียกเว็บภายนอก (Sauce Demo และ API สาธารณะ) ผลจึงขึ้นกับเครือข่ายและสถานะของเว็บนั้น
