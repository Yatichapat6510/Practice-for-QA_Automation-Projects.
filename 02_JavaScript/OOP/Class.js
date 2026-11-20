/*
 * Class (คลาส) ใน JavaScript
 *
 * คลาสคือ "แม่พิมพ์" สำหรับสร้างออบเจ็กต์ที่มีโครงสร้างเดียวกัน
 * ออบเจ็กต์ที่สร้างจากคลาสด้วยคำสั่ง new เรียกว่า instance
 *
 * ส่วนประกอบของคลาสที่มีในไฟล์นี้:
 * 1. constructor      ทำงานอัตโนมัติเมื่อสั่ง new ใช้กำหนดค่าเริ่มต้นให้ออบเจ็กต์
 * 2. property         ข้อมูลของแต่ละออบเจ็กต์ เช่น this.name, this.age
 * 3. class field      ประกาศ property ไว้ในตัวคลาสโดยตรง เช่น role = "member"
 * 4. method           ฟังก์ชันที่เป็นพฤติกรรมของออบเจ็กต์ เช่น showInfo(), setEmail()
 * 5. getter           อ่านค่าเหมือน property แต่มีโค้ดคำนวณอยู่เบื้องหลัง เช่น isAdult
 *                     (setter ดูตัวอย่างได้ใน Encapsulation.js)
 * 6. static           สมาชิกของตัวคลาสเอง ไม่ใช่ของ instance เช่น Users.count
 * 7. method chaining  method คืนค่า this เพื่อให้เรียกต่อกันเป็นสายได้
 * 8. toJSON()         กำหนดว่าออบเจ็กต์จะแปลงเป็น JSON อย่างไร
 *
 * วิธีใช้:
 * - รันไฟล์นี้เดี่ยว ๆ:   node Class.js
 * - ใช้ร่วมกับไฟล์อื่น:   const { Users } = require("./Class");
 *   (ดูตัวอย่างการใช้ร่วมกันใน OOP_Combined.js)
 */

class Users {
	// Static field: ตัวนับจำนวนผู้ใช้ที่สร้างทั้งหมด เป็นค่าของคลาส ใช้ร่วมกันทุก instance
	static count = 0;

	// Class field: ทุก instance เริ่มต้นด้วยค่านี้ โดยไม่ต้องเขียนใน constructor
	role = "member";

	// constructor รับค่าตอนสั่ง new Users(name, age, email)
	// email = "" คือ default parameter ถ้าไม่ส่งค่ามา จะได้ค่าว่าง
	constructor(name, age, email = "") {
		if (typeof name !== "string" || name.trim() === "") {
			throw new TypeError("ชื่อผู้ใช้ต้องเป็นข้อความที่ไม่ว่าง");
		}
		if (!Number.isInteger(age) || age < 0) {
			throw new RangeError("อายุต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป");
		}

		this.name = name.trim(); // Property สำหรับเก็บชื่อของผู้ใช้
		this.age = age; // Property สำหรับเก็บอายุของผู้ใช้
		this.email = ""; // Property สำหรับเก็บอีเมล เริ่มต้นเป็นค่าว่าง

		// ถ้าส่งอีเมลมาตอนสร้าง ให้ผ่าน setEmail() เพื่อตรวจรูปแบบที่เดียวกัน
		if (email !== "") {
			this.setEmail(email);
		}

		// เรียก static field ผ่านชื่อคลาส (Users.count) ไม่ใช่ this.count
		Users.count++;
		this.id = Users.count; // รหัสผู้ใช้ตามลำดับที่ถูกสร้าง
	}

	// Method: คืนข้อความข้อมูลผู้ใช้ (คืนค่า ไม่ได้พิมพ์ จึงนำไปใช้หรือทดสอบต่อได้)
	getInfo() {
		return `#${this.id} ชื่อ: ${this.name}, อายุ: ${this.age}, อีเมล: ${this.email || "-"}, บทบาท: ${this.role}`;
	}

	// Method: พิมพ์ข้อมูลผู้ใช้ออกทางหน้าจอ (เรียกใช้ getInfo() ซ้ำ ไม่เขียนข้อความซ้ำ)
	showInfo() {
		console.log(this.getInfo());
	}

	// Method สำหรับกำหนดอีเมลให้ผู้ใช้ โดยรับอีเมลผ่านพารามิเตอร์ และตรวจรูปแบบก่อน
	// return this ทำให้เรียกต่อกันได้ เช่น user.setEmail("...").setRole("admin")
	setEmail(email) {
		if (!Users.isValidEmail(email)) {
			throw new Error(`รูปแบบอีเมลไม่ถูกต้อง: ${email}`);
		}
		this.email = email;
		return this;
	}

	setRole(role) {
		this.role = role;
		return this;
	}

	// เพิ่มอายุ 1 ปี และคืน this เพื่อ chaining
	birthday() {
		this.age++;
		return this;
	}

	// Getter: เรียกใช้แบบ property (user.isAdult) ไม่ต้องใส่วงเล็บ
	// ค่าคำนวณใหม่ทุกครั้งจาก age จึงถูกต้องเสมอแม้ age เปลี่ยน
	get isAdult() {
		return this.age >= 18;
	}

