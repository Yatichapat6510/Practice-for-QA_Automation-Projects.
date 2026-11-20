// ตัวอย่างการใช้งาน Graph
// รันด้วย: node demo.js

const { Graph } = require("./Graph");

const myGraph = new Graph();
console.log("addVertex('A') ->", myGraph.addVertex("A")); // true
console.log("addVertex('A') ซ้ำ ->", myGraph.addVertex("A")); // false
myGraph.addVertex("B");
myGraph.addVertex("C");

myGraph.addEdge("A", "B");
myGraph.addEdge("B", "C");
myGraph.addEdge("C", "A");
console.log("หลัง addEdge:", myGraph.adjacencyList);
// { A: [ 'B', 'C' ], B: [ 'A', 'C' ], C: [ 'B', 'A' ] }

myGraph.removeEdge("A", "B");
console.log("หลัง removeEdge(A, B):", myGraph.adjacencyList);
// { A: [ 'C' ], B: [ 'C' ], C: [ 'B', 'A' ] }
