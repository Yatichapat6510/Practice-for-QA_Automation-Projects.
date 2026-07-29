#เกมทายเลขลูกเต๋า
# 1, 2, 3, 4, 5, 6

import random # สุ่มเลขลูกเต๋า

myrandom = random.randrange(1, 7) # 1-6

k = 1
correct = False
while k <= 3:
    number = int(input("ป้อนคำตอบของคุณ = "))
    if number < 0:
        break
    correct = (number == myrandom) #true / false

    if not correct:
        if number > myrandom:
            print("น้อยกว่า")
        if number < myrandom:
            print("มากกว่า")

    if correct:
        print("ตอบถูกรับรางวัลไปเลย")
        break
    else:
        print("เสียใจด้วย คุณไม่ได้รางวัล")
    k += 1

if not correct:
    print("เสียใจด้วยนะ ไว้ลองใหม่")
print("เฉลย = ", myrandom)
