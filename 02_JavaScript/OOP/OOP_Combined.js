/*
 * OOP_Combined.js: ใช้ OOP ทั้ง 5 เรื่องร่วมกันในตัวอย่างเดียว
 *
 * ไฟล์นี้ require คลาสจากไฟล์อื่นมาใช้ต่อ (แต่ละไฟล์ยังรันแยกเดี่ยว ๆ ได้เหมือนเดิม)
 *
 *   ไฟล์                 ใช้ทำอะไรในไฟล์นี้
 *   ──────────────────── ──────────────────────────────────────────────────────────
 *   Class.js            Users -> คลาสแม่ของ Customer
 *   Encapsulation.js    BankAccount -> กระเป๋าเงินของลูกค้า (ยอดเงินเป็น private)
 *   Inheritance.js      Dog, Cat -> สัตว์เลี้ยงที่ขายในร้าน (PetProduct "มี" Animal)
 *   Polymorphism.js     Circle, Square -> รูปทรงของบล็อกไม้ ราคาคิดจาก area()
 *   Abstraction.js      PaymentMethod -> แม่แบบช่องทางชำระเงิน + BankTransferPayment ที่สร้างเพิ่ม
 *
 * สถานการณ์: ร้านสัตว์เลี้ยงออนไลน์ ลูกค้าหยิบสินค้าใส่ตะกร้า แล้วชำระเงินได้หลายช่องทาง
 *
 * วิธีรัน:
 *   node OOP_Combined.js     รันตัวอย่างทั้งหมด
 *   node --test              รันชุดทดสอบใน OOP.test.js (ทดสอบทุกไฟล์)
 */

// ---------- นำเข้าคลาสจากไฟล์อื่น (ใช้ร่วมกัน) ----------
// require จะรันไฟล์นั้นหนึ่งครั้ง แต่ส่วนตัวอย่างใน if (require.main === module) จะไม่ทำงาน
const { Users } = require("./Class");
const { BankAccount } = require("./Encapsulation");
const { Animal, Dog, Cat } = require("./Inheritance");
const { Shape, Circle, Square, totalArea } = require("./Polymorphism");
const { PaymentMethod, CreditCardPayment, PromptPayPayment, checkout } = require("./Abstraction");

// ปัดเศษเป็นทศนิยม 2 ตำแหน่ง (ใช้กับเงิน)
const roundMoney = (value) => Math.round(value * 100) / 100;

// =====================================================================
// Abstraction + Encapsulation: ช่องทางชำระเงินใหม่ "โอนผ่านบัญชี"
// เพิ่มช่องทางใหม่ได้แค่ extends PaymentMethod ไม่ต้องแก้ Abstraction.js หรือ checkout()
// =====================================================================
class BankTransferPayment extends PaymentMethod {
	#account; // เก็บบัญชีเป็น private ภายนอกเอาบัญชีออกไปใช้ต่อไม่ได้

	constructor(account) {
		super("โอนผ่านบัญชี");
		if (!BankAccount.isAccount(account)) {
			throw new TypeError("ต้องใช้บัญชีที่สร้างจาก BankAccount");
		}
		this.#account = account;
	}

	validate(amount) {
		return this.#account.balance >= amount; // อ่านผ่าน getter เพราะเข้าถึง #balance ของ BankAccount ไม่ได้
	}

	process(amount) {
		const remaining = this.#account.withdraw(amount); // แก้ยอดผ่าน public method เท่านั้น
		return `ตัดเงินจากบัญชี ${this.#account.owner} คงเหลือ ${remaining.toFixed(2)} บาท`;
	}
}

// =====================================================================
// Inheritance + Polymorphism: สินค้าหลายชนิด ใช้ getPrice()/describe() ชื่อเดียวกัน
// =====================================================================
class Product {
	constructor(name, price) {
		if (typeof name !== "string" || name.trim() === "") {
			throw new TypeError("ชื่อสินค้าต้องเป็นข้อความที่ไม่ว่าง");
		}
		if (!Number.isFinite(price) || price <= 0) {
			throw new RangeError("ราคาสินค้าต้องมากกว่า 0");
		}
		this.name = name;
		this.price = price;
	}

