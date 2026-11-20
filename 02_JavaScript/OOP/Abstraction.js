/*
 * Abstraction (การซ่อนรายละเอียดความซับซ้อน)
 *
 * แนวคิด: ผู้ใช้เห็นเฉพาะ "สิ่งที่ทำได้" (interface) ไม่ต้องรู้ "ทำอย่างไร" (implementation)
 * ตัวอย่างชีวิตจริง: กดปุ่ม "ชำระเงิน" ไม่ต้องรู้ว่าระบบตัดบัตรหรือสร้าง QR อย่างไร
 *
 * Abstraction ต่างจาก Encapsulation อย่างไร:
 * - Encapsulation = ซ่อน "ข้อมูล" ไม่ให้ถูกแก้ตรง ๆ (private field)
 * - Abstraction   = ซ่อน "ขั้นตอน/ความซับซ้อน" เหลือไว้แค่เมธอดที่จำเป็น เช่น pay()
 *
 * JavaScript ไม่มีคีย์เวิร์ด abstract เหมือน Java/TypeScript จึงจำลองด้วย:
 * 1. new.target   ตรวจว่ามีคนสั่ง new คลาส abstract ตรง ๆ หรือไม่ ถ้าใช่ให้ throw
 * 2. abstract method  เมธอดในคลาสแม่ที่ throw error บังคับให้คลาสลูก override
 * 3. ตรวจตั้งแต่ constructor ว่าคลาสลูก implement ครบหรือยัง (fail fast)
 * 4. template method  pay() กำหนดลำดับขั้นตอนตายตัว แล้วให้คลาสลูกเติมรายละเอียดบางขั้น
 *
 * วิธีใช้:
 * - รันไฟล์นี้เดี่ยว ๆ:   node Abstraction.js
 * - ใช้ร่วมกับไฟล์อื่น:   const { PaymentMethod, CreditCardPayment } = require("./Abstraction");
 *   สร้างช่องทางชำระเงินใหม่ได้ด้วยการ extends PaymentMethod (ดู BankTransferPayment ใน OOP_Combined.js)
 */

// รายชื่อเมธอดที่คลาสลูก "ต้อง" เขียนเอง
const ABSTRACT_METHODS = ["validate", "process"];

// Abstract class: แม่แบบของช่องทางชำระเงินทุกแบบ สร้าง instance ตรง ๆ ไม่ได้
class PaymentMethod {
	// Static private field: ใช้สร้างเลขอ้างอิงที่ไม่ซ้ำกัน (ภายนอกมองไม่เห็นวิธีสร้าง)
	static #sequence = 0;

	constructor(label) {
		// new.target คือคลาสที่ถูกสั่ง new จริง
		// new PaymentMethod() -> new.target === PaymentMethod -> ไม่อนุญาต
		// new CashPayment()   -> new.target === CashPayment   -> ผ่าน
		if (new.target === PaymentMethod) {
			throw new TypeError("PaymentMethod เป็น abstract class สร้าง instance โดยตรงไม่ได้");
		}

		// ตรวจตั้งแต่ตอนสร้างว่าคลาสลูก override เมธอดที่บังคับครบหรือไม่
		// ถ้าเมธอดยังเป็นตัวเดียวกับของ PaymentMethod แปลว่ายังไม่ได้เขียนเอง
		for (const methodName of ABSTRACT_METHODS) {
			if (this[methodName] === PaymentMethod.prototype[methodName]) {
				throw new TypeError(`${new.target.name} ต้อง implement เมธอด ${methodName}()`);
			}
		}

		this.label = label;
	}

	// ---------- Abstract methods: คลาสลูกต้อง override ----------

	// คืน true/false ว่าชำระเงินจำนวนนี้ได้หรือไม่
	validate(amount) {
		throw new Error("abstract method: validate() ต้องถูก implement ในคลาสลูก");
	}

	// ทำการชำระเงินจริง และคืนข้อความรายละเอียด (ถ้ามี)
	process(amount) {
		throw new Error("abstract method: process() ต้องถูก implement ในคลาสลูก");
	}

	// ---------- Concrete method: ใช้ร่วมกันทุกคลาสลูก ----------

