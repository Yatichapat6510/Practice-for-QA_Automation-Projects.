// ตัวอย่างการใช้งาน Queue
// รันด้วย: node demo.js

const { Queue } = require("./Queue");

const myQueue = new Queue(1);
console.log("constructor:", myQueue);

myQueue.enqueue(2);
myQueue.enqueue(3);
console.log("หลัง enqueue 2, 3 (หัวคิวไปท้ายคิว):");
myQueue.printQueue(); // 1 2 3

console.log("dequeue ->", myQueue.dequeue().value); // 1 (เข้าก่อนออกก่อน)
myQueue.printQueue(); // 2 3
console.log("length:", myQueue.length); // 2
