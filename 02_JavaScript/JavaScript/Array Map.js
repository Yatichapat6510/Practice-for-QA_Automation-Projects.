// กำหนดอาร์เรย์ของตัวเลข
const numbers = [10, 20, 30, 40, 50];

// ใช้เมทอด map เพื่อแปลงแต่ละค่าของอาร์เรย์
const squares = numbers.map((value) => value * value); // value คือค่าที่ได้จากแต่ละตำแหน่งใน numbers
// ผลลัพธ์คืออาร์เรย์ใหม่ที่ประกอบด้วยค่ากำลังสอง

// แสดงอาร์เรย์ต้นฉบับและอาร์เรย์ที่แปลงแล้ว
console.log("Original array:", numbers);
console.log("Mapped array (squares):", squares);

// กำหนดอาร์เรย์ของวัตถุ people แต่ละวัตถุมี name และ age
const people = [
  { name: "Alice", age: 28 },
  { name: "Bob", age: 34 },
  { name: "Charlie", age: 22 }
];

// ใช้ map เพื่อดึงค่าชื่อ name จากแต่ละวัตถุ
const names = people.map((person) => person.name); // person คือวัตถุแต่ละตัวในอาร์เรย์ people
const ages = people.map((person) => person.age); // person คือวัตถุแต่ละตัวในอาร์เรย์ people

// แสดงอาร์เรย์ของชื่อและอายุที่ได้จาก map
console.log("Names:", names);
console.log("Ages:", ages);


const weatherData = ["sunny", "rainy", "cloudy", "stormy"];
// ฟังก์ชัน callback ใน map จะรับค่า condition แต่ละค่า แล้วส่งกลับข้อความอธิบายสภาพอากาศที่ตรงกัน
const weatherDescriptions = weatherData.map((condition) => {
  // map จะวนผ่านค่า condition แต่ละตัวแล้วคืนค่าข้อความคำอธิบายที่สอดคล้อง
  switch (condition) {
    case "sunny":
      return "It's sunny today!";
    case "rainy":
      return "It's rainy today!";
    case "cloudy":
      return "It's cloudy today!";
    case "stormy":
      return "It's stormy today!";
    default:
      return "Weather condition unknown.";
  }
});
console.log("Weather Descriptions:", weatherDescriptions);

const weatherEvents = [
  { day: 15, condition: "rainy" },
  { day: 16, condition: "sunny" }
];
// อาร์เรย์ของเหตุการณ์อากาศที่ประกอบด้วยวันและสภาพอากาศแต่ละวัน

const weatherAlerts = weatherEvents.map((event) => {
  // map แปลงวัตถุ event ให้เป็นข้อความแจ้งเตือนตามเงื่อนไข
  if (event.condition === "rainy") return `วันที่ ${event.day} ฝนตก`;
  if (event.condition === "sunny") return `วันที่ ${event.day} แดดออก`;
  return `วันที่ ${event.day} สภาพอากาศไม่ทราบ`;
});

console.log("Weather Alerts:", weatherAlerts);
