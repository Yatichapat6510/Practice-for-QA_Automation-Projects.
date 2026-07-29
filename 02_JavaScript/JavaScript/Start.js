// // //ทดสอบการแสดงผลใน console

// let name = "Newyear";
// let birthDate = "January 1, 1999";
// let age = 27;


// console.log(name);
// console.log(birthDate);
// console.log(age);


// // //ทดสอบการใช้ตัวดำเนินการทางคณิตศาสตร์และเปรียบเทียบ

// console.log('ผลบวก = ',25+10);
// console.log('ผลลบ = ',25-10);
// console.log('ผลคูณ = ',25*10);
// console.log('ผลหาร = ',25/10);
// console.log('ผลเศษ = ',25%10);
// console.log('ผลยกกำลัง = ',25**10);


// // //ทดสอบการใช้ตัวดำเนินการเปรียบเทียบ

// let x = 10;
// let y = 5;

// console.log('x == y : ', x == y );
// console.log('x != y : ', x != y );
// console.log('x > y : ', x > y );
// console.log('x < y : ', x < y );
// console.log('x >= y : ', x >= y );
// console.log('x <= y : ', x <= y );


// // //ทดสอบการใช้ตัวดำเนินการตรรกะ

// let a = true;
// let b = false;   

// console.log('a && b : ', a && b );
// console.log('a || b : ', a || b );
// console.log('!a : ', !a );
// console.log('!b : ', !b );      

// //ทดสอบการใช้คำสั่งเงื่อนไข

// let score = 99;

// if(score >= 90){
//     console.log('ได้เกรด A');
// }else if(score >= 80){
//     console.log('ได้เกรด B');
// }else if(score >= 70){
//     console.log('ได้เกรด C');
// }   else if(score >= 60){
//     console.log('ได้เกรด D');
// }else{
//     console.log('ได้เกรด F');
// }

// //ทดสอบการใช้ตัวดำเนินการตรรกะในการเปรียบเทียบ

// console.log(score >= 90 && score <= 100, 'ได้เกรด A');
// console.log(score >= 70 && score <= 80, 'ได้เกรด B');
// console.log(score >= 50 && score <= 60, 'ได้เกรด C');
// console.log(!(score >= 60), 'ไม่ใช่เกรด D');

// console.log(score >= 90 || score <= 100, 'ได้เกรด A');
// console.log(score >= 70 || score <= 80, 'ได้เกรด B');
// console.log(score >= 50 || score <= 60, 'ได้เกรด C');      


// //ทดสอบการใช้คำสั่ง Prefix และ Postfix

// let a = 5 , b = 6;

// // เพิ่มค่าแบบ Prefix
// console.log('ค่าเริ่มต้น = ', a);
// console.log('แบบ Prefix = ', ++a);
// console.log('ค่าปัจจุบัน = ', a);

// // เพิ่มค่าแบบ Postfix
// console.log('ค่าเริ่มต้น = ', b);
// console.log('แบบ Postfix = ', b++);
// console.log('ค่าปัจจุบัน = ', b);

// let a = 11 , b = 22;

// // ลดค่าแบบ Prefix
// console.log('ค่าเริ่มต้น = ', a);
// console.log('แบบ Prefix = ', --a);
// console.log('ค่าปัจจุบัน = ', a);   

// // ลดค่าแบบ Postfix
// console.log('ค่าเริ่มต้น = ', b);
// console.log('แบบ Postfix = ', b--);
// console.log('ค่าปัจจุบัน = ', b);


// //compound assignment operator

// let x= 50, y = 60;

// console.log('ก่อน = ', x);
// x=x+y; //x = x+y
// x+=y; //x = x+y
// x-=y; //x = x-y
// x*=y; //x = x*y
// x/=y; //x = x/y
// x%=y; //x = x%y
// x**=y; //x = x**y
// console.log('หลัง = ', x);

// //สร้างฟังก์ชันที่มีการรับค่าเข้ามาทำงานและแสดงผลลัพธ์

// function a(){
//     console.log('Hello World');
// }
// function message(){
//     alert('แจ้งเตือนเงินเข้าบัญชีแล้ว');
// }
// function displayName(name){
//     document.write('Yatichapat');
// }

// function plusNumbers(num1){
//     console.log('เลขที่ส่งมา คือ = ', num1);
// }
 
// plusNumbers(10);
// plusNumbers(100);

// let number = 333;
// plusNumbers(number);

// function fullName(firstName, lastName, City){
//     console.log('ชื่อจริง คือ = ', firstName, 'นามสกุล =  ', lastName, 'เมือง = ', City);
// }

// fullName('Yatichapat', 'Kanta', 'กรุงเทพฯ');
// fullName('ญาทิชาพัฒน์', 'กันทา', 'เชียงใหม่'); 
// fullName('Newyear', '', '');  

