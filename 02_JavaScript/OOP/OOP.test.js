/*
 * OOP.test.js: ชุดทดสอบอัตโนมัติสำหรับไฟล์ OOP ทั้งหมด
 *
 * ใช้ test runner ที่มากับ Node.js (node:test) ไม่ต้องติดตั้งอะไรเพิ่ม
 * วิธีรัน (ในโฟลเดอร์ 02_JavaScript/OOP):
 *   node --test              รันทุกไฟล์ที่ชื่อลงท้าย .test.js
 *   node --test OOP.test.js  รันเฉพาะไฟล์นี้
 *
 * รูปแบบการเขียนเทสต์:
 * - describe() จัดกลุ่มเทสต์ตามไฟล์/หัวข้อ
 * - test() หนึ่งกรณีทดสอบ ตั้งชื่อให้อ่านแล้วรู้ว่าคาดหวังอะไร
 * - assert.equal / deepEqual ตรวจค่า, assert.throws ตรวจว่าเกิด error ตามที่คาด
 * - แต่ละเทสต์สร้างออบเจ็กต์ใหม่เอง ไม่พึ่งผลของเทสต์อื่น (เทสต์อิสระต่อกัน)
 */

const { describe, test } = require("node:test");
const assert = require("node:assert/strict");

const { Users } = require("./Class");
const { BankAccount, createCounter } = require("./Encapsulation");
const { Animal, Dog, Cat, Bird, Puppy, PetOwner } = require("./Inheritance");
const { Shape, Circle, Rectangle, Square, Triangle, totalArea, largestShape, sortByArea, createShape } = require("./Polymorphism");
const { PaymentMethod, CreditCardPayment, PromptPayPayment, CashPayment, checkout } = require("./Abstraction");
const { BankTransferPayment, Product, DiscountProduct, PetProduct, BlockToy, Cart, Customer, Shop } = require("./OOP_Combined");

describe("Class.js: Users", () => {
	test("constructor กำหนด property และค่าเริ่มต้น", () => {
		const user = new Users("ลูมี่", 27);
		assert.equal(user.name, "ลูมี่");
		assert.equal(user.age, 27);
		assert.equal(user.email, "");
		assert.equal(user.role, "member");
	});

	test("setEmail รองรับ chaining และปฏิเสธอีเมลผิดรูปแบบ", () => {
		const user = new Users("เอ", 20).setEmail("a@example.com").setRole("admin");
		assert.equal(user.email, "a@example.com");
		assert.equal(user.role, "admin");
		assert.throws(() => user.setEmail("not-an-email"), /รูปแบบอีเมลไม่ถูกต้อง/);
	});

	test("getter isAdult คำนวณใหม่เมื่ออายุเปลี่ยน", () => {
		const user = new Users("บี", 17);
		assert.equal(user.isAdult, false);
		user.birthday();
		assert.equal(user.isAdult, true);
	});

	test("static count เพิ่มขึ้นทุกครั้งที่สร้าง และ id ไม่ซ้ำ", () => {
		const before = Users.count;
		const first = new Users("ซี", 1);
		const second = new Users("ดี", 2);
		assert.equal(Users.count, before + 2);
		assert.notEqual(first.id, second.id);
	});

	test("fromObject และ toJSON", () => {
		const user = Users.fromObject({ name: "มายด์", age: 30, email: "mind@example.com" });
		const json = JSON.parse(JSON.stringify(user));
		assert.deepEqual(Object.keys(json), ["id", "name", "age", "email", "role"]);
		assert.equal(json.email, "mind@example.com");
	});

	test("ข้อมูลไม่ถูกต้องใน constructor ต้อง throw", () => {
		assert.throws(() => new Users("", 20), TypeError);
		assert.throws(() => new Users("อี", -1), RangeError);
		assert.throws(() => new Users("อี", 1.5), RangeError);
	});
});

