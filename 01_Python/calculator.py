def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        raise ValueError("Cannot divide by zero")
    return x / y

def power(x, y):
    return x ** y

def modulo(x, y):
    if y == 0:
        raise ValueError("Cannot modulo by zero")
    return x % y

def calculate(x, y, operator):
    if operator == "+":
        return add(x, y)
    if operator == "-":
        return subtract(x, y)
    if operator == "*":
        return multiply(x, y)
    if operator == "/":
        return divide(x, y)
    if operator == "**":
        return power(x, y)
    if operator == "%":
        return modulo(x, y)
    raise ValueError(f"Unsupported operator: {operator}")

