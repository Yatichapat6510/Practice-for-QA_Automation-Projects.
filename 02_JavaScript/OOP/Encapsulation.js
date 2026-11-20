/*
 * Encapsulation (การห่อหุ้มข้อมูล)
 *
 * แนวคิด: ซ่อนข้อมูลภายในคลาส และเปิดให้ใช้งานผ่านเมธอดหรือ getter/setter เท่านั้น
 * ทำให้ข้อมูลถูกแก้ไขได้เฉพาะทางที่ผ่านการตรวจสอบแล้ว เช่น ยอดเงินติดลบไม่ได้
 *
 * Access Modifier คือระดับการเข้าถึงสมาชิกของคลาส:
 * - Private:   ใช้ # นำหน้าชื่อ เข้าถึงได้เฉพาะภายในคลาส (ภาษาบังคับจริง)
 * - Public:    สมาชิกที่ไม่ขึ้นต้นด้วย # เป็น public โดยปริยาย เรียกจากภายนอกได้
 * - Protected: JavaScript ไม่มี protected โดยตรง; _ นำหน้าเป็นเพียงข้อตกลง
 *              ไม่ได้ป้องกันการเข้าถึงจากภายนอกจริง
 *
 * สิ่งที่มีในไฟล์นี้:
 * 1. private field        #owner, #balance, #transactions
 * 2. private method       #validateAmount(), #record()
 * 3. static private field #totalAccounts + static getter totalAccounts
 * 4. getter / setter      owner (อ่าน/เขียน), balance (อ่านอย่างเดียว)
 * 5. getter คืนสำเนา      history คืน array ใหม่ ภายนอกแก้ของจริงไม่ได้
 * 6. brand check          #balance in obj ตรวจว่าเป็นบัญชีจริงหรือไม่
 * 7. ทางเลือก: closure    ซ่อนข้อมูลด้วยฟังก์ชัน โดยไม่ต้องใช้คลาส
 *
 * วิธีใช้:
 * - รันไฟล์นี้เดี่ยว ๆ:   node Encapsulation.js
 * - ใช้ร่วมกับไฟล์อื่น:   const { BankAccount } = require("./Encapsulation");
 */

class BankAccount {
	// Private fields: ซ่อนข้อมูลภายในคลาส ไม่ให้เข้าถึงโดยตรงจากภายนอก
	#owner;
	#balance;
	#transactions = []; // ประวัติรายการ เริ่มต้นเป็น array ว่าง

	// Static private field: นับจำนวนบัญชีทั้งหมด ภายนอกแก้ตัวเลขนี้ไม่ได้
	static #totalAccounts = 0;

	// Static method เป็นเมธอดของคลาส ไม่ใช่ของออบเจ็กต์
	// เรียกใช้ด้วย BankAccount.isValidPositiveAmount(...) ได้โดยไม่ต้องสร้างบัญชี
	static isValidPositiveAmount(amount) {
		return Number.isFinite(amount) && amount > 0;
	}

	// Static getter: อ่านจำนวนบัญชีได้ แต่ไม่มี setter จึงแก้จากภายนอกไม่ได้
	static get totalAccounts() {
		return BankAccount.#totalAccounts;
	}

	// Brand check: `#balance in obj` เป็นจริงเฉพาะออบเจ็กต์ที่สร้างจากคลาสนี้
	// ใช้ป้องกันการส่งออบเจ็กต์ปลอมที่หน้าตาเหมือนบัญชีเข้ามา
	static isAccount(obj) {
		return typeof obj === "object" && obj !== null && #balance in obj;
	}

	// Constructor ทำงานเมื่อสร้างบัญชีใหม่
	constructor(owner, initialBalance = 0) {
		if (typeof owner !== "string" || owner.trim() === "") {
			throw new TypeError("ชื่อเจ้าของบัญชีต้องเป็นข้อความที่ไม่ว่าง");
		}
		if (!Number.isFinite(initialBalance) || initialBalance < 0) {
			throw new RangeError("ยอดเงินเริ่มต้นต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป");
		}

		this.#owner = owner.trim();
		this.#balance = initialBalance;
		this.#record("เปิดบัญชี", initialBalance);
		BankAccount.#totalAccounts++;
	}

	// ---------- Private methods: ใช้ได้เฉพาะภายในคลาส ----------