// function summation(x,y){
//     let total = x + y;
//     console.log('ผลรวมของ ', x, '+', y, ' = ', total);
// }

// summation(10,20);
// summation(100,200);


// //Array Properties and Functions

// let fruits = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];
// console.log('จำนวนผลไม้ในอาร์เรย์ = ', fruits.length);
// console.log('ผลไม้ตัวแรก = ', fruits[0]);
// console.log('ผลไม้ตัวสุดท้าย = ', fruits[fruits.length - 1]);  

// let colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
// let count = colors.length; //การนับจำนวนสีในอาร์เรย์
// let result = colors.sort(); //การเรียงลำดับสีในอาร์เรย์
// colors.push('Orange'); //การเพิ่มสีใหม่เข้าไปในอาร์เรย์
// console.log('จำนวนสีในอาร์เรย์ = ', count);
// console.log('สีที่เรียงลำดับแล้ว = ', result);
// console.log('สีทั้งหมดในอาร์เรย์ = ', colors);

// let numbers = [5, 2, 9, 1, 5, 6, 10, 3, 4, 8, 7];
// let sortedNumbers = numbers.sort(function(a, b){
//     return a - b; //เรียงจากน้อยไปมาก
// });
// console.log('ตัวเลขที่เรียงลำดับแล้ว = ', sortedNumbers);


// //การเข้าถึงสมาชิกด้วย For Loop

// let animals = ['Dog', 'Cat', 'Elephant', 'Giraffe', 'Lion'];
// for(let i = 0; i < animals.length; i++){
//     console.log('สัตว์ตัวที่ ', i+1, ' = ', animals[i]);
// }


// //การเข้าถึงสมาชิกด้วย For Each

// let cars = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes'];
// cars.push('Audi'); //เพิ่มรถใหม่เข้าไปในอาร์เรย์
// cars.push('Tesla'); //เพิ่มรถใหม่เข้าไปในอาร์เรย์
// cars.push('BYD'); //เพิ่มรถใหม่เข้าไปในอาร์เรย์
// cars.forEach(function(car, index){
//     console.log('รถยนต์คันที่ ', index+1, ' = ', car);
// }); 


// //การแปลง Array เป็น String

// let languages = ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'];    
// let languagesString = languages.join(' | '); //แปลงอาร์เรย์เป็นสตริงโดยใช้เครื่องหมายและช่องว่างเป็นตัวคั่น
// console.log('ภาษาการเขียนโปรแกรมที่ชอบ = ', languagesString);

// let Technologies = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'];
// let TLG = Technologies.toString(); //แปลงอาร์เรย์เป็นสตริงโดยใช้เครื่องหมายคอมมาเป็นตัวคั่น
// console.log('เทคโนโลยีที่ใช้ในการพัฒนาเว็บ = ', TLG);

// let Phones = ['iPhone', 'Samsung', 'Huawei', 'Xiaomi', 'OnePlus'];
// Phones.pop(); //ลบสมาชิกตัวสุดท้ายออกจากอาร์เรย์
// console.log(Phones);


// //การรวม Array ด้วย Concat

// let Vegetables = ['Carrot', 'Broccoli', 'Spinach'];
// let Fruits = ['Apple', 'Banana', 'Cherry'];
// let Drinks = ['Water', 'Juice', 'Soda'];
// let Food = Vegetables.concat(Fruits, Drinks); //รวมอาร์เรย์ผัก ผลไม้ และเครื่องดื่มเข้าด้วยกัน 
// console.log('อาหาร Healthy = ', Food);


// //เรียงลำดับ Array แบบตัวเลข (น้อยไปมาก, มากไปน้อย)

// let points = [40, 100, 1, 5, 25, 10, 50, 60, 70, 80, 90];
// points.sort(function(a, b){
//     return a - b; //เรียงจากน้อยไปมาก
// }); 

// console.log('คะแนนที่เรียงลำดับแล้ว (น้อยไปมาก) = ', points);

// points.sort(function(a, b){
//     return b - a; //เรียงจากมากไปน้อย
// });
// console.log('คะแนนที่เรียงลำดับแล้ว (มากไปน้อย) = ', points);  


// // JavaScript Objects

// let person = {
//     firstName: 'Yatichapat',
//     lastName: 'Kanta',
//     age: 27,
//     email: 'yatichapat.forwork@gmail.com'
// };


// //การเขียนแบบที่ หนึ่ง

// console.log('ชื่อจริง = ', person.firstName);
// console.log('นามสกุล = ', person.lastName);
// console.log('อายุ = ', person.age);
// console.log('อีเมล = ', person.email);

