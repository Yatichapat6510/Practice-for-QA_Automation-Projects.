/*
 * Inheritance (การสืบทอด) ใน JavaScript
 *
 * คลาสลูกนำคุณสมบัติ (properties) และเมธอด (methods) จากคลาสแม่มาใช้ต่อได้
 * ช่วยลดการเขียนโค้ดซ้ำ และทำให้จัดกลุ่มสิ่งที่มีลักษณะร่วมกันได้
 *
 * ตัวอย่างในไฟล์นี้: Animal เป็นคลาสแม่ ส่วน Dog, Cat, Bird extends Animal เป็นคลาสลูก
 * เมื่อ new Dog(...) ทำงาน constructor ของ Dog เรียก super(name, age) เพื่อให้
 * Animal ตั้งค่า name และ age ก่อน แล้ว Dog จึงตั้งค่า breed ของตัวเอง
 * Dog.speak() เป็น override ส่วน Dog.describe() ใช้ super.describe() เรียก
 * เมธอดเดิมของแม่แล้วเติมข้อมูลสายพันธุ์
 *
 * เมื่อเรียก dog.describe() JavaScript ค้นหาเมธอดตาม prototype chain:
 * ตรวจ Dog ก่อน แล้วจึง Animal หากไม่พบใน Dog; Puppy ยังสืบทอดต่อจาก Dog ได้
 * ดังนั้น Puppy จึงใช้เมธอดจาก Dog และ Animal ได้โดยไม่ต้องเขียนซ้ำ
 *
 *   puppy ──> Puppy.prototype ──> Dog.prototype ──> Animal.prototype ──> Object.prototype ──> null
 *
 * ส่วนที่เกี่ยวข้อง:
 * - class: ใช้ประกาศคลาส
 * - extends: ระบุว่าคลาสใดสืบทอดจากคลาสใด
 * - super(...): เรียก constructor ของคลาสแม่ (ต้องเรียกก่อนใช้ this ใน constructor ลูก)
 * - super.method(): เรียกเมธอดของคลาสแม่จากคลาสลูก (ใช้ได้ทั้ง method ปกติและ static)
 * - override: คลาสลูกประกาศเมธอดชื่อเดียวกับคลาสแม่เพื่อปรับการทำงาน
 * - prototype chain: กลไกเบื้องหลังที่ JavaScript ใช้ค้นหาเมธอดที่สืบทอดมา
 * - composition (has-a): ทางเลือกแทน inheritance ดู PetOwner ท้ายไฟล์
 *
 * วิธีใช้:
 * - รันไฟล์นี้เดี่ยว ๆ:   node Inheritance.js
 * - ใช้ร่วมกับไฟล์อื่น:   const { Animal, Dog, Cat } = require("./Inheritance");
 */

// คลาสแม่ (Base / Parent class) รวมข้อมูลและพฤติกรรมที่ใช้ร่วมกัน
class Animal {
	constructor(name, age) {
		if (typeof name !== "string" || name.trim() === "") {
			throw new TypeError("ชื่อสัตว์ต้องเป็นข้อความที่ไม่ว่าง");
		}
		if (!Number.isFinite(age) || age < 0) {
			throw new RangeError("อายุต้องเป็นตัวเลขตั้งแต่ 0 ขึ้นไป");
		}
		this.name = name;
		this.age = age;
	}

	describe() {
		return `${this.name} อายุ ${this.age} ปี`;
	}

	speak() {
		return `${this.name} ส่งเสียง`;
	}

	// เมธอดที่คลาสลูกทุกตัวได้ไปใช้โดยไม่ต้องเขียนเอง
	birthday() {
		this.age++;
		return `สุขสันต์วันเกิด ${this.name} ตอนนี้อายุ ${this.age} ปี`;
	}

	// this.constructor.name คืนชื่อคลาสจริงของออบเจ็กต์ (Dog, Cat, ...) ไม่ใช่ Animal เสมอ
	get type() {
		return this.constructor.name;
	}

	// static method เรียกผ่านชื่อคลาส ไม่ได้เรียกผ่าน instance
	static category() {
		return "สัตว์";
	}
}

// คลาสลูก (Derived / Child class) สืบทอดสมาชิกจาก Animal ด้วย extends
class Dog extends Animal {
	constructor(name, age, breed) {
		// ส่งข้อมูลพื้นฐานให้ constructor ของคลาสแม่ (ต้องเรียกก่อนใช้ this)
		super(name, age);
		this.breed = breed;
	}

