// ตัวอย่างการใช้งาน LinkedList ไล่ตามลำดับในคลิป
// รันด้วย: node demo.js

const { LinkedList } = require("./LinkedList");

// 1) Constructor
const myLinkedList = new LinkedList(1);
console.log("1) constructor:", myLinkedList);

// 2) Push
myLinkedList.push(2);
myLinkedList.push(3);
console.log("2) push 2, 3:");
myLinkedList.showList(); // 1 2 3

// 3) Pop
console.log("3) pop ->", myLinkedList.pop().value); // 3
myLinkedList.showList(); // 1 2

// 4) Unshift
myLinkedList.unshift(4);
console.log("4) unshift 4:");
myLinkedList.showList(); // 4 1 2

// 5) Shift
console.log("5) shift ->", myLinkedList.shift().value); // 4
myLinkedList.showList(); // 1 2

// 6) Get
console.log("6) get(0) ->", myLinkedList.get(0).value); // 1
console.log("   get(1) ->", myLinkedList.get(1).value); // 2
console.log("   get(-1) ->", myLinkedList.get(-1)); // undefined
console.log("   get(10) ->", myLinkedList.get(10)); // undefined

// 7) Set
console.log("7) set(1, 5) ->", myLinkedList.set(1, 5)); // true
myLinkedList.showList(); // 1 5

// 8) Insert
myLinkedList.insert(1, 4);
console.log("8) insert(1, 4):");
myLinkedList.showList(); // 1 4 5

// 9) Remove
console.log("9) remove(1) ->", myLinkedList.remove(1).value); // 4
myLinkedList.showList(); // 1 5

// 10) Reverse
myLinkedList.push(6);
console.log("10) before reverse:");
myLinkedList.showList(); // 1 5 6
myLinkedList.reverse();
console.log("    after reverse:");
myLinkedList.showList(); // 6 5 1
