# Constructor and Destructor
# - __init__(): เรียกเมื่อสร้างวัตถุใหม่ (Object)
# - __del__(): เรียกเมื่อวัตถุถูกลบออกจากหน่วยความจำ

class Person:
    def __init__(self, name):
        self.name = name
        print(f"{self.name} has been created.")   # ทำงานตอนสร้าง Object

    def __del__(self):
        print(f"{self.name} has been deleted.")   # ทำงานตอน Object ถูกลบ

# สร้าง Object
person1 = Person("Kimi")
person2 = Person("Josh")
person3 = Person("Charlie")

# ลบ Object แบบกำหนดเอง
# เมื่อ del person2 ทำงาน จะเห็นข้อความจาก __del__
del person2

print("Program continues...")
# ถ้าโปรแกรมจบ Object ที่เหลือจะถูกลบโดยอัตโนมัติ และ __del__ จะทำงานอีกครั้ง


