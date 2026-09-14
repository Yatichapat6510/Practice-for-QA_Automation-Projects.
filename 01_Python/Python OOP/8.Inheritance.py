# Inheritance (การสืบทอดคุณสมบัติ)
# คลาสลูกจะสืบทอดคุณสมบัติและเมธอดจากคลาสแม่
# ใช้หลักการนี้เพื่อให้โค้ด reusable, อ่านง่าย และลดการเขียนซ้ำ

# 1) คลาสแม่ (Parent Class)
class Animal:
    # __init__ คือ constructor ใช้กำหนดค่าเริ่มต้นของ Object
    # self.name และ self.species เป็นคุณสมบัติที่ทุกสัตว์มีร่วมกัน
    def __init__(self, name, species):
        self.name = name
        self.species = species

    # เมธอด make_sound เป็นโครงสร้างพื้นฐานที่คลาสลูกต้อง override
    # ถ้าไม่ override จะได้ค่า pass (ไม่มีเสียง)
    def make_sound(self):
        pass

    # เมธอดแสดงข้อมูลพื้นฐานของสัตว์
    def show_info(self):
        print(f"Name: {self.name}")
        print(f"Species: {self.species}")


# 2) คลาสลูก (Child Class) ที่สืบทอดจาก Animal
class Dog(Animal):
    # Dog มีข้อมูลเพิ่มเติมคือ breed
    def __init__(self, name, breed):
        # super() ใช้เรียก constructor ของคลาสแม่
        # โดยส่งค่า name และ "Dog" ให้ Animal
        super().__init__(name, "Dog")
        self.breed = breed

    # override เมธอด make_sound เพื่อกำหนดเสียงเฉพาะของ Dog
    def make_sound(self):
        return "Woof!"

    # override เมธอด show_info เพื่อแสดงข้อมูลเพิ่มเติมของ Dog
    def show_info(self):
        super().show_info()  # เรียกเมธอดของคลาสแม่ก่อน
        print(f"Breed: {self.breed}")


class Cat(Animal):
    # Cat มีข้อมูลเพิ่มเติมคือ color
    def __init__(self, name, color):
        super().__init__(name, "Cat")
        self.color = color

    # override เมธอด make_sound เพื่อกำหนดเสียงเฉพาะของ Cat
    def make_sound(self):
        return "Meow!"

    # override เมธอด show_info เพื่อแสดงข้อมูลเพิ่มเติมของ Cat
    def show_info(self):
        super().show_info()  # เรียกเมธอดของคลาสแม่ก่อน
        print(f"Color: {self.color}")


# 3) การสร้าง Object / Instance
# object dog1 จะมีคุณสมบัติ name, species, breed
# object cat1 จะมีคุณสมบัติ name, species, color
print("=" * 60)
print("Inheritance Example")
print("=" * 60)

dog1 = Dog("Buddy", "Golden Retriever")
cat1 = Cat("Whiskers", "Tabby")

# 4) การใช้งานและแสดงผล
print("\n=== Dog Info ===")
dog1.show_info()
print(f"Sound: {dog1.make_sound()}")

print("\n=== Cat Info ===")
cat1.show_info()
print(f"Sound: {cat1.make_sound()}")

# -------------------- อธิบายแบบสั้น --------------------
# - Animal: คลาสแม่ ที่เก็บข้อมูลร่วมกันของสัตว์ทุกชนิด
# - Dog, Cat: คลาสลูก ที่สืบทอดจาก Animal และเพิ่มข้อมูลเฉพาะของตัวเอง
# - super(): ใช้เรียกเมธอดหรือ constructor ของคลาสแม่
# - override: การเขียนเมธอดใหม่ในคลาสลูกเพื่อเปลี่ยนพฤติกรรมให้ต่างจากคลาสแม่
# - ประโยชน์: ลดการเขียนซ้ำ, จัดโครงสร้างโปรแกรมให้ชัดเจน, ขยายฟังก์ชันได้ง่าย






# ==========================================
# 1. นิยามคลาสแม่ (Base Class)
# ==========================================
class Employee:
    def __init__(self, emp_id: str, name: str):
        self.emp_id = emp_id
        self.name = name

    def calculate_pay(self) -> float:
        """เมธอดสำหรับ Override ในคลาสลูก"""
        return 0.0

    def get_details(self) -> str:
        return f"[{self.emp_id}] {self.name}"


# ==========================================
# 2. นิยามคลาสลูก (Derived Classes)
# ==========================================
class FullTimeEmployee(Employee):
    def __init__(self, emp_id: str, name: str, monthly_salary: float):
        # ดึงคุณสมบัติแม่ผ่าน super()
        super().__init__(emp_id, name)
        self.monthly_salary = monthly_salary

    def calculate_pay(self) -> float:
        # Override การคำนวณเงินสำหรับพนักงานประจำ
        return self.monthly_salary


class HourlyEmployee(Employee):
    def __init__(self, emp_id: str, name: str, hourly_rate: float, hours_worked: float):
        # ดึงคุณสมบัติแม่ผ่าน super()
        super().__init__(emp_id, name)
        self.hourly_rate = hourly_rate
        self.hours_worked = hours_worked

    def calculate_pay(self) -> float:
        # Override การคำนวณเงินตามชั่วโมงทำงานจริง
        return self.hourly_rate * self.hours_worked


# ==========================================
# 3. การเรียกใช้งาน (Usage & Polymorphism)
# ==========================================
if __name__ == "__main__":
    # สร้าง Object ตัวแทนของพนักงานแต่ละแบบ
    emp1 = FullTimeEmployee(emp_id="FT-001", name="วิภาดา", monthly_salary=35000.0)
    emp2 = HourlyEmployee(emp_id="HR-102", name="กิตติ", hourly_rate=250.0, hours_worked=80)

    # รวบรวม Object ไว้ใน List เดียวกัน (Polymorphism)
    team: list[Employee] = [emp1, emp2]

    # วนลูปประมวลผลการจ่ายเงิน
    print("=== สรุปยอดจ่ายเงินเดือนประจำงวด ===")
    total_payroll = 0.0

    for emp in team:
        pay = emp.calculate_pay()
        total_payroll += pay
        print(f"{emp.get_details()} | ยอดจ่ายสุทธิ: {pay:,.2f} บาท")

    print("-" * 40)
    print(f"รวมค่าใช้จ่ายทั้งหมด: {total_payroll:,.2f} บาท")