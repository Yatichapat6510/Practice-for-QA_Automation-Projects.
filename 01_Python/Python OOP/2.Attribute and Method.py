# Attribute and Method
# - Attribute: ข้อมูลที่เก็บอยู่ใน Object เช่น make, model, year
# - Method: ฟังก์ชันที่อยู่ใน Class ใช้ทำงานกับ Object เช่น display_info()

class Car:
    # __init__ เป็น Constructor ใช้กำหนดค่าเริ่มต้นของ Object
    def __init__(self, make, model, year):
        self.make = make   # Attribute
        self.model = model # Attribute
        self.year = year   # Attribute

    # Method: แสดงข้อมูลรถ
    def display_info(self):
        print(f"Car: {self.year} {self.make} {self.model}")

    # Method: คำนวณอายุรถแบบง่าย
    def car_age(self, current_year):
        return current_year - self.year


# สร้าง Object จาก Class Car
car1 = Car("Toyota", "Ativ", 2025)
car2 = Car("Honda", "HR-V", 2025)
car3 = Car("BYD", "Sealion 7", 2025)

# เรียกใช้งาน Method
car1.display_info()
car2.display_info()
car3.display_info()

# ใช้ Attribute และ Method ร่วมกัน
print(f"{car1.make} อายุ {car1.car_age(2026)} ปี")
print(f"{car2.make} อายุ {car2.car_age(2026)} ปี")
print(f"{car3.make} อายุ {car3.car_age(2026)} ปี")

