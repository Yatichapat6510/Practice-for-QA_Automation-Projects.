// ตัวอย่างการใช้ Array.filter ใน JavaScript
// filter จะสร้างอาเรย์ใหม่จากสมาชิกที่ผ่านเงื่อนไข

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const people = [
  { name: 'Aom', age: 18 },
  { name: 'Bee', age: 14 },
  { name: 'Chai', age: 22 },
  { name: 'Dana', age: 16 }
];

// ฟังก์ชันที่ใช้ร่วมกันสำหรับ filter
// รับพารามิเตอร์ item แล้วคืนค่า true/false
function isEven(number) {
  // คืนค่า true ก็ต่อเมื่อ number หารด้วย 2 ลงตัว
  return number % 2 === 0;
}

function isAdult(person) {
  // คืนค่า true ก็ต่อเมื่ออายุ 18 ปีขึ้นไป
  return person.age >= 18;
}

// ใช้ filter เพื่อคัดเฉพาะเลขคู่
const evenNumbers = numbers.filter(isEven);
// ใช้ filter เพื่อคัดเฉพาะคนที่เป็นผู้ใหญ่
const adults = people.filter(isAdult);
// ใช้ filter เพื่อคัดเฉพาะคนที่อายุต่ำกว่า 18 ปี
const minors = people.filter(person => person.age < 18);

console.log('minors:', minors); // [{ name: 'Bee', age: 14 }, { name: 'Dana', age: 16 }]
console.log('adults:', adults); // [{ name: 'Aom', age: 18 }, { name: 'Chai', age: 22 }]
console.log('evenNumbers:', evenNumbers); // [2, 4, 6, 8, 10]
console.log('numbers:', numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