describe("Encapsulation.js: BankAccount", () => {
	test("ฝาก/ถอนแล้วยอดเงินถูกต้อง", () => {
		const account = new BankAccount("ลีน่า", 1000);
		assert.equal(account.deposit(500), 1500);
		assert.equal(account.withdraw(200), 1300);
		assert.equal(account.getSummary(), "เจ้าของบัญชี: ลีน่า, ยอดเงิน: 1300.00 บาท");
	});

	test("balance เป็น read-only และ private field ไม่โผล่ภายนอก", () => {
		const account = new BankAccount("ลีน่า", 100);
		assert.throws(() => {
			"use strict";
			account.balance = 0;
		}, TypeError);
		assert.equal(account.balance, 100);
		assert.deepEqual(Object.keys(account), []);
	});

	test("ป้องกันจำนวนเงินผิดและถอนเกินยอด", () => {
		const account = new BankAccount("ลีน่า", 100);
		assert.throws(() => account.deposit(0), RangeError);
		assert.throws(() => account.withdraw(Number.NaN), RangeError);
		assert.throws(() => account.withdraw(101), /ยอดเงินคงเหลือไม่เพียงพอ/);
		assert.equal(account.balance, 100); // ล้มเหลวแล้วยอดต้องไม่เปลี่ยน
	});

	test("setter owner ตัดช่องว่างและตรวจค่า", () => {
		const account = new BankAccount("ลีน่า");
		account.owner = "  หมิว  ";
		assert.equal(account.owner, "หมิว");
		assert.throws(() => (account.owner = ""), TypeError);
	});

	test("transfer ย้ายเงินระหว่างบัญชี และปฏิเสธบัญชีปลอม/บัญชีตัวเอง", () => {
		const from = new BankAccount("ก", 500);
		const to = new BankAccount("ข", 0);
		from.transfer(to, 200);
		assert.equal(from.balance, 300);
		assert.equal(to.balance, 200);
		assert.throws(() => from.transfer({ balance: 0 }, 10), /บัญชีปลายทางไม่ถูกต้อง/);
		assert.throws(() => from.transfer(from, 10), /บัญชีตัวเอง/);
		assert.throws(() => from.transfer(to, 9999), RangeError);
		assert.equal(from.balance, 300);
	});

	test("history คืนสำเนา แก้แล้วไม่กระทบข้อมูลจริง", () => {
		const account = new BankAccount("ลีน่า", 100);
		account.deposit(50);
		const history = account.history;
		history.push({ type: "แอบเพิ่ม" });
		history[0].amount = 999;
		assert.equal(account.history.length, 2);
		assert.equal(account.history[0].amount, 100);
	});

	test("createCounter ซ่อนตัวแปรด้วย closure และห้ามติดลบ", () => {
		const counter = createCounter();
		counter.decrement();
		assert.equal(counter.value, 0);
		counter.increment();
		assert.equal(counter.value, 1);
		assert.equal(counter.count, undefined);
	});
});

describe("Inheritance.js: Animal และคลาสลูก", () => {
	test("คลาสลูก override speak() ได้ผลต่างกัน", () => {
		assert.equal(new Dog("ด่าง", 2, "ไทย").speak(), "ด่าง เห่า: โฮ่ง!");
		assert.equal(new Cat("ส้ม", 1).speak(), "ส้ม ร้อง: เมี้ยว~");
		assert.equal(new Bird("นก", 1).speak(), "นก ร้อง: จิ๊บ ๆ");
		assert.equal(new Animal("ทั่วไป", 1).speak(), "ทั่วไป ส่งเสียง");
	});

	test("super.describe() ต่อข้อความของคลาสแม่", () => {
		assert.equal(new Dog("ด่าง", 2, "ไทย").describe(), "ด่าง อายุ 2 ปี สายพันธุ์ ไทย");
	});

	test("สืบทอดหลายระดับ: Puppy ใช้เมธอดของ Dog และ Animal", () => {
		const puppy = new Puppy("มะลิ", 1, "โกลเด้น", "ตุ๊กตา");
		assert.ok(puppy instanceof Puppy && puppy instanceof Dog && puppy instanceof Animal);
		assert.equal(puppy.fetch("บอล"), "มะลิ ไปคาบบอล");
		assert.match(puppy.speak(), /เสียงเล็ก/);
		assert.equal(puppy.birthday(), "สุขสันต์วันเกิด มะลิ ตอนนี้อายุ 2 ปี");
	});

	test("static method สืบทอดและ override ได้", () => {
		assert.equal(Dog.category(), "สัตว์");
		assert.equal(Cat.category(), "สัตว์ > แมว");
	});

	test("PetOwner (composition) รับเฉพาะ Animal", () => {
		const owner = new PetOwner("ลูมี่").adopt(new Dog("ด่าง", 2, "ไทย")).adopt(new Cat("ส้ม", 1));
		assert.equal(owner.pets.length, 2);
		assert.deepEqual(owner.callPets(), ["ด่าง เห่า: โฮ่ง!", "ส้ม ร้อง: เมี้ยว~"]);
		assert.throws(() => owner.adopt({ name: "ปลอม" }), TypeError);
	});
});

