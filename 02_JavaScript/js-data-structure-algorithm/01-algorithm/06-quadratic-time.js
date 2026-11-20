// =====================================================
// Quadratic Time : O(n^2)
// ตัวอย่าง: หาค่าซ้ำในอาร์เรย์ด้วยลูปซ้อนลูป
// =====================================================

function matchElement(array) {
  for (let i = 0; i < array.length; i++) {
    // ลูปนอก n รอบ
    for (let j = 0; j < array.length; j++) {
      // ลูปใน n รอบ รวมเป็น n x n
      if (i !== j && array[i] === array[j]) {
        return `ตำแหน่งซ้ำกัน คือ ${i} และ ${j}`;
      }
    }
  }
  return "ไม่มีค่าซ้ำกันเลย";
}

const fruit = ["ส้ม", "มะละกอ", "มังคุด", "ทุเรียน", "ส้ม", "แตงกวา"];
console.log(matchElement(fruit)); // ตำแหน่งซ้ำกัน คือ 0 และ 4
console.log(matchElement(["ส้ม", "องุ่น"])); // ไม่มีค่าซ้ำกันเลย
