i = 1

while i <= 10:
    print (i, end = " ")
    i += 1
print()

for i in range (10, 0, -1):
    print (i)
    i += 1

for i in range (1, 13):
    for j in range (1, 13):
        print ("%5d" % (i * j), end = " ")
    print()