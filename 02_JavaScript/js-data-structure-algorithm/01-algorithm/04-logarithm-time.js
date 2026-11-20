// =====================================================
// Logarithm Time : O(log n)
// ตัวอย่าง: Binary Search (ใช้กับอาร์เรย์ที่เรียงลำดับแล้วเท่านั้น)
// แต่ละรอบตัดข้อมูลทิ้งครึ่งหนึ่ง
// =====================================================

function binarySearch(array, value) {
  let firstIndex = 0; // ขอบซ้ายของช่วงที่ค้นหา
  let lastIndex = array.length - 1; // ขอบขวาของช่วงที่ค้นหา

  while (firstIndex <= lastIndex) {
    // หาตำแหน่งตรงกลางของช่วงปัจจุบัน
    const middleIndex = Math.floor((firstIndex + lastIndex) / 2);

    // เจอค่าที่ต้องการ -> คืนตำแหน่ง
    if (array[middleIndex] === value) {
      return middleIndex;
    }

    if (array[middleIndex] > value) {
      lastIndex = middleIndex - 1; // ค่าที่หาอยู่ฝั่งซ้าย ตัดฝั่งขวาทิ้ง
    } else {
      firstIndex = middleIndex + 1; // ค่าที่หาอยู่ฝั่งขวา ตัดฝั่งซ้ายทิ้ง
    }
  }
  return -1; // หาไม่เจอ
}

const score = [1, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
console.log(binarySearch(score, 37)); // 11 (ตำแหน่งของเลข 37)
console.log(binarySearch(score, 100)); // -1 (ไม่พบ)
