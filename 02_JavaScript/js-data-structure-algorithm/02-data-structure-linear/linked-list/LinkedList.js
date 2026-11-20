// =====================================================
// Linked List (ลิงค์ลิสต์ทางเดียว)
// แต่ละ Node เก็บ value และชี้ไปยัง Node ถัดไป (next)
// มี head = โหนดแรก, tail = โหนดสุดท้าย, length = จำนวนโหนด
// =====================================================

class Node {
  constructor(value) {
    this.value = value; // ข้อมูลที่เก็บ
    this.next = null; // ตัวชี้ไปโหนดถัดไป (ตอนแรกยังไม่มี)
  }
}

class LinkedList {
  // สร้างลิสต์พร้อมโหนดแรก 1 โหนด
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  // แสดงค่าทุกโหนดตั้งแต่ head ถึง tail
  showList() {
    let temp = this.head;
    while (temp !== null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }

  // push: เพิ่มโหนดต่อท้าย O(1)
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      // ลิสต์ว่าง -> โหนดใหม่เป็นทั้ง head และ tail
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode; // ให้ tail เดิมชี้ไปโหนดใหม่
      this.tail = newNode; // ย้าย tail มาที่โหนดใหม่
    }
    this.length++;
    return this;
  }

  // pop: ลบโหนดท้ายสุด O(n) เพราะต้องไล่หาโหนดก่อนหน้า tail
  pop() {
    if (this.length === 0) return undefined;
    let temp = this.head;
    let pre = this.head;
    while (temp.next) {
      pre = temp; // pre ตามหลัง temp อยู่ 1 โหนด
      temp = temp.next;
    }
    this.tail = pre; // ถอย tail ไปโหนดก่อนหน้า
    this.tail.next = null; // ตัดโหนดท้ายออก
    this.length--;
    if (this.length === 0) {
      // ลบจนหมดลิสต์ ต้องเคลียร์ head/tail ด้วย
      this.head = null;
      this.tail = null;
    }
    return temp;
  }

  // unshift: เพิ่มโหนดไว้หน้าสุด O(1)
  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head; // โหนดใหม่ชี้ไป head เดิม
      this.head = newNode; // ย้าย head มาที่โหนดใหม่
    }
    this.length++;
    return this;
  }

  // shift: ลบโหนดหน้าสุด O(1)
  shift() {
    if (this.length === 0) return undefined;
    let temp = this.head;
    this.head = this.head.next; // ขยับ head ไปโหนดถัดไป
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    temp.next = null; // ตัดโหนดที่ลบออกจากลิสต์
    return temp;
  }

  // get: ดึงโหนดตามตำแหน่ง index O(n)
  get(index) {
    if (index < 0 || index >= this.length) return undefined;
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp.next;
    }
    return temp;
  }

  // set: เปลี่ยนค่าของโหนดที่ตำแหน่ง index
  set(index, value) {
    const temp = this.get(index);
    if (temp) {
      temp.value = value;
      return true;
    }
    return false;
  }

  // insert: แทรกโหนดใหม่ที่ตำแหน่ง index
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return this.push(value); // แทรกท้ายสุด
    if (index === 0) return this.unshift(value); // แทรกหน้าสุด

    const newNode = new Node(value);
    const temp = this.get(index - 1); // โหนดก่อนตำแหน่งที่จะแทรก
    newNode.next = temp.next; // โหนดใหม่ชี้ไปโหนดเดิมที่ตำแหน่งนั้น
    temp.next = newNode; // โหนดก่อนหน้าชี้มาที่โหนดใหม่
    this.length++;
    return true;
  }

  // remove: ลบโหนดที่ตำแหน่ง index
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const before = this.get(index - 1);
    const temp = before.next; // โหนดที่จะลบ
    before.next = temp.next; // ข้ามโหนดที่ลบไป
    temp.next = null;
    this.length--;
    return temp;
  }

  // reverse: กลับด้านลิสต์ O(n)
  reverse() {
    let temp = this.head;
    this.head = this.tail; // สลับ head กับ tail
    this.tail = temp;

    let next = temp.next;
    let prev = null;
    for (let i = 0; i < this.length; i++) {
      next = temp.next; // จำโหนดถัดไปไว้ก่อน
      temp.next = prev; // กลับทิศลูกศรให้ชี้ไปโหนดก่อนหน้า
      prev = temp; // ขยับ prev และ temp ไปข้างหน้า
      temp = next;
    }
    return this;
  }
}

module.exports = { Node, LinkedList };
