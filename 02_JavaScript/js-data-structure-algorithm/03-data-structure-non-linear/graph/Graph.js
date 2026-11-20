// =====================================================
// Graph (กราฟ) แบบ Adjacency List ชนิดไม่มีทิศทาง
// เก็บเป็นออบเจ็กต์: key = จุดยอด (Vertex), value = รายชื่อจุดยอดที่เชื่อมอยู่
// ตัวอย่าง: { A: ["B", "C"], B: ["A"], C: ["A"] }
// =====================================================

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // addVertex: เพิ่มจุดยอดใหม่ (ถ้ามีอยู่แล้วคืน false)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      return true;
    }
    return false;
  }

  // addEdge: เพิ่มเส้นเชื่อมระหว่าง 2 จุดยอด (เชื่อมทั้งสองทาง)
  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      return true;
    }
    return false;
  }

  // removeEdge: ลบเส้นเชื่อมระหว่าง 2 จุดยอด (ลบทั้งสองทาง)
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (v) => v !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (v) => v !== vertex1
      );
      return true;
    }
    return false;
  }
}

module.exports = { Graph };
