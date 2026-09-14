# การแปลง Object เป็น String ใน Python
# วิธีที่นิยมใช้คือสร้างเมธอด __str__() ใน Class
# เมธอดนี้จะกำหนดรูปแบบข้อความที่ return เมื่อเรียก str(object)
# หรือใช้ print(object) เพื่อแสดงข้อมูลของ Object ให้คนอ่านเข้าใจง่าย

# -------------------------------
# 1) สร้าง Class ตัวอย่าง
# -------------------------------
class Student:
    def __init__(self, name, age, score):
        # กำหนดคุณสมบัติของ Object
        self.name = name
        self.age = age
        self.score = score

    # เมธอด __str__() ใช้สำหรับแปลง Object เป็น String
    def __str__(self):
        # คืนค่าเป็นข้อความที่อ่านง่าย
        return f"Student(name={self.name}, age={self.age}, score={self.score})"

    # เมธอด __repr__() ใช้สำหรับแสดงข้อมูลแบบ raw / developer-friendly
    def __repr__(self):
        return f"Student('{self.name}', {self.age}, {self.score})"


# -------------------------------
# 2) สร้าง Object จาก Class
# -------------------------------
student1 = Student("Alice", 20, 88.5)
student2 = Student("Bob", 22, 91.0)

# -------------------------------
# 3) การแปลง Object เป็น String
# -------------------------------
# ใช้ str(object) เพื่อเปลี่ยน object ให้เป็น string
print("str(student1) =", str(student1))

# เรียก __str__() โดยตรง
print("student1.__str__() =", student1.__str__())

# เมื่อใช้ print(object) Python จะเรียก __str__() อัตโนมัติ
print("print(student1):")
print(student1)

# -------------------------------
# 4) ตัวอย่างการใช้งานจริง
# -------------------------------
print("\nข้อมูลนักเรียน:")
print(f"{student1} | {student2}")

# สามารถเก็บข้อมูลเป็น list และแสดงผลได้
students = [student1, student2]
print("\nList of students:")
print(students)

# -------------------------------
# 5) อธิบายโครงสร้างหลัก
# -------------------------------
# - __init__() : ใช้กำหนดค่าเริ่มต้นให้ Object
# - __str__() : ใช้แปลง Object เป็นข้อความที่อ่านง่ายสำหรับผู้ใช้
# - str(obj) : ฟังก์ชันแปลง Object เป็น String
# - print(obj) : เรียก __str__() ภายในเพื่อแสดงผล
# - __repr__() : ใช้สำหรับแสดงรายละเอียดแบบ technical / debug

# -------------------------------
# 6) ข้อสรุป
# -------------------------------
# ถ้าต้องการให้ Object แสดงข้อมูลแบบสวยและอ่านง่าย
# ให้เขียนเมธอด __str__() ใน Class แล้ว Python จะจัดการแปลงให้เอง
# โดยอัตโนมัติเมื่อทำงานร่วมกับ print() หรือ str()
