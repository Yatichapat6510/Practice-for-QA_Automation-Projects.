// =====================================================
// ตัวอย่างเสริม: การนับตัวดำเนินการ และการลดรูปเป็น Big-O
// (เขียนเพิ่มเพื่อทบทวนบท "การนับตัวดำเนินการ" และ "การเขียนลดรูปฟังก์ชั่น"
//  ไม่ได้อยู่ใน repo โค้ดต้นฉบับของคลิป)
// =====================================================

// แบบลูป : นับว่าแต่ละบรรทัดทำงานกี่ครั้ง
function summationLoopCount(n) {
  let ops = 0;

  let total = 0;
  ops++; // total = 0           -> 1 ครั้ง
  let i = 1;
  ops++; // i = 1               -> 1 ครั้ง
  while (true) {
    ops++; // i <= n            -> n + 1 ครั้ง (รวมรอบที่เงื่อนไขเป็นเท็จ)
    if (!(i <= n)) break;
    total += i;
    ops++; // total += i        -> n ครั้ง
    i++;
    ops++; // i++               -> n ครั้ง
  }
  ops++; // return total       -> 1 ครั้ง

  return { total, ops };
}

// แบบสูตร : จำนวนครั้งคงที่ ไม่ขึ้นกับ n
function summationFormulaCount(n) {
  let ops = 0;
  const total = (n * (n + 1)) / 2;
  ops += 3; // คูณ 1, บวก 1, หาร 1
  ops++; // return
  return { total, ops };
}

for (const n of [10, 100, 1000]) {
  const loop = summationLoopCount(n);
  const formula = summationFormulaCount(n);
  console.log(
    `n=${n}  loop: ${loop.ops} ops (3n+4 = ${3 * n + 4})  |  formula: ${formula.ops} ops`
  );
}

// ลดรูป: T(n) = 3n + 4
//   1) ตัดค่าคงที่ที่ไม่โตตาม n      -> 3n
//   2) ตัดสัมประสิทธิ์หน้า n          -> n
//   สรุป O(n)
// ส่วนแบบสูตร T(n) = 4 (ค่าคงที่)     -> O(1)