describe("Polymorphism.js: Shape และคลาสลูก", () => {
	test("area() และ perimeter() ถูกต้องในแต่ละรูปทรง", () => {
		assert.equal(new Rectangle(4, 5).area(), 20);
		assert.equal(new Square(4).perimeter(), 16);
		assert.equal(new Triangle(3, 4, 5).area(), 6);
		assert.ok(Math.abs(new Circle(1).area() - Math.PI) < 1e-9);
	});

	test("describe() ในคลาสแม่เรียก area() ของคลาสลูก", () => {
		assert.equal(new Rectangle(2, 3).describe(), "สี่เหลี่ยมผืนผ้า: พื้นที่ 6.00, เส้นรอบรูป 10.00");
	});

	test("ฟังก์ชันรวมทำงานกับทุกชนิด รวมถึง duck typing", () => {
		const shapes = [new Square(2), new Rectangle(1, 1), { name: "พิเศษ", area: () => 10 }];
		assert.equal(totalArea(shapes), 15);
		assert.equal(largestShape(shapes).name, "พิเศษ");
		assert.deepEqual(
			sortByArea(shapes).map((shape) => shape.area()),
			[1, 4, 10],
		);
	});

	test("Square รองรับทั้งตัวเลขและ object", () => {
		assert.equal(new Square(3).area(), 9);
		assert.equal(new Square({ side: 3 }).area(), 9);
	});

	test("createShape คืนคลาสที่ถูกต้อง และกรณีผิดพลาด", () => {
		assert.ok(createShape("circle", 2) instanceof Circle);
		assert.throws(() => createShape("hexagon"), /ไม่รู้จักรูปทรง/);
		assert.throws(() => new Shape("x").area(), /ต้องกำหนดเมธอด area/);
		assert.throws(() => new Triangle(1, 2, 10), RangeError);
		assert.throws(() => new Circle(0), RangeError);
	});
});

describe("Abstraction.js: PaymentMethod", () => {
	test("สร้าง abstract class ตรง ๆ ไม่ได้", () => {
		assert.throws(() => new PaymentMethod("x"), /abstract class/);
	});

	test("คลาสลูกที่ไม่ implement ครบถูกปฏิเสธตั้งแต่สร้าง", () => {
		class Incomplete extends PaymentMethod {
			validate() {
				return true;
			}
		}
		assert.throws(() => new Incomplete("x"), /ต้อง implement เมธอด process/);
	});

	test("pay() สำเร็จคืนใบเสร็จพร้อม reference", () => {
		const card = new CreditCardPayment("4111111111111234", 1000);
		const receipt = checkout(card, 300);
		assert.equal(receipt.success, true);
		assert.match(receipt.reference, /^PAY-\d{4}$/);
		assert.equal(card.availableLimit, 700);
		assert.equal(card.maskedNumber, "**** **** **** 1234");
	});

	test("เงื่อนไขธุรกิจไม่ผ่าน คืน success: false และไม่ตัดเงิน", () => {
		const card = new CreditCardPayment("4111111111111234", 100);
		const receipt = checkout(card, 500);
		assert.equal(receipt.success, false);
		assert.equal(receipt.reference, undefined);
		assert.equal(card.availableLimit, 100);
		assert.equal(checkout(new PromptPayPayment("0812345678"), 60_000).success, false);
	});

	test("CashPayment คำนวณเงินทอน", () => {
		assert.match(checkout(new CashPayment(1000), 750).message, /เงินทอน 250 บาท/);
	});

	test("ข้อมูลผิดรูปแบบต้อง throw", () => {
		assert.throws(() => checkout(new CashPayment(100), -1), RangeError);
		assert.throws(() => checkout({ pay: () => ({}) }, 10), TypeError);
		assert.throws(() => new CreditCardPayment("1234", 10), TypeError);
		assert.throws(() => new PromptPayPayment("12345"), TypeError);
	});
});

