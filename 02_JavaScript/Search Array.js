// ค้นหาข้อมูลใน Array
// indexof => ผลการค้นหาจะได้ตำแหน่งของค่าที่อยู่ใน Array (เริ่มนับจาก 0)
// includes => ตรวจสอบว่า Array มีค่าที่กำหนดหรือไม่ คืนค่า true หรือ false
// find => ค้นหาและคืนค่าค่าแรกที่ตรงตามเงื่อนไข
// findIndex => ค้นหาและคืนดัชนีของค่าแรกที่ตรงตามเงื่อนไข
// filter => กรองค่าใน Array ตามเงื่อนไขและคืน Array ใหม่

const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// indexof
const indexOfBlue = colors.indexOf('blue'); // 2
console.log('indexOfBlue:', indexOfBlue);

// includes
const hasGreen = colors.includes('green'); // true
console.log('hasGreen:', hasGreen);
const hasPurple = colors.includes('purple'); // false
console.log('hasPurple:', hasPurple);

// find
const foundColor = colors.find(color => color === 'blue'); // 'blue'
console.log('foundColor:', foundColor);

// findIndex
const foundIndex = colors.findIndex(color => color === 'blue'); // 2
console.log('foundIndex:', foundIndex);

// filter
const filteredColors = colors.filter(color => color.length > 4); // ['green', 'blue', 'yellow']
console.log('filteredColors:', filteredColors);