	// Template method: ผู้ใช้เรียกแค่ pay() ตัวเดียว ขั้นตอนข้างในถูกซ่อนไว้ทั้งหมด
	// 1) ตรวจจำนวนเงิน  2) validate() ของคลาสลูก  3) process() ของคลาสลูก  4) สร้างใบเสร็จ
	pay(amount) {
		if (!Number.isFinite(amount) || amount <= 0) {
			// ข้อมูลผิดรูปแบบ = ความผิดพลาดของโปรแกรมเมอร์ -> throw
			throw new RangeError("จำนวนเงินต้องเป็นตัวเลขมากกว่า 0");
		}

		if (!this.validate(amount)) {
			// เงื่อนไขทางธุรกิจไม่ผ่าน (เช่น วงเงินไม่พอ) = ผลลัพธ์ปกติ -> คืนผลว่าไม่สำเร็จ
			return this.#createReceipt(false, amount, `ไม่สามารถชำระด้วย${this.label}ได้`);
		}

		const detail = this.process(amount);
		return this.#createReceipt(true, amount, detail || "ชำระเงินสำเร็จ");
	}

	// Private method: รูปแบบใบเสร็จเป็นรายละเอียดภายใน คลาสลูกและผู้ใช้ไม่ต้องรู้
	#createReceipt(success, amount, message) {
		const receipt = { success, method: this.label, amount, message };
		if (success) {
			PaymentMethod.#sequence++;
			receipt.reference = `PAY-${String(PaymentMethod.#sequence).padStart(4, "0")}`;
		}
		return receipt;
	}
}

// ---------- คลาสลูก (Concrete classes): เติมรายละเอียดของแต่ละช่องทาง ----------

class CreditCardPayment extends PaymentMethod {
	#cardNumber; // เลขบัตรเต็มถูกซ่อนไว้ (Encapsulation ทำงานร่วมกับ Abstraction)
	#availableLimit;

	constructor(cardNumber, creditLimit) {
		super("บัตรเครดิต");
		if (!/^\d{16}$/.test(cardNumber)) {
			throw new TypeError("เลขบัตรต้องเป็นตัวเลข 16 หลัก");
		}
		this.#cardNumber = cardNumber;
		this.#availableLimit = creditLimit;
	}

	// แสดงเฉพาะ 4 หลักท้าย
	get maskedNumber() {
		return `**** **** **** ${this.#cardNumber.slice(-4)}`;
	}

	get availableLimit() {
		return this.#availableLimit;
	}

	validate(amount) {
		return amount <= this.#availableLimit;
	}

	process(amount) {
		this.#availableLimit -= amount;
		return `ตัดบัตร ${this.maskedNumber} วงเงินคงเหลือ ${this.#availableLimit} บาท`;
	}
}

class PromptPayPayment extends PaymentMethod {
	static MAX_PER_TRANSACTION = 50_000;

	constructor(phoneNumber) {
		super("พร้อมเพย์");
		if (!/^0\d{9}$/.test(phoneNumber)) {
			throw new TypeError("เบอร์พร้อมเพย์ต้องเป็นตัวเลข 10 หลัก ขึ้นต้นด้วย 0");
		}
		this.phoneNumber = phoneNumber;
	}

	validate(amount) {
		return amount <= PromptPayPayment.MAX_PER_TRANSACTION;
	}

	process(amount) {
		// ในระบบจริงขั้นนี้อาจสร้าง QR และเรียก API ธนาคาร ผู้เรียก pay() ไม่ต้องรู้เลย
		return `สร้าง QR พร้อมเพย์ไปยัง ${this.phoneNumber.slice(0, 3)}-xxx-${this.phoneNumber.slice(-4)}`;
	}
}

class CashPayment extends PaymentMethod {
	constructor(cashReceived) {
		super("เงินสด");
		this.cashReceived = cashReceived;
	}

	validate(amount) {
		return this.cashReceived >= amount;
	}

	process(amount) {
		const change = this.cashReceived - amount;
		this.cashReceived = 0; // ใช้เงินสดก้อนนี้ไปแล้ว
		return `รับเงินสด เงินทอน ${change} บาท`;
	}
}