	getPrice() {
		return this.price;
	}

	describe() {
		return `${this.name} ราคา ${this.getPrice().toFixed(2)} บาท`;
	}
}

// override getPrice(): ราคาหลังหักส่วนลด
class DiscountProduct extends Product {
	constructor(name, price, discountPercent) {
		super(name, price);
		if (!Number.isFinite(discountPercent) || discountPercent <= 0 || discountPercent >= 100) {
			throw new RangeError("ส่วนลดต้องอยู่ระหว่าง 1-99 เปอร์เซ็นต์");
		}
		this.discountPercent = discountPercent;
	}

	getPrice() {
		return roundMoney(super.getPrice() * (1 - this.discountPercent / 100));
	}

	describe() {
		return `${super.describe()} (ลด ${this.discountPercent}% จาก ${this.price} บาท)`;
	}
}

// Composition: PetProduct "มี" Animal (จาก Inheritance.js) อยู่ข้างใน
class PetProduct extends Product {
	constructor(animal, price) {
		if (!(animal instanceof Animal)) {
			throw new TypeError("PetProduct ต้องใช้ออบเจ็กต์ที่เป็น Animal");
		}
		super(`สัตว์เลี้ยง${animal.type === "Dog" ? "สุนัข" : "แมว"} ${animal.name}`, price);
		this.animal = animal;
	}

	// animal.describe()/speak() เป็น polymorphism: Dog กับ Cat ตอบไม่เหมือนกัน
	describe() {
		return `${super.describe()} | ${this.animal.describe()} | ${this.animal.speak()}`;
	}
}

// Composition: BlockToy "มี" Shape (จาก Polymorphism.js) ราคาคิดจาก shape.area()
// ไม่ว่า shape เป็น Circle หรือ Square ก็เรียก area() ได้เหมือนกัน
class BlockToy extends Product {
	constructor(shape, pricePerSquareUnit) {
		if (!(shape instanceof Shape)) {
			throw new TypeError("BlockToy ต้องใช้ออบเจ็กต์ที่เป็น Shape");
		}
		super(`บล็อกไม้${shape.name}`, roundMoney(shape.area() * pricePerSquareUnit));
		this.shape = shape;
	}

	describe() {
		return `${super.describe()} | ${this.shape.describe()}`;
	}
}

// =====================================================================
// Encapsulation: ตะกร้าสินค้า ภายนอกแก้รายการได้เฉพาะผ่าน add/remove/clear
// =====================================================================
class Cart {
	#items = []; // [{ product, quantity }]

	add(product, quantity = 1) {
		if (!(product instanceof Product)) {
			throw new TypeError("ใส่ตะกร้าได้เฉพาะ Product");
		}
		if (!Number.isInteger(quantity) || quantity <= 0) {
			throw new RangeError("จำนวนต้องเป็นจำนวนเต็มมากกว่า 0");
		}

		const existing = this.#items.find((item) => item.product === product);
		if (existing) {
			existing.quantity += quantity; // สินค้าเดิมให้เพิ่มจำนวน ไม่เพิ่มแถวใหม่
		} else {
			this.#items.push({ product, quantity });
		}
		return this; // chaining
	}

	remove(productName) {
		const before = this.#items.length;
		this.#items = this.#items.filter((item) => item.product.name !== productName);
		return this.#items.length < before; // true ถ้ามีการลบจริง
	}

	clear() {
		this.#items = [];
	}

	// คืนสำเนา พร้อมคำนวณราคาต่อแถว
	get items() {
		return this.#items.map(({ product, quantity }) => ({
			name: product.name,
			unitPrice: product.getPrice(), // polymorphism: แต่ละสินค้าคิดราคาเอง
			quantity,
			subtotal: roundMoney(product.getPrice() * quantity),
		}));
	}

	get total() {
		return roundMoney(this.items.reduce((sum, item) => sum + item.subtotal, 0));
	}

	get isEmpty() {
		return this.#items.length === 0;
	}
}

