// ตัวอย่างการใช้งาน Binary Search Tree
// รันด้วย: node demo.js

const { BinarySearchTree } = require("./BinarySearchTree");

const myBST = new BinarySearchTree();
console.log("constructor:", myBST);

// เพิ่มโหนด 47, 21, 76, 18, 27, 52, 82
[47, 21, 76, 18, 27, 52, 82].forEach((v) => myBST.insert(v));

/*
    แผนภาพไบนารีทรี
            47
          /    \
        21      76
       /  \    /  \
     18   27  52   82
*/

console.log("contains(15):", myBST.contains(15)); // false
console.log("contains(76):", myBST.contains(76)); // true
console.log("minimum value:", myBST.minimumNode(myBST.root).value); // 18
console.log("insert ซ้ำ (47):", myBST.insert(47)); // undefined