// ฟังก์ชันฝั่งผู้ใช้: รู้จักแค่ PaymentMethod กับเมธอด pay() ไม่สนว่าเป็นช่องทางไหน
function checkout(paymentMethod, amount) {
	if (!(paymentMethod instanceof PaymentMethod)) {
		throw new TypeError("ต้องส่งช่องทางชำระเงินที่สืบทอดจาก PaymentMethod");
	}
	return paymentMethod.pay(amount);
}

module.exports = { PaymentMethod, CreditCardPayment, PromptPayPayment, CashPayment, checkout };

// ตัวอย่างด้านล่างทำงานเฉพาะตอนรัน "node Abstraction.js" ตรง ๆ
if (require.main === module) {
	const tryRun = (label, action) => {
		try {
			action();
		} catch (error) {
			console.log(`${label} -> ${error.name}: ${error.message}`);
		}
	};

	console.log("===== 1) สร้าง abstract class ตรง ๆ ไม่ได้ =====");
	tryRun("new PaymentMethod()", () => new PaymentMethod("ทั่วไป"));

	console.log("\n===== 2) คลาสลูกที่ implement ไม่ครบ ถูกจับได้ตั้งแต่สร้าง =====");
	class IncompletePayment extends PaymentMethod {
		validate() {
			return true;
		}
		// ลืมเขียน process()
	}
	tryRun("new IncompletePayment()", () => new IncompletePayment("ไม่ครบ"));

	console.log("\n===== 3) ผู้ใช้เรียกแค่ pay() / checkout() =====");
	const card = new CreditCardPayment("4111111111111234", 5000);
	const promptPay = new PromptPayPayment("0812345678");
	const cash = new CashPayment(1000);

	console.log(checkout(card, 1200));
	// { success: true, method: 'บัตรเครดิต', amount: 1200, message: 'ตัดบัตร **** **** **** 1234 วงเงินคงเหลือ 3800 บาท', reference: 'PAY-0001' }
	console.log(checkout(promptPay, 350));
	console.log(checkout(cash, 750)); // เงินทอน 250 บาท

	console.log("\n===== 4) เงื่อนไขไม่ผ่าน = คืนผลไม่สำเร็จ (ไม่ throw) =====");
	console.log(checkout(card, 99999)); // { success: false, ... ไม่สามารถชำระด้วยบัตรเครดิตได้ }
	console.log(checkout(promptPay, 60000)); // เกินวงเงินต่อครั้ง

	console.log("\n===== 5) ข้อมูลผิดรูปแบบ = throw =====");
	tryRun("จำนวนเงินติดลบ", () => checkout(cash, -10));
	tryRun("เลขบัตรผิด", () => new CreditCardPayment("1234", 1000));
	tryRun("ไม่ใช่ PaymentMethod", () => checkout({ pay: () => "ปลอม" }, 100));

	console.log("\n===== 6) รายละเอียดภายในถูกซ่อน =====");
	console.log(card.maskedNumber); // **** **** **** 1234
	console.log(card.cardNumber); // undefined เข้าถึงเลขบัตรเต็มไม่ได้
	console.log(card.availableLimit); // 3800

	console.log("\n===== 7) ใช้หลายช่องทางร่วมกัน (polymorphism ผ่าน abstraction) =====");
	const orders = [
		{ method: new CashPayment(500), amount: 120 },
		{ method: new PromptPayPayment("0899999999"), amount: 2500 },
		{ method: card, amount: 800 },
	];
	const receipts = orders.map(({ method, amount }) => checkout(method, amount));
	console.table(receipts.map(({ method, amount, success, reference }) => ({ method, amount, success, reference })));
}

/*
 * สรุป:
 * - Abstract class = แม่แบบที่ใช้สืบทอดเท่านั้น (ป้องกันด้วย new.target)
 * - Abstract method = สัญญาว่าคลาสลูกต้องมีเมธอดนี้ (ไม่มีจะ error)
 * - ผู้ใช้พึ่งพา "นามธรรม" (PaymentMethod.pay) ไม่พึ่งพา "รายละเอียด" (บัตร/QR/เงินสด)
 *   จึงเพิ่มช่องทางใหม่ได้โดยไม่ต้องแก้ checkout()
 */
