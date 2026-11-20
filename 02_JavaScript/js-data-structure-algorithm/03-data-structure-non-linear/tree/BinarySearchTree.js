// =====================================================
// Binary Search Tree (BST)
// กฎ: ค่าที่น้อยกว่าโหนดแม่ไปทางซ้าย, ค่าที่มากกว่าไปทางขวา
// แต่ละโหนดมีลูกได้ไม่เกิน 2 โหนด (left, right)
// =====================================================

class Node {
  constructor(value) {
    this.value = value;
    this.left = null; // ลูกฝั่งซ้าย (ค่าน้อยกว่า)
    this.right = null; // ลูกฝั่งขวา (ค่ามากกว่า)
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null; // เริ่มต้นเป็นทรีว่าง
  }

  // insert: เพิ่มโหนดใหม่ลงในตำแหน่งที่ถูกต้อง
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode; // ทรีว่าง -> เป็น root
      return this;
    }
    let temp = this.root;
    while (true) {
      if (newNode.value === temp.value) return undefined; // ไม่เก็บค่าซ้ำ
      if (newNode.value < temp.value) {
        // ไปทางซ้าย
        if (temp.left === null) {
          temp.left = newNode;
          return this;
        }
        temp = temp.left;
      } else {
        // ไปทางขวา
        if (temp.right === null) {
          temp.right = newNode;
          return this;
        }
        temp = temp.right;
      }
    }
  }

  // contains: ตรวจสอบว่ามีค่านี้อยู่ในทรีหรือไม่
  contains(value) {
    if (this.root === null) return false;
    let temp = this.root;
    while (temp) {
      if (value < temp.value) {
        temp = temp.left;
      } else if (value > temp.value) {
        temp = temp.right;
      } else {
        return true; // เจอค่าที่ต้องการ
      }
    }
    return false;
  }

  // minimumNode: หาโหนดที่ค่าต่ำสุดของทรี (หรือของทรีย่อย) คือโหนดซ้ายสุด
  minimumNode(currentNode) {
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }
}

module.exports = { Node, BinarySearchTree };
