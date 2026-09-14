# OOP: Functions, Classes and Objects
# 1) Class attribute: ข้อมูลร่วมกันของคลาส
class Student:
    school = "QA Academy"

    # 2) __init__: สร้าง Object และกำหนดค่าเริ่มต้น
    def __init__(self, name, score):
        self.name = name
        self.score = score

    # 3) Instance method: ใช้กับ Object เท่านั้น
    def pass_exam(self):
        return self.score >= 50

    # 4) Instance method: แสดงข้อมูล Object
    def show_info(self):
        print(f"Name: {self.name}, Score: {self.score}, School: {self.school}")

    # 5) Class method: ทำงานกับคลาส (class level)
    @classmethod
    def set_school(cls, new_school):
        cls.school = new_school

    # 6) Static method: ฟังก์ชันช่วยเหลือที่ไม่ใช้ self หรือ cls
    @staticmethod
    def grade_label(score):
        if score >= 80:
            return "A"
        elif score >= 70:
            return "B"
        elif score >= 60:
            return "C"
        else:
            return "F"


# การใช้งาน Object
students = [
    Student("Alice", 85),
    Student("Bob", 75),
    Student("Charlie", 65),
    Student("David", 55),
]

for student in students:
    print(f"{student.name}: pass_exam = {student.pass_exam()}")
    student.show_info()
    print(f"Grade: {Student.grade_label(student.score)}")
    print("-" * 30)

print("Student.grade_label(85) ->", Student.grade_label(85))  # A
print("Student.grade_label(75) ->", Student.grade_label(75))  # B
print("Student.grade_label(65) ->", Student.grade_label(65))  # C
print("Student.grade_label(55) ->", Student.grade_label(55))  # F


# การเปลี่ยนค่า Class attribute
Student.set_school("QA School")
print("\nAfter updating class attribute:")
students[1].show_info()  # ข้อมูลอัปเดตตามคลาส


# - instance method: ใช้ข้อมูลของ object
# - class method: ใช้ข้อมูลของ class
# - static method: ฟังก์ชันช่วยเหลือที่ไม่ต้องใช้ object/class
