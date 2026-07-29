//Asynchronous คือ การทำงานแบบไม่รอให้คำสั่งก่อนหน้าทำงานเสร็จสิ้นก่อนที่จะทำงานคำสั่งถัดไป

// console.log("เริ่มต้นดาวน์โหลดข้อมูล");
// setTimeout(() => {
//     console.log("กำลังดาวน์โหลดข้อมูล...");
// }, 1000);

// console.log("จบการดาวน์โหลดข้อมูลแล้ว");


//การใช้ Callback

// const url1 = "kong.dev/file1.json"

// function downloading(url, callback) {
//     console.log("กำลังดาวน์โหลดข้อมูลจาก:", `${url}`);
//     setTimeout(() => {
//         const data = `ข้อมูลจาก ${url}`;
//         callback(url);
//     }, 3000);
// }

// downloading(url1, function(result) {
//     console.log("ดาวน์โหลดข้อมูลเสร็จสิ้น:", result);
// });


//การใช้ Promise

// const connect = true; //เชื่อมต่อกับ server ได้
// const url2 = "kong.dev/file2.json";

// function downloadingPromise(url) {
//     return new Promise((resolve, reject) => {
//         console.log("กำลังดาวน์โหลดข้อมูลจาก:", `${url}`);
//         setTimeout(() => {
//             if (connect) {
//                 const data = `ข้อมูลจาก ${url}`;
//                 resolve(data);
//             } else {
//                 reject(new Error("ไม่สามารถเชื่อมต่อกับ server ได้"));
//             }
//         }, 3000);
//     });
// } 

// downloadingPromise(url2)
//     .then((result) => {
//         console.log("ดาวน์โหลดข้อมูลเสร็จสิ้น:", result); 
//     })
//     .catch((error) => {
//         console.error("เกิดข้อผิดพลาด:", error.message);
//     })
//     .finally(() => {
//         console.log("การดาวน์โหลดเสร็จสิ้น");
//     });


// การใช้ Async / Await (Success Case)

const connect = true;

const url1 = "kong.dev/file3.json";
const url2 = "kong.dev/file4.json";
const url3 = "kong.dev/file5.json";
const url4 = "kong.dev/file6.json";
const url5 = "kong.dev/file7.json";


function downloadingPromise(url) {

    return new Promise(function(resolve, reject) {

        console.log("กำลังดาวน์โหลดข้อมูลจาก:", url);

        setTimeout(() => {

            if(connect){

                resolve(`โหลด ${url} เรียบร้อยแล้ว`);

            }else{

                reject(new Error("ไม่สามารถเชื่อมต่อกับ server ได้"));

            }

        },1000);

    });

}



async function downloadData(url){

    try {

        const result = await downloadingPromise(url);

        console.log(
            "ดาวน์โหลดข้อมูลเสร็จสิ้น:",
            result
        );


    } catch(error){

        console.error(
            "เกิดข้อผิดพลาด:",
            error.message
        );

    }

}

// เรียกใช้งาน

downloadData(url1);




// การใช้ Async / Await (Failed Case)

const connect = false; // เปลี่ยนเป็น false เพื่อทดสอบ Error


const url1 = "kong.dev/file3.json";


function downloadingPromise(url) {

    return new Promise(function(resolve, reject) {

        console.log("กำลังดาวน์โหลดข้อมูลจาก:", url);


        setTimeout(() => {

            if(connect){

                resolve({
                    status: "success",
                    message: `โหลด ${url} เรียบร้อยแล้ว`
                });


            }else{

                reject(new Error(
                    `โหลด ${url} ไม่สำเร็จ : ไม่สามารถเชื่อมต่อกับ server ได้`
                ));

            }


        },1000);

    });

}


async function downloadData(url){

    try {

        const result = await downloadingPromise(url);


        console.log("===== RESULT =====");
        console.log("Status :", result.status);
        console.log("Message:", result.message);


    } catch(error){


        console.log("===== ERROR =====");

        console.error(
            "Status : failed"
        );

        console.error(
            "Error Message:",
            error.message
        );

    }

}


// เรียกใช้งาน

downloadData(url1);