// =====================================================================
// Class + Inheritance + Encapsulation: ลูกค้า สืบทอดจาก Users
// =====================================================================
class Customer extends Users {
	// override class field ของ Users ("member") -> class field ของลูกถูกตั้งค่าหลัง super()
	role = "customer";
	#wallet; // BankAccount ของลูกค้า ซ่อนไว้ ภายนอกถอนเงินเองไม่ได้

	constructor(name, age, email, initialBalance = 0) {
		super(name, age, email); // Users ตรวจชื่อ/อายุ/อีเมล และให้ id
		this.#wallet = new BankAccount(name, initialBalance); // Users ตรวจชื่อก่อนแล้ว
		this.cart = new Cart();
	}

	get walletBalance() {
		return this.#wallet.balance;
	}

	topUp(amount) {
		return this.#wallet.deposit(amount);
	}

	// ให้ช่องทางชำระเงินผูกกับบัญชีได้ โดยไม่เปิดเผยตัวบัญชีออกไปตรง ๆ
	createBankTransfer() {
		return new BankTransferPayment(this.#wallet);
	}

	// override getInfo() ของ Users แล้วเติมยอดเงิน
	getInfo() {
		return `${super.getInfo()}, ยอดเงินในบัญชี: ${this.walletBalance.toFixed(2)} บาท`;
	}
}

// =====================================================================
// ร้านค้า: รวมทุกอย่างเข้าด้วยกัน
// =====================================================================
class Shop {
	#orders = [];

	constructor(name) {
		this.name = name;
	}

	// รับช่องทางชำระเงินแบบไหนก็ได้ที่ extends PaymentMethod (Abstraction + Polymorphism)
	placeOrder(customer, paymentMethod) {
		if (!(customer instanceof Customer)) {
			throw new TypeError("ต้องเป็นออบเจ็กต์ Customer");
		}
		if (customer.cart.isEmpty) {
			throw new Error("ตะกร้าว่าง ไม่สามารถสั่งซื้อได้");
		}

		const items = customer.cart.items;
		const total = customer.cart.total;
		const receipt = checkout(paymentMethod, total);

		if (receipt.success) {
			this.#orders.push({ customer: customer.name, items, total, reference: receipt.reference });
			customer.cart.clear(); // ชำระสำเร็จแล้วจึงล้างตะกร้า
		}
		return receipt;
	}

	get orders() {
		return this.#orders.map((order) => ({ ...order, items: [...order.items] }));
	}

