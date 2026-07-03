#โค้ดเดิมเป็น JavaScript แปลงเป็น Python แล้ว

n = 10
str_out = ""

i = n // 2
while i < n:
    j = 1
    while j < n - i:
        str_out += " "
        j += 2
    j = 1
    while j < i + 1:
        str_out += "*"
        j += 1
    j = 1
    while j < n - i + 1:
        str_out += " "
        j += 1
    j = 1
    while j < i + 1:
        str_out += "*"
        j += 1
    str_out += "\n"
    i += 2

i = n
while i > 0:
    j = 0
    while j < n - i:
        str_out += " "
        j += 1
    j = 1
    while j < i * 2:
        str_out += "*"
        j += 1
    str_out += "\n"
    i -= 1

print(str_out)
