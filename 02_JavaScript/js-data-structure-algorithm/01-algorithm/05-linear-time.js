// =====================================================
// Linear Time : O(n)
// ตัวอย่าง: Linear Search ไล่ดูทีละตัว
// ข้อมูลเพิ่มขึ้นกี่เท่า เวลาก็เพิ่มตามกี่เท่า
// =====================================================

function search(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i; // เจอแล้วคืนตำแหน่ง
    }
  }
  return -1; // วนครบแล้วไม่เจอ (กรณีแย่สุดต้องดูครบ n ตัว)
}

const score = [12, 22, 45, 67, 96];
console.log(search(score, 45)); // 2
console.log(search(score, 100)); // -1
