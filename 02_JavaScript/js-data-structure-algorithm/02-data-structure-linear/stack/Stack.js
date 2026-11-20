// =====================================================
// Stack (สแต็ก) : หลักการ LIFO (Last In, First Out)
// เข้าทีหลังออกก่อน เหมือนกองจาน
// ใช้โครงสร้างแบบ Linked List โดยมีตัวชี้ top ที่ข้างบนสุด
// =====================================================

class Node {
  constructor(value) {
    this.value = value;
    this.next = null; // ชี้ไปโหนดที่อยู่ใต้มันลงไป
  }
}

class Stack {
  constructor(value) {
    const newNode = new Node(value);
    this.top = newNode; // โหนดบนสุดของสแต็ก
    this.length = 1;
  }

  // แสดงข้อมูลจากบนสุดลงล่าง
  printStack() {
    let temp = this.top;
    while (temp !== null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }

  // push: ใส่ข้อมูลบนสุด O(1)
  push(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.top = newNode;
    } else {
      newNode.next = this.top; // โหนดใหม่ชี้ไปที่ top เดิม
      this.top = newNode; // ให้โหนดใหม่เป็น top
    }
    this.length++;
    return this;
  }

  // pop: เอาข้อมูลบนสุดออก O(1)
  pop() {
    if (this.length === 0) return undefined;
    const temp = this.top;
    this.top = this.top.next; // ย้าย top ลงไป 1 ชั้น
    temp.next = null;
    this.length--;
    return temp;
  }
}

module.exports = { Node, Stack };
