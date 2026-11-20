/*
 * Polymorphism (พหุสัณฐาน): เรียกเมธอดชื่อเดียวกัน แต่ได้ผลตามชนิดของออบเจ็กต์
 *
 * ผู้เรียกไม่ต้องรู้ว่าออบเจ็กต์เป็นชนิดไหน แค่รู้ว่ามีเมธอด area() ก็เรียกได้
 * ทำให้เพิ่มรูปทรงใหม่ได้โดยไม่ต้องแก้โค้ดส่วนที่ใช้งาน (เช่น printShapes)
 *
 * รูปแบบ polymorphism ที่มีในไฟล์นี้:
 * 1. Method overriding   คลาสลูกเขียน area()/perimeter() ทับของคลาสแม่
 * 2. เรียกผ่านคลาสแม่    describe() อยู่ใน Shape แต่เรียก this.area() ของคลาสลูก
 * 3. toString()          `${shape}` แสดงผลต่างกันตามชนิด
 * 4. Duck typing         ออบเจ็กต์ธรรมดาที่มี area() ก็ใช้ร่วมได้ แม้ไม่ได้ extends Shape
 * 5. "Overloading"       JS ไม่มี overloading จริง ใช้การตรวจอาร์กิวเมนต์แทน (Square)
 * 6. Factory             createShape() คืนออบเจ็กต์ต่างชนิด แต่ใช้งานแบบเดียวกัน
 *
 * วิธีใช้:
 * - รันไฟล์นี้เดี่ยว ๆ:   node Polymorphism.js
 * - ใช้ร่วมกับไฟล์อื่น:   const { Circle, Rectangle, totalArea } = require("./Polymorphism");
 */

// คลาสแม่กำหนดเมธอดร่วมให้คลาสลูกนำไปเขียนทับ (override)
class Shape {
	constructor(name) {
		this.name = name;
	}

	// ถ้าคลาสลูกลืมเขียน area() จะเกิด error ทันทีที่เรียก (ดู Abstraction.js สำหรับวิธีที่เข้มกว่า)
	area() {
		throw new Error(`${this.constructor.name} ต้องกำหนดเมธอด area() ของตัวเอง`);
	}

	perimeter() {
		throw new Error(`${this.constructor.name} ต้องกำหนดเมธอด perimeter() ของตัวเอง`);
	}

	// เมธอดนี้เขียนครั้งเดียวในคลาสแม่ แต่ผลต่างกันตามคลาสลูก
	// เพราะ this.area() / this.perimeter() จะเรียกเวอร์ชันของออบเจ็กต์จริงเสมอ
	describe() {
		return `${this.name}: พื้นที่ ${this.area().toFixed(2)}, เส้นรอบรูป ${this.perimeter().toFixed(2)}`;
	}

	// override toString() ของ Object: ใช้เมื่อนำออบเจ็กต์ไปต่อกับ string
	toString() {
		return `[${this.name}]`;
	}
}

// ตรวจค่าตัวเลขที่ใช้ร่วมกันทุกรูปทรง
function assertPositive(value, label) {
	if (!Number.isFinite(value) || value <= 0) {
		throw new RangeError(`${label} ต้องเป็นตัวเลขมากกว่า 0`);
	}
}

class Circle extends Shape {
	constructor(radius) {
		super("วงกลม"); // เรียกตัวสร้างของคลาสแม่
		assertPositive(radius, "รัศมี");
		this.radius = radius;
	}

	area() {
		return Math.PI * this.radius ** 2;
	}

	perimeter() {
		return 2 * Math.PI * this.radius;
	}

	toString() {
		return `[วงกลม r=${this.radius}]`;
	}
}

class Rectangle extends Shape {
	constructor(width, height, name = "สี่เหลี่ยมผืนผ้า") {
		super(name);
		assertPositive(width, "ความกว้าง");
		assertPositive(height, "ความสูง");
		this.width = width;
		this.height = height;
	}

	area() {
		return this.width * this.height;
	}

	perimeter() {
		return 2 * (this.width + this.height);
	}

	toString() {
		return `[${this.name} ${this.width}x${this.height}]`;
	}
}

// Square สืบทอดจาก Rectangle จึงได้ area() และ perimeter() มาฟรี ไม่ต้อง override
// และแสดง "overloading" แบบ JavaScript: new Square(4) หรือ new Square({ side: 4 }) ก็ได้
class Square extends Rectangle {
	constructor(sideOrOptions) {
		const side = typeof sideOrOptions === "object" && sideOrOptions !== null ? sideOrOptions.side : sideOrOptions;
		super(side, side, "สี่เหลี่ยมจัตุรัส");
	}
}

class Triangle extends Shape {
	constructor(a, b, c) {
		super("สามเหลี่ยม");
		[a, b, c].forEach((side, index) => assertPositive(side, `ด้านที่ ${index + 1}`));
		// กฎสามเหลี่ยม: ผลรวมสองด้านใด ๆ ต้องยาวกว่าด้านที่เหลือ
		if (a + b <= c || a + c <= b || b + c <= a) {
			throw new RangeError("ความยาวด้านไม่สามารถประกอบเป็นสามเหลี่ยมได้");
		}
		this.a = a;
		this.b = b;
		this.c = c;
	}

	// สูตรเฮรอน (Heron's formula)
	area() {
		const s = this.perimeter() / 2;
		return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
	}

	perimeter() {
		return this.a + this.b + this.c;
	}
}

// ---------- ฟังก์ชันที่ใช้ polymorphism: รับรูปทรงอะไรก็ได้ที่มี area() ----------

// ไม่มี if/switch ตรวจชนิดเลย เพิ่มรูปทรงใหม่ก็ไม่ต้องแก้ฟังก์ชันนี้
function totalArea(shapes) {
	return shapes.reduce((sum, shape) => sum + shape.area(), 0);
}