describe("OOP_Combined.js: ใช้ทุกไฟล์ร่วมกัน", () => {
	test("Customer สืบทอดจาก Users และ override role/getInfo", () => {
		const customer = new Customer("ลูมี่", 27, "lumee@example.com", 500);
		assert.ok(customer instanceof Users);
		assert.equal(customer.role, "customer");
		assert.match(customer.getInfo(), /ยอดเงินในบัญชี: 500\.00 บาท/);
		assert.throws(() => new Customer("โจ", 20, "bad-email"), /รูปแบบอีเมลไม่ถูกต้อง/);
	});

	test("สินค้าแต่ละชนิดคิดราคาด้วย getPrice() ของตัวเอง", () => {
		assert.equal(new Product("ก", 100).getPrice(), 100);
		assert.equal(new DiscountProduct("ข", 1500, 20).getPrice(), 1200);
		assert.equal(new BlockToy(new Square(8), 2).getPrice(), 128);
		assert.match(new PetProduct(new Cat("ส้ม", 1), 3000).describe(), /เมี้ยว/);
		assert.throws(() => new PetProduct({ name: "ปลอม" }, 1), TypeError);
		assert.throws(() => new DiscountProduct("ค", 100, 150), RangeError);
	});

	test("Cart รวมจำนวนสินค้าเดิม คำนวณยอด และคืนสำเนา", () => {
		const food = new Product("อาหาร", 250);
		const cart = new Cart().add(food, 2).add(food).add(new Product("ของเล่น", 99.5));
		assert.equal(cart.items.length, 2);
		assert.equal(cart.items[0].quantity, 3);
		assert.equal(cart.total, 849.5);
		cart.items.pop();
		assert.equal(cart.items.length, 2);
		assert.equal(cart.remove("ของเล่น"), true);
		assert.equal(cart.remove("ไม่มี"), false);
		assert.throws(() => cart.add({ name: "ปลอม" }), TypeError);
	});

	test("Shop: โอนผ่านบัญชีสำเร็จ ตัดเงินและล้างตะกร้า", () => {
		const shop = new Shop("ทดสอบ");
		const customer = new Customer("ลูมี่", 27, "", 1000);
		customer.cart.add(new Product("อาหาร", 300), 2);
		const receipt = shop.placeOrder(customer, customer.createBankTransfer());
		assert.equal(receipt.success, true);
		assert.equal(customer.walletBalance, 400);
		assert.equal(customer.cart.isEmpty, true);
		assert.equal(shop.revenue, 600);
		assert.equal(shop.orders.length, 1);
	});

	test("Shop: เงินไม่พอ ไม่ตัดเงิน ไม่ล้างตะกร้า ไม่บันทึกออเดอร์", () => {
		const shop = new Shop("ทดสอบ");
		const customer = new Customer("ลูมี่", 27, "", 100);
		customer.cart.add(new Product("สุนัข", 12000));
		const receipt = shop.placeOrder(customer, customer.createBankTransfer());
		assert.equal(receipt.success, false);
		assert.equal(customer.walletBalance, 100);
		assert.equal(customer.cart.isEmpty, false);
		assert.equal(shop.orders.length, 0);
	});

	test("Shop: รับช่องทางชำระเงินได้หลายแบบ และปฏิเสธตะกร้าว่าง", () => {
		const shop = new Shop("ทดสอบ");
		const customer = new Customer("มายด์", 30);
		assert.throws(() => shop.placeOrder(customer, new CashPayment(100)), /ตะกร้าว่าง/);
		customer.cart.add(new Product("แมว", 3500));
		assert.equal(shop.placeOrder(customer, new PromptPayPayment("0898765432")).success, true);
		assert.throws(() => new BankTransferPayment({ balance: 1 }), TypeError);
	});
});
