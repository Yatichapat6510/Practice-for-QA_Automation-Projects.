# Named function

def power(base, n):
    return base**n

result = power(2, 2)
print("Result of power function =", result)


# Anonymous function (lambda)

power_lambda = lambda base, n: base**n
result_lambda = power_lambda(3, 3)
print("Result of lambda function =", result_lambda)