	// รวมการตรวจจำนวนเงินไว้ที่เดียว ทุกเมธอดเรียกใช้ซ้ำได้ (ไม่เขียนเงื่อนไขซ้ำ)
	#validateAmount(amount, label) {
		if (!BankAccount.isValidPositiveAmount(amount)) {
			throw new RangeError(`จำนวนเงิน${label}ต้องมากกว่า 0`);
		}
	}

	// บันทึกประวัติทุกครั้งที่ยอดเงินเปลี่ยน
	#record(type, amount) {
		this.#transactions.push({ type, amount, balanceAfter: this.#balance });
	}

	// ---------- Public getters / setters ----------

	// Public getter: อนุญาตให้อ่านข้อมูล โดยยังซ่อน private fields ไว้
	get owner() {
		return this.#owner;
	}

	// Public setter: กำหนดชื่อเจ้าของผ่าน property ได้ โดยตรวจสอบก่อนแก้ private field
	// เมื่อเขียน account.owner = "ชื่อใหม่" JavaScript จะเรียก setter นี้
	set owner(newOwner) {
		if (typeof newOwner !== "string" || newOwner.trim() === "") {
			throw new TypeError("ชื่อเจ้าของบัญชีต้องเป็นข้อความที่ไม่ว่าง");
		}

		this.#owner = newOwner.trim();
	}

	// มีแต่ getter ไม่มี setter = read-only
	// account.balance = 999 จะไม่มีผล (และเกิด TypeError ใน strict mode)
	get balance() {
		return this.#balance;
	}

	// คืน "สำเนา" ของประวัติ ไม่คืน array ตัวจริง
	// ถ้าภายนอก push หรือแก้ค่าในสำเนา ข้อมูลภายในคลาสจะไม่เปลี่ยน
	get history() {
		return this.#transactions.map((transaction) => ({ ...transaction }));
	}

	// ---------- Public methods ----------

	// Public method: เรียกจากภายนอกได้ และตรวจสอบข้อมูลก่อนแก้ยอดเงิน
	deposit(amount) {
		this.#validateAmount(amount, "ฝาก");

		this.#balance += amount;
		this.#record("ฝาก", amount);
		return this.#balance;
	}

	// Public method: เรียกจากภายนอกได้ และป้องกันการถอนเกินยอดคงเหลือ
	withdraw(amount) {
		this.#validateAmount(amount, "ถอน");
		if (amount > this.#balance) {
			throw new RangeError("ยอดเงินคงเหลือไม่เพียงพอ");
		}

		this.#balance -= amount;
		this.#record("ถอน", amount);
		return this.#balance;
	}

	// โอนเงินไปอีกบัญชี
	// จุดน่าสนใจ: ภายในคลาสเดียวกัน เข้าถึง #balance ของ "บัญชีอื่น" ได้ด้วย
	// (private คือ private ต่อคลาส ไม่ใช่ต่อออบเจ็กต์)
	transfer(targetAccount, amount) {
		if (!BankAccount.isAccount(targetAccount)) {
			throw new TypeError("บัญชีปลายทางไม่ถูกต้อง");
		}
		if (targetAccount === this) {
			throw new Error("ไม่สามารถโอนเข้าบัญชีตัวเองได้");
		}
		this.#validateAmount(amount, "โอน");
		if (amount > this.#balance) {
			throw new RangeError("ยอดเงินคงเหลือไม่เพียงพอ");
		}

		// ตรวจครบทุกเงื่อนไขแล้วจึงเปลี่ยนยอด ทำให้ไม่มีกรณีตัดเงินแล้วโอนไม่สำเร็จ
		this.#balance -= amount;
		targetAccount.#balance += amount;
		this.#record(`โอนไป ${targetAccount.#owner}`, amount);
		targetAccount.#record(`รับโอนจาก ${this.#owner}`, amount);
		return this.#balance;
	}

	// เมธอดสรุปข้อมูลบัญชี
	getSummary() {
		return `เจ้าของบัญชี: ${this.#owner}, ยอดเงิน: ${this.#balance.toFixed(2)} บาท`;
	}
}

/*
 * ทางเลือก: Encapsulation ด้วย closure (ไม่ใช้ class)
 * ตัวแปร count อยู่ในขอบเขตของฟังก์ชัน createCounter
 * ภายนอกเข้าถึงได้เฉพาะผ่านฟังก์ชันที่ return ออกไปเท่านั้น
 */
function createCounter(start = 0) {
	let count = start; // ข้อมูลที่ถูกซ่อน

	return {
		increment() {
			count++;
			return count;
		},
		decrement() {
			if (count > 0) count--; // กฎ: ห้ามติดลบ
			return count;
		},
		get value() {
			return count;
		},
	};
}

module.exports = { BankAccount, createCounter };

