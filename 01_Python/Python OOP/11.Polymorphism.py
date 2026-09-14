# Polymorphism in Python OOP
# Polymorphism = การใช้ชื่อเมธอดเดียวกันในคลาสต่างๆ แต่แต่ละคลาสให้ผลลัพธ์ที่ต่างกัน
# แนวคิดหลัก: "สื่อสารผ่าน interface เดียว แต่มีการปฏิบัติต่างกันตามชนิดของวัตถุ"

# 1) สร้างคลาสแม่ (Base Class)
# - มีเมธอด speak() ที่เป็น abstract concept
# - เมธอดนี้จะถูก override ในคลาสลูก
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        # เมธอดนี้เป็น template สำหรับคลาสลูก
        # ถ้าเรียกตรงจากคลาสแม่ จะเกิดข้อผิดพลาดเพื่อให้คลาสลูกต้อง override
        raise NotImplementedError("Subclasses must implement the speak() method")


# 2) สร้างคลาสลูกที่มีการ override เมธอดเดียวกัน
class Dog(Animal):
    def speak(self):
        return f"{self.name} : ก๊อกก๊อก!"


class Cat(Animal):
    def speak(self):
        return f"{self.name} : เหมียว!"


class Bird(Animal):
    def speak(self):
        return f"{self.name} : จิ๊ดจ๊ิด!"


# 3) การใช้ Polymorphism
# - เราสร้างฟังก์ชันที่รับวัตถุแบบ Animal อย่างเดียว
# - แต่ทุกคลาสลูกสามารถเรียกเมธอด speak() ได้ด้วยรูปแบบเดียวกัน
# - ผลที่ได้จะแตกต่างกันตามชนิดของวัตถุ

def animal_sound(animal):
    print(animal.speak())


# 4) ตัวอย่างการใช้งานจริง
if __name__ == "__main__":
    # สร้างวัตถุหลายชนิด
    dog = Dog("สุนัข")
    cat = Cat("แมว")
    bird = Bird("นก")

    # เก็บไว้ใน list เดียวกันเพราะทุกตัวเป็น Animal
    animals = [dog, cat, bird]

    # วนลูปเรียก method เดียวกันแต่ได้ผลลัพธ์ต่างกัน
    print("=== การแสดงตัวอย่าง Polymorphism ===")
    for animal in animals:
        animal_sound(animal)

    print("\n=== สรุปหลักการทำงาน ===")
    print("1. คลาสแม่ Animal กำหนดชื่อเมธอดเดียวกันว่า speak()")
    print("2. คลาสลูก Dog, Cat, Bird override เมธอดนี้ด้วยพฤติกรรมต่างกัน")
    print("3. ฟังก์ชัน animal_sound() ไม่สนใจว่าจะเป็น Dog หรือ Cat")
    print("4. มันเรียก speak() เดียวกัน แต่ผลลัพธ์เปลี่ยนตามชนิดของวัตถุ")


# -----------------------------------------------------------
# ตัวอย่างคำอธิบายแบบเข้าใจง่าย:
# - Dog.speak() -> "ก๊อกก๊อก!"
# - Cat.speak() -> "เหมียว!"
# - Bird.speak() -> "จิ๊ดจ๊ิด!"
# เหมือนเราเรียกคำสั่งเดียวกัน "speak()" แต่ละชนิดตอบกลับต่างกัน
# นี่คือสิ่งที่เรียกว่า Polymorphism
# -----------------------------------------------------------
