# Exception Management in Python

try:
    number1=int(input("Enter first number: "))
    number2=int(input("Enter second number: "))
    if number1<0 or number2<0:
        raise Exception("The numerical data must be positive only!")
    
    result=number1/number2
    print("Result of division =", result)
except ValueError:
    print("Error: Please enter valid integers.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
except Exception as e:
    print("Error:", str(e))
finally:
    print("--------------------")
    print("Execution completed.")
    print("--------------------")
