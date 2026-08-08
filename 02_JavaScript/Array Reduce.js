// โครงสร้างพื้นฐานของ Array.reduce
// array.reduce(callbackFn, initialValue)
// callbackFn รับค่า 4 ตัว: accumulator, currentValue, currentIndex, array
// reduce จะวนผ่านสมาชิกในอาร์เรย์ทั้งหมดและสะสมค่าทีละตัวเป็นผลลัพธ์เดียว

const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log('ผลรวม =', sum); // ผลรวม = 10

// ใช้ reduce กับฟังก์ชันปกติเป็น callback เพื่อคำนวณผลคูณ
function multiply(accumulator, currentValue) {
  return accumulator * currentValue;
}

const product = numbers.reduce(multiply, 1);
console.log('ผลคูณ =', product); // ผลคูณ = 24

// ตัวอย่างใช้งาน reduce กับอ็อบเจกต์
// สร้างอ็อบเจกต์ที่จัดกลุ่มชื่อสินค้าโดยใช้ category เป็นกุญแจ
const items = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' }
];

const grouped = items.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item.name);
  return acc;
}, {});

console.log(grouped);
// ผลลัพธ์: { fruit: ['apple', 'banana'], vegetable: ['carrot'] }