function largestShape(shapes) {
	return shapes.reduce((largest, shape) => (shape.area() > largest.area() ? shape : largest));
}

function sortByArea(shapes) {
	return [...shapes].sort((first, second) => first.area() - second.area()); // คัดลอกก่อน ไม่แก้ array เดิม
}

// Factory: เลือกคลาสจากชื่อ แล้วคืนออบเจ็กต์ที่ใช้งานแบบเดียวกันได้ทั้งหมด
const shapeRegistry = {
	circle: Circle,
	rectangle: Rectangle,
	square: Square,
	triangle: Triangle,
};

function createShape(type, ...args) {
	const ShapeClass = shapeRegistry[type];
	if (!ShapeClass) {
		throw new Error(`ไม่รู้จักรูปทรง: ${type}`);
	}
	return new ShapeClass(...args);
}

module.exports = {
	Shape,
	Circle,
	Rectangle,
	Square,
	Triangle,
	totalArea,
	largestShape,
	sortByArea,
	createShape,
};

// ตัวอย่างด้านล่างทำงานเฉพาะตอนรัน "node Polymorphism.js" ตรง ๆ
if (require.main === module) {
	console.log("===== 1) เรียก area() เดียวกัน ได้ผลต่างกัน =====");
	// ใช้เมธอดเดียวกันกับออบเจ็กต์หลายชนิด โดยไม่ต้องตรวจชนิดก่อน
	const shapes = [new Circle(3), new Rectangle(4, 5), new Square(4), new Triangle(3, 4, 5)];
	for (const shape of shapes) {
		console.log(shape.area().toFixed(2)); // Circle, Rectangle, Square, Triangle คำนวณต่างกัน
	}

	console.log("\n===== 2) เมธอดในคลาสแม่ เรียกเมธอดของคลาสลูก =====");
	shapes.forEach((shape) => console.log(shape.describe()));
	// วงกลม: พื้นที่ 28.27, เส้นรอบรูป 18.85
	// สี่เหลี่ยมผืนผ้า: พื้นที่ 20.00, เส้นรอบรูป 18.00
	// สี่เหลี่ยมจัตุรัส: พื้นที่ 16.00, เส้นรอบรูป 16.00
	// สามเหลี่ยม: พื้นที่ 6.00, เส้นรอบรูป 12.00

	console.log("\n===== 3) toString() แบบ polymorphism =====");
	console.log(`รายการ: ${shapes.join(", ")}`); // join เรียก toString() ของแต่ละตัว
	// รายการ: [วงกลม r=3], [สี่เหลี่ยมผืนผ้า 4x5], [สี่เหลี่ยมจัตุรัส 4x4], [สามเหลี่ยม]

	console.log("\n===== 4) ฟังก์ชันที่ทำงานกับทุกรูปทรง =====");
	console.log("พื้นที่รวม:", totalArea(shapes).toFixed(2)); // 70.27
	console.log("ใหญ่สุด:", largestShape(shapes).name); // วงกลม
	console.log("เรียงจากเล็กไปใหญ่:", sortByArea(shapes).map((shape) => shape.name));

	console.log("\n===== 5) Duck typing: ไม่ต้อง extends ก็ใช้ร่วมได้ =====");
	// "ถ้ามันเดินเหมือนเป็ด ร้องเหมือนเป็ด ก็ถือว่าเป็นเป็ด"
	const customShape = { name: "รูปทรงพิเศษ", area: () => 10 };
	console.log("พื้นที่รวมเมื่อเพิ่มรูปทรงพิเศษ:", totalArea([...shapes, customShape]).toFixed(2)); // 80.27
	console.log(customShape instanceof Shape); // false แต่ totalArea ก็ยังใช้ได้

	console.log("\n===== 6) \"Overloading\" แบบ JavaScript =====");
	console.log(new Square(5).area()); // 25 ส่งเป็นตัวเลข
	console.log(new Square({ side: 6 }).area()); // 36 ส่งเป็น object

	console.log("\n===== 7) Factory คืนออบเจ็กต์ต่างชนิด =====");
	const fromConfig = [
		["circle", 1],
		["rectangle", 2, 3],
		["triangle", 5, 5, 6],
	].map(([type, ...args]) => createShape(type, ...args));
	fromConfig.forEach((shape) => console.log(shape.describe()));

	console.log("\n===== 8) กรณีผิดพลาด =====");
	const tryRun = (label, action) => {
		try {
			action();
		} catch (error) {
			console.log(`${label} -> ${error.message}`);
		}
	};
	tryRun("Shape ตรง ๆ", () => new Shape("ทั่วไป").area()); // Shape ต้องกำหนดเมธอด area() ของตัวเอง
	tryRun("รัศมีติดลบ", () => new Circle(-1)); // รัศมี ต้องเป็นตัวเลขมากกว่า 0
	tryRun("สามเหลี่ยมผิดกฎ", () => new Triangle(1, 2, 10)); // ความยาวด้านไม่สามารถประกอบเป็นสามเหลี่ยมได้
	tryRun("ชนิดไม่รู้จัก", () => createShape("hexagon", 1)); // ไม่รู้จักรูปทรง: hexagon
}

// ส่วนที่เกี่ยวข้อง: คลาสแม่, คลาสลูก, การสืบทอด (extends),
// การเขียนทับเมธอด (override) และออบเจ็กต์ที่เรียกใช้เมธอดร่วมกัน
// ข้อดี: โค้ดฝั่งผู้ใช้ (totalArea, largestShape) ไม่ต้องแก้เมื่อมีรูปทรงใหม่ (Open/Closed Principle)