	// toJSON(): JSON.stringify(user) จะเรียกเมธอดนี้อัตโนมัติ
	toJSON() {
		return {
			id: this.id,
			name: this.name,
			age: this.age,
			email: this.email,
			role: this.role,
		};
	}

	// Static method: ฟังก์ชันช่วยที่เกี่ยวกับคลาส แต่ไม่ต้องใช้ข้อมูลของ instance ใด
	static isValidEmail(email) {
		return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	// Static factory method: อีกวิธีในการสร้าง instance จากข้อมูลรูปแบบ object
	static fromObject({ name, age, email = "" }) {
		return new Users(name, age, email);
	}
}

// ส่งออกคลาสให้ไฟล์อื่น require ไปใช้ได้ (ใช้ร่วมกัน)
module.exports = { Users };

// require.main === module เป็นจริงเฉพาะตอนรัน "node Class.js" ตรง ๆ
// ถ้าไฟล์อื่น require ไฟล์นี้ ส่วนตัวอย่างด้านล่างจะไม่ทำงาน (ใช้แยกได้ / ร่วมกันได้)
if (require.main === module) {
	console.log("===== 1) สร้าง object และเรียก method =====");
	const user1 = new Users("ลูมี่", 27);
	user1.setEmail("lumee@example.com"); // เรียก method เพื่อกำหนดค่าให้ property email
	user1.showInfo(); // #1 ชื่อ: ลูมี่, อายุ: 27, อีเมล: lumee@example.com, บทบาท: member

	console.log("\n===== 2) Method chaining =====");
	const user2 = new Users("ต้นข้าว", 17).setEmail("tonkhao@example.com").setRole("guest");
	user2.showInfo(); // #2 ... อายุ: 17 ... บทบาท: guest
	console.log("เป็นผู้ใหญ่หรือยัง:", user2.isAdult); // false (getter)
	user2.birthday();
	console.log("หลังวันเกิด อายุ:", user2.age, "เป็นผู้ใหญ่:", user2.isAdult); // 18 true

	console.log("\n===== 3) Static field / static method =====");
	console.log("จำนวนผู้ใช้ทั้งหมด:", Users.count); // 2
	console.log(Users.isValidEmail("abc")); // false
	console.log(user1.count); // undefined เพราะ static เป็นของคลาส ไม่ใช่ของ instance

	console.log("\n===== 4) Static factory method =====");
	const user3 = Users.fromObject({ name: "มายด์", age: 30, email: "mind@example.com" });
	user3.showInfo(); // #3 ชื่อ: มายด์ ...

	console.log("\n===== 5) ใช้ object จากคลาสร่วมกับ array method =====");
	const allUsers = [user1, user2, user3];
	const adultNames = allUsers.filter((user) => user.isAdult).map((user) => user.name);
	console.log("ผู้ใหญ่:", adultNames); // [ 'ลูมี่', 'ต้นข้าว', 'มายด์' ]
	const averageAge = allUsers.reduce((sum, user) => sum + user.age, 0) / allUsers.length;
	console.log("อายุเฉลี่ย:", averageAge.toFixed(2)); // 25.00

	console.log("\n===== 6) จัดการข้อผิดพลาด (validation) =====");
	try {
		user1.setEmail("ไม่ใช่อีเมล");
	} catch (error) {
		console.log("Error:", error.message); // รูปแบบอีเมลไม่ถูกต้อง: ไม่ใช่อีเมล
	}
	try {
		new Users("", 20);
	} catch (error) {
		console.log(`${error.name}:`, error.message); // TypeError: ชื่อผู้ใช้ต้องเป็นข้อความที่ไม่ว่าง
	}

	console.log("\n===== 7) แปลงเป็น JSON =====");
	console.log(JSON.stringify(user1)); // {"id":1,"name":"ลูมี่","age":27,...}

	console.log("\n===== 8) ข้อเท็จจริงของคลาส =====");
	console.log(typeof Users); // "function" คลาสใน JS คือฟังก์ชันชนิดพิเศษ
	console.log(user1 instanceof Users); // true
	// แต่ละ instance มีข้อมูลของตัวเอง แต่ใช้ method ตัวเดียวกันผ่าน prototype
	console.log(user1.name === user2.name); // false
	console.log(user1.showInfo === user2.showInfo); // true
}

/*
 * สรุป:
 * - คลาสต้องประกาศก่อนใช้ (ไม่ถูก hoist แบบฟังก์ชันปกติ)
 * - ต้องสร้างด้วย new เสมอ ถ้าเรียก Users() เฉย ๆ จะเกิด TypeError
 * - method ที่คืนค่า (getInfo) นำไปทดสอบได้ง่ายกว่า method ที่พิมพ์อย่างเดียว (showInfo)
 * - ตรวจข้อมูลใน constructor/method เพื่อไม่ให้ออบเจ็กต์อยู่ในสถานะผิดตั้งแต่แรก
 */
