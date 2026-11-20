// =====================================================
// Factorial Time : O(n!)
// ตัวอย่าง: คำนวณแฟกทอเรียลด้วย Recursion ตามที่สอนในคลิป
//
// ข้อควรรู้: ตัวฟังก์ชัน factorial ด้านล่างเรียกตัวเองครั้งละ 1 ครั้ง
// จึงทำงานประมาณ n ครั้ง (เวลาจริงของฟังก์ชันนี้เป็น O(n))
// ส่วนคลาส O(n!) หมายถึงงานที่จำนวนขั้นตอนโตตาม n! เช่น
// การไล่สร้างการเรียงสับเปลี่ยน (Permutation) ทุกแบบ ดูตัวอย่างท้ายไฟล์
// =====================================================

function factorial(n) {
  if (n <= 1) {
    return 1; // Base case (ใช้ <= 1 เพื่อกัน n = 0 วนไม่รู้จบ)
  }
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120  (5 x 4 x 3 x 2 x 1)

// ตัวอย่างเสริม: Permutation ของ n ตัว มี n! แบบ จึงเป็น O(n!)
function permutations(items) {
  if (items.length <= 1) return [items];
  const result = [];
  for (let i = 0; i < items.length; i++) {
    const rest = [...items.slice(0, i), ...items.slice(i + 1)];
    for (const p of permutations(rest)) {
      result.push([items[i], ...p]);
    }
  }
  return result;
}

console.log(permutations([1, 2, 3]).length); // 6 (= 3!)
