# Class Variable vs Instance Variable
# class variable คือ ตัวแปรที่อยู่ภายใน class และใช้ร่วมกันสำหรับทุก Object
# instance variable คือ ตัวแปรที่อยู่ภายใน __init__ และเป็นของแต่ละ Object

class Employee:
    # Class Variable
    company_name = "QA Digital Solutions"
    total_employees = 0

    def __init__(self, name, department, salary):
        # Instance Variable
        self.name = name
        self.department = department
        self.salary = salary

        # เพิ่มจำนวนพนักงานทุกครั้งที่สร้าง Object ใหม่
        Employee.total_employees += 1

    def show_info(self):
        print(f"Name: {self.name}")
        print(f"Department: {self.department}")
        print(f"Salary: {self.salary}")
        print(f"Company: {self.company_name}")
        print("-" * 30)


# สร้าง Object / Instance
emp1 = Employee("Alice", "QA Engineer", 45000)
emp2 = Employee("Bob", "Developer", 60000)
emp3 = Employee("Charlie", "Support", 35000)

# ใช้งาน Instance Variable
print("=== ข้อมูลพนักงาน ===")
emp1.show_info()
emp2.show_info()
emp3.show_info()

# ใช้งาน Class Variable
print("=== Class Variable ===")
print(f"Company Name: {Employee.company_name}")
print(f"Total Employees: {Employee.total_employees}")

# ตัวอย่างการเปลี่ยน Class Variable
Employee.company_name = "QA Academy"
print(f"Updated Company Name: {Employee.company_name}")

# ตัวอย่างการเปลี่ยน Instance Variable เฉพาะ Object นั้น
emp1.salary = 50000
print(f"Salary After Update for {emp1.name}: {emp1.salary}")

# สรุปความแตกต่าง
print("\n=== สรุป ===")
print("- Class Variable: ใช้ร่วมกันทุก Object, ประกาศที่ระดับ class")
print("- Instance Variable: เป็นค่าเฉพาะ object แต่ละตัว, ประกาศที่ __init__")