// ตัวอย่างด้านล่างทำงานเฉพาะตอนรัน "node Encapsulation.js" ตรง ๆ
if (require.main === module) {
	console.log("===== 1) ใช้งานผ่าน getter / setter / method =====");
	// สร้างออบเจ็กต์จากคลาส
	const account = new BankAccount("ลีน่า", 1000);

	// ใช้งานผ่านเมธอดและ getter ที่คลาสเปิดให้
	console.log(account.owner); // ลีน่า
	console.log(account.balance); // 1000
	account.owner = "หมิว"; // เรียก setter เพื่อตั้งชื่อใหม่ พร้อมตรวจสอบค่า
	account.deposit(500);
	account.withdraw(200);
	console.log(account.getSummary()); // เจ้าของบัญชี: หมิว, ยอดเงิน: 1300.00 บาท

	// เรียก static method ผ่านชื่อคลาส ไม่ต้องเรียกผ่าน account
	console.log(BankAccount.isValidPositiveAmount(100)); // true

	console.log("\n===== 2) ข้อมูลถูกป้องกันจากภายนอก =====");
	account.balance = 999999; // ไม่มี setter จึงไม่มีผล (ไฟล์นี้ไม่ใช่ strict mode เลยไม่ error)
	console.log("ยอดเงินยังเท่าเดิม:", account.balance); // 1300
	console.log(account["#balance"]); // undefined ชื่อ "#balance" แบบ string ไม่ใช่ private field
	console.log(Object.keys(account)); // [] private field ไม่โผล่ใน keys
	// ไม่สามารถเข้าถึงข้อมูล private จากภายนอกคลาสได้ (ถ้าเปิดคอมเมนต์จะเกิด SyntaxError)
	// console.log(account.#balance);
	// account.#balance = 0;

	console.log("\n===== 3) การตรวจสอบข้อมูล (validation) =====");
	const tryRun = (label, action) => {
		try {
			action();
		} catch (error) {
			console.log(`${label} -> ${error.name}: ${error.message}`);
		}
	};
	tryRun("ฝากติดลบ", () => account.deposit(-50)); // จำนวนเงินฝากต้องมากกว่า 0
	tryRun("ถอนเกินยอด", () => account.withdraw(10000)); // ยอดเงินคงเหลือไม่เพียงพอ
	tryRun("ชื่อว่าง", () => (account.owner = "   ")); // ชื่อเจ้าของบัญชีต้องเป็นข้อความที่ไม่ว่าง
	tryRun("ยอดเริ่มต้นผิด", () => new BankAccount("โจ", -1)); // ยอดเงินเริ่มต้นต้องเป็นตัวเลข...

	console.log("\n===== 4) โอนเงินระหว่างบัญชี + brand check =====");
	const savings = new BankAccount("ภูมิ", 200);
	account.transfer(savings, 300);
	console.log(account.getSummary()); // เจ้าของบัญชี: หมิว, ยอดเงิน: 1000.00 บาท
	console.log(savings.getSummary()); // เจ้าของบัญชี: ภูมิ, ยอดเงิน: 500.00 บาท

	const fakeAccount = { balance: 1_000_000 }; // หน้าตาเหมือนบัญชีแต่ไม่ใช่
	console.log(BankAccount.isAccount(savings)); // true
	console.log(BankAccount.isAccount(fakeAccount)); // false
	tryRun("โอนเข้าบัญชีปลอม", () => account.transfer(fakeAccount, 100)); // บัญชีปลายทางไม่ถูกต้อง

	console.log("\n===== 5) ประวัติรายการ (คืนสำเนา) =====");
	console.table(account.history);
	const copied = account.history;
	copied.push({ type: "แอบเพิ่ม", amount: 1 }); // แก้สำเนา
	console.log("จำนวนรายการจริง:", account.history.length); // 4 ไม่เปลี่ยน

	console.log("\n===== 6) Static private field =====");
	console.log("จำนวนบัญชีทั้งหมด:", BankAccount.totalAccounts); // 2 (บัญชีที่ throw ไม่ถูกนับ)

	console.log("\n===== 7) Encapsulation ด้วย closure =====");
	const counter = createCounter(1);
	counter.increment();
	counter.increment();
	counter.decrement();
	console.log("ค่าปัจจุบัน:", counter.value); // 2
	console.log(counter.count); // undefined เข้าถึงตัวแปร count โดยตรงไม่ได้
}

/*
 * สรุป:
 * - เก็บข้อมูลสำคัญเป็น private (#) แล้วเปิดเฉพาะ getter/method ที่จำเป็น
 * - ตรวจสอบข้อมูลก่อนเปลี่ยนค่าเสมอ ออบเจ็กต์จะไม่มีวันอยู่ในสถานะผิด
 * - ถ้าต้องคืน array/object ภายใน ให้คืนสำเนา ไม่คืนตัวจริง
 * - ข้อจำกัด: คลาสลูกที่ extends ก็เข้าถึง # ของคลาสแม่ไม่ได้ ต้องใช้ผ่าน getter/method
 *   (ดูตัวอย่าง Customer ใน OOP_Combined.js)
 */
