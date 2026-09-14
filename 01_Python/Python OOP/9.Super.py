# """
#     การใช้งาน super() ใน Python OOP

#     super() คือคำสั่งที่ใช้เรียกเมทอดหรือคุณสมบัติจากคลาสแม่
#     โดยมักใช้เมื่อคลาสลูกต้องสืบทอดหรือขยายการทำงานจากคลาสแม่

#     โครงสร้างแบบทั่วไป:
#         class Child(Parent):
#             def __init__(self, ...):
#                 super().__init__(...)

#     จุดประสงค์หลัก:
#     1. เรียก __init__ ของคลาสแม่
#     2. ใช้โค้ดจากคลาสแม่ต่อได้ โดยไม่ต้องเขียนซ้ำ
#     3. อนุญาตให้มีการสืบทอดหลายชั้นได้อย่างถูกต้อง
# """

# ----------------------------------------------------
# 1) ตัวอย่างพื้นฐาน: super() ใน __init__
# ----------------------------------------------------
class Animal:
    def __init__(self, name):
        self.name = name
        print(f"Animal.__init__ ได้เรียกใช้งานแล้ว: {self.name}")

    def speak(self):
        print(f"{self.name} กำลังส่งเสียง")


class Dog(Animal):
    def __init__(self, name, age):
        # เหตุผลที่ใช้ super():
        # - เพื่อเรียก __init__ ของ Animal เพื่อกำหนดค่า name
        # - เพื่อให้โค้ดสืบทอดจากคลาสแม่และไม่ต้องเขียนซ้ำ
        super().__init__(name)
        self.age = age
        print(f"Dog.__init__ ได้เรียกใช้งานแล้ว, อายุ: {self.age}")

    def speak(self):
        # เรียกเมทอด speak() จากคลาสแม่ด้วย super()
        super().speak()
        print(f"{self.name} คือ สุนัขที่มีอายุ {self.age} ปี")


# ----------------------------------------------------
# 2) ตัวอย่างการสร้างวัตถุและเรียกใช้งาน
# ----------------------------------------------------
print("=" * 60)
print("ตัวอย่างที่ 1: super() ในการเรียก __init__ ของคลาสแม่")
dog1 = Dog("บอม", 3)
print()
print("เรียกเมทอด speak() จากคลาสลูก:")
dog1.speak()
print("=" * 60)

# ----------------------------------------------------
# 3) ตัวอย่างการสืบทอดหลายชั้น
# ----------------------------------------------------
class Pet:
    def __init__(self, name):
        self.name = name
        print(f"Pet.__init__ เรียกแล้ว, ชื่อ: {self.name}")

    def info(self):
        print(f"สัตว์เลี้ยงชื่อ {self.name}")


class Cat(Pet):
    def __init__(self, name, color):
        super().__init__(name)
        self.color = color
        print(f"Cat.__init__ เรียกแล้ว, สี: {self.color}")

    def info(self):
        super().info()
        print(f"สี: {self.color}")


class Kitten(Cat):
    def __init__(self, name, color, age):
        # super() ที่นี่เรียก __init__ ของคลาส Cat
        # และ Cat จะเรียก __init__ ของ Pet ต่อไปโดยอัตโนมัติ
        super().__init__(name, color)
        self.age = age
        print(f"Kitten.__init__ เรียกแล้ว, อายุ: {self.age}")

    def info(self):
        super().info()
        print(f"อายุ: {self.age} เดือน")


print("\nตัวอย่างที่ 2: super() ในการสืบทอดหลายชั้น")
kitten1 = Kitten("มะลิ", "ขาว", 5)
print()
kitten1.info()
print("=" * 60)

# ----------------------------------------------------
# 4) ตัวอย่างการใช้ super() แบบอธิบายสั้น ๆ ในโครงสร้าง
# ----------------------------------------------------
class Person:
    def __init__(self, name):
        self.name = name

    def show(self):
        print(f"ชื่อ: {self.name}")


class Student(Person):
    def __init__(self, name, student_id):
        super().__init__(name)  # เรียก __init__ ของ Person
        self.student_id = student_id

    def show(self):
        super().show()  # เรียก show() ของ Person
        print(f"รหัสนักศึกษา: {self.student_id}")


print("\nตัวอย่างที่ 3: โครงสร้างการเขียน super() แบบเป็นลำดับ")
student = Student("สมชาย", "STU-001")
student.show()
print("=" * 60)

# ----------------------------------------------------
# 5) สรุปสั้น ๆ
# ----------------------------------------------------
print("\nสรุป:")
print("1. super() ใช้สำหรับเรียกเมทอดหรือ property จากคลาสแม่")
print("2. มักใช้ใน __init__ เพื่อกำหนดค่าเริ่มต้นจากคลาสแม่")
print("3. ช่วยให้โค้ดสะอาด สืบทอดได้ถูกต้อง และไม่ต้องเขียนซ้ำ")
print("4. ใน Python 3 การเขียน super() แบบไม่มี argument เป็นรูปแบบที่แนะนำมากที่สุด")

# ----------------------------------------------------
# รูปแบบการเขียนแบบทั่วไป
# ----------------------------------------------------
"""
class Child(Parent):
    def __init__(self, x, y):
        super().__init__(x)     # เรียก __init__ ของ Parent
        self.y = y             # เพิ่มคุณสมบัติใหม่ของ Child

    def method(self):
        super().method()       # เรียก method() จาก Parent
        print("โค้ดเพิ่มเติมของ Child")
"""