// let ITProduct = {
//     name: 'Laptop',
//     brand: 'Acer',
//     price: 25000,
//     warranty: '2 years'
// };


// //การเขียนแบบที่ สอง

// console.log('ชื่อสินค้า = ', ITProduct['name']);
// console.log('ยี่ห้อ = ', ITProduct['brand']);
// console.log('ราคา = ', ITProduct['price']);
// console.log('การรับประกัน = ', ITProduct['warranty']);    


// //Methods in Objects

// let User = {
//     firstName: 'Yatichapat',
//     lastName: 'Kanta',
//     age: 27,
//     email: 'yatichapat.forwork@gmail.com',
//     getFullName: function() {
//         return this.firstName + ' ' + this.lastName + ' อายุ ' + this.age + ' ปี' + ' อีเมล ' + this.email;
//     }
// };
// console.log('ชื่อเต็มของผู้ใช้ = ', User.getFullName());
// //เรียกใช้เมธอด getFullName() เพื่อแสดงชื่อเต็มของผู้ใช้พร้อมกับข้อมูลอื่นๆ ในอ็อบเจ็กต์ User


// let ITProduct = {
//     name: 'MacBook Pro',
//     brand: 'Apple',
//     price: 30500,
//     warranty: '2 years',
//     color: 'Silver',

//     displayInfo: function() {
//         return 'ชื่อสินค้า: ' + this.name + '\n' +
//                'ยี่ห้อ: ' + this.brand + '\n' +
//                'ราคา: ' + this.price + ' บาท\n' +
//                'การรับประกัน: ' + this.warranty + '\n' +
//                'สี: ' + this.color;
//     },

//     discountedPrice: function(discount) {
//         let discountAmount = this.price * (discount / 100);
//         let finalPrice = this.price - discountAmount;
//         return 'ราคาสินค้าหลังหักส่วนลด ' + discount + '% คือ ' + finalPrice + ' บาท';
//     }
// };

// console.log(ITProduct.displayInfo());
// console.log(ITProduct.discountedPrice(10)); //แสดงราคาสินค้าหลังหักส่วนลด 10%


// //การยืนยันด้วย confirm

// function deleteData(){
//    let result = confirm("คุณต้องการลบข้อมูลหรือไม่?");
//    if(result){
//     console.log('ข้อมูลถูกลบแล้ว');
//    } else{
//     console.log('ยกเลิกการลบข้อมูล');
//    }
// }



// //การเข้าถึง HTML Elements ผ่าน id. Tag, Class ด้วย JavaScript


// function displayText(){

//     // document.getElementById() เข้าถึง Element ด้วย id

//     const a = document.getElementById('demo');

//     a.innerText = 'เรียน JavaScript';


//     // แสดงผลแบบ HTML

//     a.innerHTML = "<strong>เรียน JavaScript</strong>";


//     // document.getElementsByTagName() เข้าถึงด้วย Tag เช่น p

//     const b = document.getElementsByTagName('p');

//     b[1].innerText = 'ยินดีต้อนรับสู่การเรียนรู้ JavaScript';

//     b[2].innerText = 'JavaScript เป็นภาษาที่ใช้ในการพัฒนาเว็บ';


//     // document.getElementsByClassName() เข้าถึงด้วย Class

//     const c = document.getElementsByClassName('myClass');


//     c[0].innerText =
//     'นี่คือข้อความจากคลาส myClass';


//     c[1].innerText =
//     'คุณสามารถใช้ JavaScript เพื่อเปลี่ยนแปลงเนื้อหาได้';

// }



// DOM Document

function displayText() {
    // อ้างอิงผ่าน id
    const titleEL = document.getElementById('title');

    // อ้างอิงผ่าน class (จะเลือกโดน "ข้อความ Class 1" ซึ่งเป็นตัวแรกสุด)
    const contentEL = document.querySelector('.content');

    // อ้างอิงผ่าน tag (เลือกทุกแท็ก <p> ทั้งหมด 5 ตัว)
    const allEL = document.querySelectorAll('p');

    // เปลี่ยน Style ของ id="title"
    if (titleEL) {
        titleEL.style.color = 'blue';
        titleEL.style.fontSize = '24px';
        titleEL.style.backgroundColor = 'lightgray';
    }

    // เปลี่ยนข้อความ class ตัวแรก ("ข้อความ Class 1" จะเปลี่ยนเป็นข้อความนี้)
    if (contentEL) {
        contentEL.innerText = "ข้อความจาก JavaScript";
    }

    // เปลี่ยนให้ทุก <p> มีเส้นขอบสีดำ
    allEL.forEach((element) => {
        element.style.border = "1px solid black";
        element.style.padding = "8px"; // เพิ่ม padding นิดหน่อยให้ดูสวยงามขึ้น
    });
}