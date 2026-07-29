// js ทำงานกับ Object

// ตัวแปรเก็บข้อมูล
const customerName = "Yatichapat Kanta";
const age = 27;
const address = "Chiang Mai";

const customer = {
    customerName,
    age,
    address,
    showInfo: function () {
        console.log("ชื่อลูกค้า = " + this.customerName);
        console.log("อายุ = " + this.age);
        console.log("ที่อยู่ = " + this.address);
    }
};

customer.showInfo();


