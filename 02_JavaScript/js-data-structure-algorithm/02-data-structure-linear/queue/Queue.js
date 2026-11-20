// =====================================================
// Queue (คิว) : หลักการ FIFO (First In, First Out)
// เข้าก่อนออกก่อน เหมือนต่อแถวซื้อของ
// first = หัวคิว (ออกจากตรงนี้), last = ท้ายคิว (เข้าตรงนี้)
// =====================================================

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    const newNode = new Node(value);
    this.first = newNode;
    this.last = newNode;
    this.length = 1;
  }

  // แสดงข้อมูลจากหัวคิวไปท้ายคิว
  printQueue() {
    let temp = this.first;
    while (temp !== null) {
      console.log(temp.value);
      temp = temp.next;
    }
  }

  // enqueue: เข้าคิวที่ท้ายแถว O(1)
  enqueue(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
    return this;
  }

  // dequeue: ออกจากคิวที่หัวแถว O(1)
  dequeue() {
    if (this.length === 0) return undefined;
    const temp = this.first;
    if (this.length === 1) {
      // เหลือคนสุดท้าย คิวจะว่าง
      this.first = null;
      this.last = null;
    } else {
      this.first = this.first.next; // ขยับหัวคิวไปคนถัดไป
      temp.next = null;
    }
    this.length--;
    return temp;
  }
}

module.exports = { Node, Queue };
