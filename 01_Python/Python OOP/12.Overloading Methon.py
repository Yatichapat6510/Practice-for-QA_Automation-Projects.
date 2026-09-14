# Overloading Method (Method Overloading) ใน Python
# -------------------------------------------------
# Python ไม่รองรับการ Overloading Method แบบตรงกันทุกภาษาเช่น Java/C++
# แต่เราสามารถทำได้โดยใช้ค่าเริ่มต้นของพารามิเตอร์, *args, **kwargs
# หรือการตรวจสอบประเภทข้อมูล เพื่อให้ฟังก์ชันสามารถทำงานได้หลายรูปแบบ

# ==========================
# 1) โครงสร้างพื้นฐานของคลาส
# ==========================
class Employee:
    def __init__(self, name, salary=0):
        # __init__ คือ Constructor
        # ถูกเรียกอัตโนมัติเมื่อสร้าง Object ใหม่
        # name เป็นข้อมูลบังคับ, salary เป็นข้อมูลที่สามารถไม่ส่งได้
        self.name = name
        self.salary = salary

    def show_info(self, name=None, salary=None):
        # Method นี้มีการใช้ค่าเริ่มต้น (default value)
        # ทำให้สามารถเรียกใช้ได้ 2 แบบ:
        # 1. show_info()
        # 2. show_info("John", 30000)
        # ถ้าไม่มีค่าที่ส่งเข้ามา จะใช้ค่าเดิมจาก object
        if name is not None:
            self.name = name
        if salary is not None:
            self.salary = salary

        print(f"ชื่อพนักงาน: {self.name}")
        print(f"เงินเดือน: {self.salary}")


# ==========================
# 2) ตัวอย่างการใช้งานแบบที่ 1:
#    ใช้ค่าเริ่มต้นของพารามิเตอร์
# ==========================
print("=== แบบที่ 1: ใช้ค่าเริ่มต้นของพารามิเตอร์ ===")
emp1 = Employee("Alice", 25000)
emp1.show_info()                      # เรียกโดยไม่ส่งพารามิเตอร์ใดๆ
emp1.show_info("Bob")                # ส่งเฉพาะ name, salary จะใช้ค่าเดิม
emp1.show_info("Charlie", 45000)    # ส่งครบทั้ง 2 ค่า


# ==========================
# 3) โครงสร้าง Method Overloading แบบใช้ *args
# ==========================
class Calculator:
    def add(self, *args):
        # *args คือพารามิเตอร์ที่รับค่าได้หลายค่า
        # โดย Python จะเก็บค่าเหล่านั้นเป็น tuple
        # เช่น add(1, 2, 3) => args = (1, 2, 3)
        total = 0
        for value in args:
            total += value
        return total


print("\n=== แบบที่ 2: ใช้ *args ===")
calc = Calculator()
print("ผลรวม 1 ตัว: ", calc.add(10))
print("ผลรวม 2 ตัว: ", calc.add(10, 20))
print("ผลรวม 3 ตัว: ", calc.add(10, 20, 30))

# ข้อความอธิบาย:
# - วิธีนี้ช่วยให้ Method สามารถรับค่าหลายรูปแบบได้โดยไม่ต้องสร้าง Method หลายชิ้น
# - Python จะจัดการรวมค่าทั้งหมดที่ส่งเข้ามาเป็น tuple และประมวลผลตามเงื่อนไข


# ==========================
# 4) โครงสร้าง Method Overloading แบบใช้ isinstance
# ==========================
class Display:
    def print_data(self, data):
        # วิธีนี้ใช้การตรวจสอบประเภทข้อมูล (type checking)
        # เพื่อให้ Method ทำงานตามประเภทของข้อมูลที่ถูกส่งเข้ามา
        if isinstance(data, int):
            print("ประเภทข้อมูล: int")
            print(f"ค่าที่รับมา: {data}")
        elif isinstance(data, str):
            print("ประเภทข้อมูล: str")
            print(f"ข้อความ: {data}")
        elif isinstance(data, list):
            print("ประเภทข้อมูล: list")
            print(f"รายการ: {data}")
        else:
            print("ประเภทข้อมูลไม่รองรับในตัวอย่างนี้")


print("\n=== แบบที่ 3: ใช้ isinstance สำหรับตรวจสอบประเภทข้อมูล ===")
display = Display()
display.print_data(100)
display.print_data("Hello Python")
display.print_data([1, 2, 3])

# ข้อความอธิบาย:
# - หากต้องการให้ Method ทำงานต่างกันตามประเภทข้อมูล ให้ใช้ isinstance()
# - เป็นรูปแบบหนึ่งของการจำลองการ Overloading Method ใน Python


# ==========================
# 5) ตัวอย่างที่แสดงความแตกต่างระหว่าง Method Overloading
#    กับ Method Overriding
# ==========================
class Animal:
    def sound(self):
        print("Animal makes a sound")


class Dog(Animal):
    def sound(self):
        # Method นี้เขียนทับ (override) Method ในคลาสแม่
        # ไม่ใช่การ Overloading แต่เป็นการแทนที่การทำงาน
        print("Dog barks")


print("\n=== แบบที่ 4: ตัวอย่าง Overriding ===")
animal = Animal()
dog = Dog()
animal.sound()
dog.sound()

# ข้อความอธิบาย:
# - Overloading = สร้าง Method ที่รับข้อมูลหลายรูปแบบหรือหลายจำนวนพารามิเตอร์
# - Overriding = คลาสลูกเขียน Method ใหม่เพื่อแทนที่ Method ของคลาสแม่


# ==========================
# 6) สรุปหลักการใช้งาน Overloading Method ใน Python
# ==========================
print("\n=== สรุป ===")
print("1. Python ไม่ได้มีเมธอด Overloading แบบคลาสสิกเหมือนภาษาอื่น")
print("2. เราใช้ค่าเริ่มต้นของพารามิเตอร์, *args หรือ isinstance() เพื่อจำลองการทำงาน")
print("3. สามารถทำให้ Method รับข้อมูลหลายรูปแบบได้ในเมธอดเดียว")
print("4. การออกแบบ Method ควรอ่านง่ายและจัดโครงสร้างให้ชัดเจน")

# ------------------------------
# ตัวอย่างคำอธิบายแบบสั้น ๆ
# ------------------------------
# การ Overloading Method ใน Python คือการเขียนเมธอดเดียวที่สามารถทำงานได้หลายรูปแบบ
# เช่นเดียวกันกับการรับข้อมูลหลายแบบ หรือส่งค่าที่ต่างกันไปตามเงื่อนไข
# โดยใช้เทคนิคดังต่อไปนี้:
#   - default parameter
#   - *args
#   - isinstance()
#   - ตรวจสอบเงื่อนไขภายในเมธอด