	get revenue() {
		return roundMoney(this.#orders.reduce((sum, order) => sum + order.total, 0));
	}
}

module.exports = {
	BankTransferPayment,
	Product,
	DiscountProduct,
	PetProduct,
	BlockToy,
	Cart,
	Customer,
	Shop,
};

// ตัวอย่างด้านล่างทำงานเฉพาะตอนรัน "node OOP_Combined.js" ตรง ๆ
if (require.main === module) {
	console.log("===== ส่วนที่ 1: ใช้คลาสจากแต่ละไฟล์แยกกัน =====");
	const visitor = new Users("ผู้เยี่ยมชม", 20);
	console.log("[Class]         ", visitor.getInfo());
	const piggyBank = new BankAccount("กระปุก", 100);
	piggyBank.deposit(50);
	console.log("[Encapsulation] ", piggyBank.getSummary());
	console.log("[Inheritance]   ", new Dog("ด่าง", 2, "ไทยหลังอาน").describe());
	console.log("[Polymorphism]  ", "พื้นที่รวม", totalArea([new Circle(1), new Square(2)]).toFixed(2));
	console.log("[Abstraction]   ", new PromptPayPayment("0811111111").pay(100).message);

	console.log("\n===== ส่วนที่ 2: ใช้ร่วมกันในร้านค้า =====");
	const shop = new Shop("ร้านเพื่อนซี้สี่ขา");

	// สร้างสินค้า 4 ชนิด (ทุกตัวเป็น Product จึงใส่ตะกร้าเดียวกันได้)
	const dogFood = new Product("อาหารสุนัข 1 กก.", 250);
	const catTower = new DiscountProduct("คอนโดแมว", 1500, 20);
	const shiba = new PetProduct(new Dog("ถุงทอง", 1, "ชิบะอินุ"), 12000);
	const kitten = new PetProduct(new Cat("ส้มโอ", 1), 3500);
	const circleBlock = new BlockToy(new Circle(5), 2);
	const squareBlock = new BlockToy(new Square(8), 2);

	console.log("\n--- รายการสินค้า (describe() ต่างกันตามชนิด) ---");
	[dogFood, catTower, shiba, kitten, circleBlock, squareBlock].forEach((product) => console.log("•", product.describe()));

	// ลูกค้า: Customer extends Users และมี BankAccount อยู่ข้างใน
	const lumee = new Customer("ลูมี่", 27, "lumee@example.com", 10000);
	console.log("\n--- ข้อมูลลูกค้า ---");
	lumee.showInfo(); // showInfo() มาจาก Users แต่เรียก getInfo() เวอร์ชันของ Customer

	console.log("\n--- คำสั่งซื้อที่ 1: โอนผ่านบัญชี ---");
	lumee.cart.add(dogFood, 2).add(catTower).add(circleBlock).add(dogFood); // dogFood รวมเป็น 3 ชิ้น
	console.table(lumee.cart.items);
	console.log("ยอดรวม:", lumee.cart.total, "บาท");
	console.log(shop.placeOrder(lumee, lumee.createBankTransfer()));
	console.log("ยอดเงินคงเหลือ:", lumee.walletBalance, "| ตะกร้าว่าง:", lumee.cart.isEmpty);

	console.log("\n--- คำสั่งซื้อที่ 2: เงินในบัญชีไม่พอ -> ไม่สำเร็จ ตะกร้ายังอยู่ ---");
	lumee.cart.add(shiba);
	const failed = shop.placeOrder(lumee, lumee.createBankTransfer());
	console.log(failed); // success: false
	console.log("ตะกร้ายังมีของ:", !lumee.cart.isEmpty);

	console.log("\n--- คำสั่งซื้อที่ 2 (ลองใหม่): เปลี่ยนเป็นบัตรเครดิต ---");
	const card = new CreditCardPayment("5555444433332222", 50000);
	console.log(shop.placeOrder(lumee, card));

	console.log("\n--- คำสั่งซื้อที่ 3: ลูกค้าอีกคน จ่ายพร้อมเพย์ ---");
	const mind = new Customer("มายด์", 30, "mind@example.com");
	mind.cart.add(kitten).add(squareBlock, 2);
	mind.cart.remove(squareBlock.name); // เปลี่ยนใจ เอาบล็อกออก
	console.log(shop.placeOrder(mind, new PromptPayPayment("0898765432")));

	console.log("\n--- สรุปร้าน ---");
	console.table(shop.orders.map(({ customer, total, reference }) => ({ customer, total, reference })));
	console.log("รายได้รวม:", shop.revenue, "บาท");

	console.log("\n--- กรณีผิดพลาด ---");
	const tryRun = (label, action) => {
		try {
			action();
		} catch (error) {
			console.log(`${label} -> ${error.message}`);
		}
	};
	tryRun("สั่งซื้อตะกร้าว่าง", () => shop.placeOrder(mind, card));
	tryRun("ใส่ของที่ไม่ใช่ Product", () => mind.cart.add({ name: "ของปลอม", price: 1 }));
	tryRun("อีเมลลูกค้าผิด", () => new Customer("โจ", 20, "joe-at-mail"));
	tryRun("ส่วนลด 150%", () => new DiscountProduct("ของแถม", 100, 150));
}
