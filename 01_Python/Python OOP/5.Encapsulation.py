# --------------------------------------------------
# Access Modifiers: Public, Protected, Private
# --------------------------------------------------
# 1) Class Employee -> ตัวอย่างการใช้ attribute แบบ public
# 2) Class AccessDemo -> ตัวอย่าง public / protected / private
# 3) Class BankAccount -> ตัวอย่าง encapsulation + property + validation
# --------------------------------------------------


class Employee:
    # """ตัวอย่าง Object ที่มีข้อมูลแบบ public"""

    def __init__(self, name, salary, department):
        self.name = name
        self.salary = salary
        self.department = department

    def show_data(self):
        print(f"Employee Name = {self.name}")
        print(f"Employee Salary: {self.salary}")
        print(f"Employee Department: {self.department}")


# ---------------------------
# Section 1: Employee Demo
# ---------------------------
employee_1 = Employee("DaDA", 50000, "IT")
employee_2 = Employee("Max", 60000, "HR")
employee_3 = Employee("Kimi", 70000, "Finance")

print("\n=== Employee Demo ===")
employee_1.show_data()
employee_2.show_data()
employee_3.show_data()


# --------------------------------------------------
# Access Modifiers
# Public: เข้าถึงได้จากทุกที่
# Protected: เข้าถึงได้ภายในคลาสและคลาสลูก (ปกติใช้ _ ขึ้นต้น)
# Private: เข้าถึงได้เฉพาะภายในคลาสเท่านั้น (ใช้ __ ขึ้นต้น)
# --------------------------------------------------


class AccessDemo:
    # """แสดงการใช้งาน Public / Protected / Private"""

    def __init__(self, name, age, salary):
        self.name = name          # Public: ใช้งานได้จากทุกที่
        self._age = age           # Protected: ใช้งานได้ภายในคลาสและคลาสลูก
        self.__salary = salary    # Private: ใช้งานได้เฉพาะภายในคลาสนี้เท่านั้น

    def show_public(self):
        print(f"Public name: {self.name}")

    def _show_protected(self):
        print(f"Protected age: {self._age}")

    def __show_private(self):
        print(f"Private salary: ${self.__salary}")

    def display_all(self):
        # """เมธอดนี้เรียกใช้เมธอดทั้งสามแบบภายในคลาส"""
        self.show_public()
        self._show_protected()
        self.__show_private()

    def get_salary(self):
        # """เมธอด public ที่ให้ข้อมูล private กลับมาได้"""
        return self.__salary


class Manager(AccessDemo):
    # """คลาสลูกที่สืบทอดจาก AccessDemo"""

    def __init__(self, name, age, salary, department):
        super().__init__(name, age, salary)
        self._department = department  # Protected attribute ใน subclass

    def show_department(self):
        print(f"Department: {self._department}")
        print(f"Name from parent: {self.name}")


# ---------------------------
# Section 2: Access Modifier Demo
# ---------------------------
print("\n=== Access Modifiers Demo ===")
obj = AccessDemo("Sam", 30, 50000)

print(obj.name)            # OK: public
print(obj._age)            # OK: protected (แต่เป็นการเข้าถึงแบบ convention)
print(obj.get_salary())    # OK: ใช้ public method เพื่ออ่าน private data
# print(obj.__salary)      # Error: AttributeError (private ไม่สามารถเข้าถึงได้โดยตรง)

obj.display_all()

manager = Manager("Jane", 35, 70000, "IT")
manager.show_department()
# print(manager.__salary)    # Error: private ไม่สามารถเข้าถึงจากภายนอกคลาสได้


# --------------------------------------------------
# Encapsulation Example: BankAccount
# --------------------------------------------------


class BankAccount:
    # """คลาสบัญชีธนาคารที่เก็บข้อมูล private และให้เข้าถึงผ่าน property/method"""

    def __init__(self, owner, balance=0):
        self.__owner = owner
        self.__balance = balance

    @property
    def owner(self):
        return self.__owner

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("Balance cannot be negative.")
        self.__balance = amount

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.")
        self.__balance += amount

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.")
        if amount > self.__balance:
            raise ValueError("Insufficient funds.")
        self.__balance -= amount

    def __show_private_details(self):
        return f"Owner: {self.__owner}, Balance: ${self.__balance}"

    def summary(self):
        print(self.__show_private_details())


# ---------------------------
# Section 3: Bank Account Demo
# ---------------------------
account = BankAccount("Alice", 500)
account.deposit(200)
account.withdraw(150)

print("\n=== Bank Account Demo ===")
print(f"Account owner: {account.owner}")
print(f"Current balance: ${account.balance}")
account.summary()

# ไม่อนุญาตให้เข้าถึง private attribute โดยตรง
# print(account.__owner)