	// Override: ปรับเมธอด speak() ให้เหมาะกับสุนัข
	speak() {
		return `${this.name} เห่า: โฮ่ง!`;
	}

	// เรียกเมธอดเดิมของแม่ด้วย super แล้วเพิ่มรายละเอียดของคลาสลูก
	describe() {
		return `${super.describe()} สายพันธุ์ ${this.breed}`;
	}

	// เมธอดใหม่ที่มีเฉพาะ Dog (Animal และ Cat ไม่มี)
	fetch(item) {
		return `${this.name} ไปคาบ${item}`;
	}
}

// คลาสลูกอีกตัวจาก Animal เดียวกัน: แสดงว่าคลาสแม่หนึ่งตัวมีลูกได้หลายตัว
class Cat extends Animal {
	constructor(name, age, isIndoor = true) {
		super(name, age);
		this.isIndoor = isIndoor;
	}

	speak() {
		return `${this.name} ร้อง: เมี้ยว~`;
	}

	describe() {
		const place = this.isIndoor ? "เลี้ยงในบ้าน" : "เลี้ยงนอกบ้าน";
		return `${super.describe()} (${place})`;
	}

	// Override static method และเรียกของแม่ด้วย super.category()
	static category() {
		return `${super.category()} > แมว`;
	}
}

// คลาสลูกที่ไม่มี constructor: JavaScript สร้างให้อัตโนมัติ
// เทียบเท่า constructor(...args) { super(...args); }
class Bird extends Animal {
	speak() {
		return `${this.name} ร้อง: จิ๊บ ๆ`;
	}

	fly() {
		return `${this.name} บินขึ้นฟ้า`;
	}
}

// การสืบทอดหลายระดับ (multi-level): Puppy สืบทอดจาก Dog ซึ่งสืบทอดจาก Animal
class Puppy extends Dog {
	constructor(name, age, breed, favoriteToy) {
		super(name, age, breed);
		this.favoriteToy = favoriteToy;
	}

	play() {
		return `${this.name} เล่นกับ${this.favoriteToy}`;
	}

	// Override ต่อจาก Dog อีกชั้น แล้วยังเรียกของ Dog ได้ด้วย super
	speak() {
		return `${super.speak()} (เสียงเล็ก ๆ)`;
	}
}

/*
 * Composition (has-a) เทียบกับ Inheritance (is-a)
 * - Dog "เป็น" Animal         -> ใช้ extends
 * - PetOwner "มี" Animal หลายตัว -> เก็บ Animal ไว้เป็น property (composition)
 * PetOwner ไม่ได้ extends Animal เพราะเจ้าของไม่ใช่สัตว์
 */
class PetOwner {
	#pets = [];

	constructor(name) {
		this.name = name;
	}

	adopt(animal) {
		if (!(animal instanceof Animal)) {
			throw new TypeError("รับเลี้ยงได้เฉพาะออบเจ็กต์ที่เป็น Animal");
		}
		this.#pets.push(animal);
		return this;
	}

