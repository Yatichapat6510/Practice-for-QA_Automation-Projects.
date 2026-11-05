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

// ---------------------------------------------------------//
// ทำกับสมาชิก Array
// join , concat , slice , splice , indexOf , includes

const joinedFruits = fruits.join(' - ');
console.log('Array ที่ถูก join:', joinedFruits);

const moreFruits = ['grape', 'kiwi'];
const allFruits = fruits.concat(moreFruits);
console.log('Array ที่ถูก concat:', allFruits);

const slicedFruits = fruits.slice(1, 3);
console.log('Array ที่ถูก slice:', slicedFruits);

const removedFruits = fruits.splice(1, 2);
console.log('Array ที่ถูก splice:', fruits);
console.log('สมาชิกที่ถูกลบ:', removedFruits);

const indexOfBanana = fruits.indexOf('banana');
console.log('ดัชนีของ "banana":', indexOfBanana);

const hasCherry = fruits.includes('cherry');
console.log('Array มี "cherry" หรือไม่:', hasCherry);


// ---------------------------------------------------------//
// push , pop , shift , unshift

fruits.push('elderberry');
console.log('เพิ่มสมาชิกด้วย push:', fruits);

const poppedFruit = fruits.pop();
console.log('ลบสมาชิกด้วย pop:', fruits);
console.log('สมาชิกที่ถูกลบ:', poppedFruit);

const shiftedFruit = fruits.shift();
console.log('ลบสมาชิกด้วย shift:', fruits);
console.log('สมาชิกที่ถูกลบ:', shiftedFruit);

fruits.unshift('fig');
console.log('เพิ่มสมาชิกด้วย unshift:', fruits);
