// ตัวอย่างการใช้งาน Stack
// รันด้วย: node demo.js

const { Stack } = require("./Stack");

const myStack = new Stack(3);
console.log("constructor:", myStack);

myStack.push(2);
myStack.push(1);
console.log("หลัง push 2, 1 (บนสุดไปล่างสุด):");
myStack.printStack(); // 1 2 3

console.log("pop ->", myStack.pop().value); // 1 (เข้าทีหลังออกก่อน)
myStack.printStack(); // 2 3
console.log("length:", myStack.length); // 2