	get pets() {
		return [...this.#pets];
	}

	// เรียก speak() ของสัตว์ทุกตัว แต่ละตัวตอบตามคลาสของตัวเอง (ดูเพิ่มที่ Polymorphism.js)
	callPets() {
		return this.#pets.map((pet) => pet.speak());
	}
}

module.exports = { Animal, Dog, Cat, Bird, Puppy, PetOwner };

// ตัวอย่างด้านล่างทำงานเฉพาะตอนรัน "node Inheritance.js" ตรง ๆ
if (require.main === module) {
	console.log("===== 1) คลาสลูกใช้ของที่สืบทอด + override + เมธอดใหม่ =====");
	const dog = new Dog("เจ้าถุงเงิน", 3, "ชิบะอินุ");
	console.log(dog.describe()); // เจ้าถุงเงิน อายุ 3 ปี สายพันธุ์ ชิบะอินุ
	console.log(dog.speak()); // เจ้าถุงเงิน เห่า: โฮ่ง!
	console.log(dog.fetch("ลูกบอล")); // เจ้าถุงเงิน ไปคาบลูกบอล
	console.log(dog.birthday()); // สุขสันต์วันเกิด เจ้าถุงเงิน ตอนนี้อายุ 4 ปี (มาจาก Animal)
	console.log(dog.type); // Dog

	console.log("\n===== 2) คลาสแม่เดียว ลูกหลายตัว =====");
	const cat = new Cat("ส้มจี๊ด", 2);
	const bird = new Bird("นกน้อย", 1); // Bird ไม่มี constructor ก็ส่งค่าให้ Animal ได้
	console.log(cat.describe()); // ส้มจี๊ด อายุ 2 ปี (เลี้ยงในบ้าน)
	console.log(cat.speak()); // ส้มจี๊ด ร้อง: เมี้ยว~
	console.log(bird.describe()); // นกน้อย อายุ 1 ปี (ใช้ describe ของ Animal ตรง ๆ)
	console.log(bird.fly()); // นกน้อย บินขึ้นฟ้า
	console.log(typeof cat.fetch); // undefined เพราะ fetch มีเฉพาะ Dog

	console.log("\n===== 3) instanceof ตรวจความสัมพันธ์ =====");
	console.log(dog instanceof Dog); // true
	console.log(dog instanceof Animal); // true เพราะ Dog สืบทอดจาก Animal
	console.log(cat instanceof Dog); // false คลาสพี่น้องไม่เกี่ยวกัน

	console.log("\n===== 4) static method ที่สืบทอดและ override =====");
	console.log(Dog.category()); // สัตว์ (สืบทอดจาก Animal)
	console.log(Cat.category()); // สัตว์ > แมว (override + super.category())

	console.log("\n===== 5) การสืบทอดหลายระดับ =====");
	const puppy = new Puppy("มะลิ", 1, "โกลเดนรีทรีฟเวอร์", "ตุ๊กตา");
	console.log(puppy.describe()); // มะลิ อายุ 1 ปี สายพันธุ์ โกลเดนรีทรีฟเวอร์ (จาก Dog + Animal)
	console.log(puppy.speak()); // มะลิ เห่า: โฮ่ง! (เสียงเล็ก ๆ)
	console.log(puppy.play()); // มะลิ เล่นกับตุ๊กตา
	console.log(puppy instanceof Animal); // true

	console.log("\n===== 6) ดู prototype chain จริง =====");
	console.log(Object.getPrototypeOf(Puppy.prototype) === Dog.prototype); // true
	console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
	console.log(Object.hasOwn(puppy, "name")); // true name อยู่ในตัวออบเจ็กต์เอง
	console.log(Object.hasOwn(puppy, "describe")); // false describe อยู่บน prototype

	console.log("\n===== 7) Composition: เจ้าของมีสัตว์หลายตัว =====");
	const owner = new PetOwner("ลูมี่").adopt(dog).adopt(cat).adopt(puppy);
	console.log(`${owner.name} มีสัตว์ ${owner.pets.length} ตัว`); // ลูมี่ มีสัตว์ 3 ตัว
	console.log(owner.callPets());
	try {
		owner.adopt({ name: "ของเล่น" });
	} catch (error) {
		console.log("Error:", error.message); // รับเลี้ยงได้เฉพาะออบเจ็กต์ที่เป็น Animal
	}
}

/*
 * สรุปวิธีใช้:
 * 1. สร้างคลาสแม่ด้วย class และกำหนดข้อมูล/เมธอดที่ใช้ร่วมกัน
 * 2. สร้างคลาสลูกด้วย class Child extends Parent
 * 3. หากคลาสลูกมี constructor ให้เรียก super(...) ก่อนใช้ this
 *    (ถ้าไม่มี constructor JavaScript จะเรียก super ให้อัตโนมัติ)
 * 4. เรียกของแม่ด้วย super.method() หรือเขียน override เพื่อเปลี่ยนพฤติกรรม
 * 5. สร้าง object ด้วย new แล้วใช้สมาชิกที่สืบทอดมาเหมือนสมาชิกของคลาสลูก
 *
 * ควรใช้ inheritance เมื่อคลาสลูกเป็นชนิดหนึ่งของคลาสแม่จริง ๆ (is-a)
 * เช่น Dog เป็น Animal หากเพียงต้องการนำความสามารถมาใช้ร่วมกันโดยไม่ใช่
 * ความสัมพันธ์แบบ is-a ให้ใช้ composition (ประกอบ object) แทน เช่น PetOwner
 * JavaScript สืบทอดได้จากคลาสแม่เพียงตัวเดียว (single inheritance)
 */
