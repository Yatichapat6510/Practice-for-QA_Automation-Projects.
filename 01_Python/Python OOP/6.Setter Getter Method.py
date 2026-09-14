# Setter / Getter Method ใน Python
# -----------------------------------------------------------------------------
# การเขียนแบบ OOP (Object-Oriented Programming)
# Setter คือ เมธอดที่ใช้กำหนดค่าให้กับ attributes
# Getter คือ เมธอดที่ใช้ดึงค่า attributes กลับมาอ่าน
#
# จุดประสงค์ของการใช้ Setter / Getter:
# 1. ปกป้องข้อมูล (data validation)
# 2. ควบคุมการเข้าถึงข้อมูล
# 3. ทำให้โค้ดอ่านง่ายและมีระเบียบ
# -----------------------------------------------------------------------------

class Student:
    # 1) Constructor: ใช้สำหรับสร้าง object และกำหนดค่าเริ่มต้น
    # __init__ คือ method ที่ถูกเรียกอัตโนมัติเมื่อสร้าง object
    def __init__(self, name, age):
        # กำหนดค่าเริ่มต้นให้ attributes ผ่าน Setter เพื่อให้มีการตรวจสอบข้อมูล
        self.set_name(name)
        self.set_age(age)

    # 2) Getter Method: ใช้สำหรับอ่านค่า attribute
    # การตั้งชื่อตามรูปแบบทั่วไปคือ get_ชื่อAttribute()
    def get_name(self):
        return self.__name

    def get_age(self):
        return self.__age

    # 3) Setter Method: ใช้สำหรับกำหนดค่า attribute ใหม่
    # การตั้งชื่อตามรูปแบบทั่วไปคือ set_ชื่อAttribute(value)
    # และมักจะมีการตรวจสอบข้อมูลก่อนบันทึก เช่น เช็คชนิดข้อมูลหรือค่าไม่ให้ผิด
    def set_name(self, name):
        # ตรวจสอบว่า name ต้องเป็นข้อความ (string)
        if isinstance(name, str) and name.strip() != "":
            self.__name = name
        else:
            raise ValueError("Name ต้องเป็นข้อความที่ไม่ว่างเปล่า")

    def set_age(self, age):
        # ตรวจสอบว่า age ต้องเป็นตัวเลขและมีค่า >= 0
        if isinstance(age, int) and age >= 0:
            self.__age = age
        else:
            raise ValueError("Age ต้องเป็น integer และมากกว่าหรือเท่ากับ 0")

    # 4) Method อื่น ๆ สำหรับแสดงข้อมูล
    def display_info(self):
        print(f"Student Name: {self.get_name()}")
        print(f"Student Age: {self.get_age()}")


# -----------------------------------------------------------------------------
# การใช้งานจริงของ Setter / Getter
# -----------------------------------------------------------------------------

# สร้าง object โดยส่งค่าเริ่มต้นให้ constructor
student1 = Student("Alice", 20)

# อ่านค่าจาก Getter
print("Name:", student1.get_name())
print("Age:", student1.get_age())

# เปลี่ยนค่าใหม่ผ่าน Setter
student1.set_name("Bob")
student1.set_age(22)

# แสดงข้อมูลหลังจากเปลี่ยนค่า
print("\nAfter update:")
student1.display_info()

# -----------------------------------------------------------------------------
# ตัวอย่างการใช้ Setter ที่ผิด (จะทำให้เกิด Error)
# -----------------------------------------------------------------------------
# student1.set_age(-5)     # จะ Error เพราะ age ต้อง >= 0
# student1.set_name(123)   # จะ Error เพราะ name ต้องเป็น string


# -----------------------------------------------------------------------------
# อธิบายโครงสร้างการเขียน Setter / Getter แบบง่าย
# -----------------------------------------------------------------------------
# 1. class Student:
#    - เป็นคลาสที่สร้างวัตถุ (object) สำหรับนักเรียน
#
# 2. def __init__(self, name, age):
#    - เป็น constructor
#    - ทำงานตอนสร้าง object
#    - ใช้ self.set_name(name) และ self.set_age(age)
#
# 3. def get_name(self):
#    - เป็น Getter
#    - ใช้ return เพื่อคืนค่าของ attribute ที่ต้องการอ่าน
#
# 4. def set_name(self, name):
#    - เป็น Setter
#    - ใช้รับค่าเข้ามาแล้วตรวจสอบก่อนกำหนดค่า
#    - ถ้าข้อมูลไม่ถูกต้องให้ raise ValueError
#
# 5. self.__name และ self.__age:
#    - เป็น private attributes
#    - ใช้ double underscore เพื่อป้องกันการเข้าถึงจากภายนอกโดยตรง
#
# 6. display_info():
#    - เป็น method ที่แสดงผลข้อมูลนักเรียนออกมา
# -----------------------------------------------------------------------------

# -----------------------------------------------------------------------------
# สรุปสั้น ๆ
# -----------------------------------------------------------------------------
# Setter = ใช้กำหนดค่า
# Getter = ใช้อ่านค่า
# การใช้ Setter/Getter จะช่วยให้โค้ดมีความปลอดภัยและอ่านง่ายกว่า
# -----------------------------------------------------------------------------


# ---------------------------
# Setter/Getter: Demo
# ---------------------------

class Employee:
    """คลาสตัวอย่างการใช้ Setter / Getter"""

    def __init__(self, name, salary, department):
        self.set_name(name)
        self.set_salary(salary)
        self.set_department(department)

    # Getter Methods
    def get_name(self):
        return self.__name

    def get_salary(self):
        return self.__salary

    def get_department(self):
        return self.__department

    # Setter Methods
    def set_name(self, name):
        if isinstance(name, str) and name.strip() != "":
            self.__name = name
        else:
            raise ValueError("Name ต้องเป็นข้อความที่ไม่ว่างเปล่า")

    def set_salary(self, salary):
        if isinstance(salary, (int, float)) and salary >= 0:
            self.__salary = salary
        else:
            raise ValueError("Salary ต้องเป็นตัวเลขและมากกว่าหรือเท่ากับ 0")

    def set_department(self, department):
        if isinstance(department, str) and department.strip() != "":
            self.__department = department
        else:
            raise ValueError("Department ต้องเป็นข้อความที่ไม่ว่างเปล่า")

    # Public method to display employee data
    def show_data(self):
        print(f"Employee Name = {self.get_name()}")
        print(f"Employee Salary: {self.get_salary()}")
        print(f"Employee Department: {self.get_department()}")


# วิธีการใช้งาน Setter / Getter ของ Employee
employee_1 = Employee("DaDA", 50000, "IT")
employee_2 = Employee("Max", 60000, "HR")
employee_3 = Employee("Kimi", 70000, "Finance")

# แสดงข้อมูลพนักงาน
employee_1.show_data()
employee_2.show_data()
employee_3.show_data()
