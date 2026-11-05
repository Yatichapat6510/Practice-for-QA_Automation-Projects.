# Appium Mobile Automation (Android)

ชุดทดสอบ UI อัตโนมัติสำหรับแอป Sauce Labs *My Demo App* (`com.saucelabs.mydemoapp.android`)
เขียนชุดเดียวกัน 2 แบบบน Page Object Model เพื่อเทียบแนวทาง:

- **Python + pytest** สำหรับงานที่ต้องการควบคุมด้วยโค้ด
- **Robot Framework + AppiumLibrary** สำหรับรายงานที่อ่านง่ายในมุมธุรกิจ

ครอบคลุม 6 test case (Login, ตะกร้าสินค้า และ defect ที่พบ 1 รายการ) รายละเอียดอยู่ที่ [`docs/test-cases.md`](docs/test-cases.md)

## โครงสร้าง

```text
06_Appium/
├── config/capabilities.py        # W3C capabilities (override ได้ด้วย env var)
├── pages/                        # Page Object ฝั่ง Python
├── resources/
│   ├── common_android.resource   # เปิด/ปิด session และ keyword ส่วนกลาง
│   ├── test_data.resource        # บัญชีเดโมและชื่อสินค้า
│   └── pages/                    # Page Object ฝั่ง Robot Framework
├── tests/
│   ├── py/                       # pytest: test_login, test_cart, test_known_defects, test_smoke
│   └── robot/                    # Robot Framework: login, cart, known_defects, test (smoke)
├── docs/test-cases.md
├── pytest.ini
└── requirements.txt
```

## สิ่งที่ต้องมี

- Node.js 20.19+ และ Appium พร้อม UiAutomator2 driver: `npm i -g appium && appium driver install uiautomator2`
- Android SDK และตั้งค่า environment variable `ANDROID_HOME` ให้ชี้ไปที่โฟลเดอร์ SDK (บน Windows คือ `%LOCALAPPDATA%\Android\Sdk`) UiAutomator2 driver ใช้ค่านี้หา `adb`
- Emulator (หรืออุปกรณ์จริง) ที่แสดงใน `adb devices` **ควรใช้ API 34 หรือต่ำกว่า แบบ page size 4 KB** (system image ที่ชื่อไม่มี `ps16k`) ดูหัวข้อ "ปัญหาที่พบบ่อย"
- ติดตั้งแอปบน emulator แล้ว (ดาวน์โหลด APK จาก [releases ของ my-demo-app-android](https://github.com/saucelabs/my-demo-app-android/releases))
- Python 3.11+ แล้วรัน `pip install -r 06_Appium/requirements.txt` (แนะนำให้ใช้ virtual environment `.venv` ที่ root ของ repo)

## วิธีรัน (จาก root ของ repository)

เปิด Appium Server ไว้ใน terminal แยกก่อน: `appium`

```bash
# pytest
pytest 06_Appium/tests/py                 # รันทั้งชุด
pytest 06_Appium/tests/py -m smoke        # รันเฉพาะ smoke

# Robot Framework
robot -d 06_Appium/results/robot 06_Appium/tests/robot
robot -d 06_Appium/results/robot -i smoke 06_Appium/tests/robot
```

- เปลี่ยนอุปกรณ์ได้ด้วย env var `ANDROID_DEVICE_NAME` (pytest) หรือ `-v DEVICE_NAME:<ชื่อ>` (Robot)
- Screenshot ตอนเทสล้มของ pytest อยู่ที่ `06_Appium/results/screenshots/`
- ของ Robot อยู่ในโฟลเดอร์ output พร้อม `log.html` และ `report.html`

## หลักการออกแบบ

- **Locator:** ใช้ Accessibility ID เป็นหลัก ใช้ resource-id เฉพาะ element ที่แอปไม่มี content-desc ทุกตัวตรวจกับ source code ของแอปแล้ว
- **Explicit wait:** ทุก action รอผ่าน explicit wait และปิด implicit wait ไว้ เพื่อให้เวลารอคาดเดาได้
- **แยก state:** รีสตาร์ทแอปก่อนทุกเทส เพราะสถานะ login และตะกร้าเก็บในหน่วยความจำ
- **Known defect:** เคสที่ยืนยัน defect ไม่ทำให้ CI แดงแต่ยังเห็นในรายงาน ดูรายละเอียดใน BUG-004

## CI

