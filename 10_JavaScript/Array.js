// ฝึกเขียน Array

const fruits = ['apple', 'banana', 'cherry'];
console.log('Array ทั้งหมด:', fruits);
console.log('สมาชิกตัวแรก:', fruits[0]);
console.log('จำนวนสมาชิก:', fruits.length);

fruits.push('date');
console.log('เพิ่มสมาชิก:', fruits);

for (let i = 0; i < fruits.length; i++) {
  console.log(`ดัชนี ${i}: ${fruits[i]}`);
}

const upperFruits = fruits.map(item => item.toUpperCase());
console.log('Array แปลงเป็นตัวพิมพ์ใหญ่:', upperFruits);

