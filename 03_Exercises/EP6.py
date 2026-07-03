#โปรแกรมคำนวณค่า BMI (ดัชนีมวลกาย)
# BMI = น้ำหนัก (kg) / ส่วนสูง * ส่วนสูง (m)

#input / convert to integer
weight=int(input ("ป้อนน้ำหนักของคุณ (kg):"))
high=int(input("ป้อนส่วนสูงของคุณ (cm):"))/100
print("BMI = ",weight/(high**2))

#process

#cm => m
# high/=100
#calculate bmi
# bmi=weight/(high**2)

#output
# print("BMI = ",bmi)