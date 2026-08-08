# Variable scope &Return Keyword

balance=1000 #global
def displayBalance():
    print("Account balance", balance ,"THB")

def deposit(value):
    global balance
    money=value #local
    if(money<=0):
        print("Invalid deposit amount")
        return
    print("Depositing", money ,"THB")
    balance+=money

def withdraw(value):
    global balance
    amount=value
    if(amount<=0):
        print("Invalid withdrawal amount")
        return
    if(amount>balance):
        print("Insufficient funds")
        return
    print("Withdrawing", amount ,"THB")
    balance-=amount

displayBalance()
deposit(111)
displayBalance()
withdraw(112)
displayBalance()


