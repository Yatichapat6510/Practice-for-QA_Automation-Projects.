# Basic OOP
# 1. Class = แม่แบบ/Blueprint สำหรับสร้าง Object
# 2. Object = วัตถุที่สร้างจาก Class
# 3. __init__ = ฟังก์ชันสร้าง Object / ตั้งค่าเริ่มต้นให้ Object
# 4. self = ตัวแทนของ Object ปัจจุบัน
# 5. Method = ฟังก์ชันที่อยู่ใน Class สำหรับทำงานกับ Object

class Employee:  # Class = แม่แบบข้อมูลพนักงาน
    def __init__(self, name, age, position, salary):
        # Attribute = คุณสมบัติของ Object
        self.name = name
        self.age = age
        self.position = position
        self.salary = salary

    def display_info(self):
        # Method = ฟังก์ชันที่ใช้กับ Object ของ Class นี้
        print(f"Name: {self.name}, Age: {self.age}, Position: {self.position}, Salary: {self.salary}")


# สร้าง Object จาก Class Employee
# แต่ละ Object จะมีข้อมูลต่างกัน แต่ใช้ Class เดียวกัน
emp1 = Employee("John", 30, "Manager", 60000)
emp2 = Employee("Jane", 25, "Developer", 45000)
emp3 = Employee("New", 27, "Software Tester", 36500)

# เรียกใช้ Method display_info() ของแต่ละ Object
emp1.display_info()
emp2.display_info()
emp3.display_info()

# - Employee เป็น Class
# - emp1, emp2, emp3 เป็น Object
# - self.name, self.age, ... คือข้อมูลภายใน Object
# - display_info() คือ Method ที่แสดงข้อมูลออกมาทีละ Object


