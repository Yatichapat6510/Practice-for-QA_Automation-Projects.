// การ Loop Array
// For Loop , ForEach , ForOf , ForIn

const data = [10, 20, 30, 40, 50];

// For Loop: ใช้กับการวนลูปแบบดั้งเดิม โดยกำหนดตัวนับและเงื่อนไข
function loopWithFor() {
    console.log('For Loop');
    for (let i = 0; i < data.length; i++) {
        console.log(`Index ${i} = ${data[i]}`);
    }
}

// ForEach: ใช้เรียก callback สำหรับแต่ละสมาชิกในอาร์เรย์
function loopWithForEach() {
    console.log('ForEach');
    data.forEach((value, index) => {
        console.log(`Index ${index} = ${value}`);
    });
}

// ForOf: ใช้วนลูปผ่านค่าของอาร์เรย์ โดยไม่ต้องใช้ดัชนี
function loopWithForOf() {
    console.log('ForOf');
    for (const value of data) {
        console.log(`Value from ForOf = ${value}`);
    }
}

// ForIn: ใช้วนลูปผ่านคีย์ (ดัชนี) ของออบเจ็กต์หรืออาร์เรย์
function loopWithForIn() {
    console.log('ForIn');
    for (const index in data) {
        console.log(`Value from ForIn = ${data[index]}`);
    }
}

loopWithFor();
loopWithForEach();
loopWithForOf();
loopWithForIn();



