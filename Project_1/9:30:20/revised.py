maximum = 10000
deficient = []
abundant = []
perfect = []

def sumOfFactors(i):  
    total = 1
    for k in range(2, i):
        check = i % k
        if check == 0:
            total += k
    return total

for i in range(1, (maximum + 1)):
    if sumOfFactors(i) < i:
        deficient.append(i)
    elif sumOfFactors(i) > i:
        abundant.append(i)
    else:
        perfect.append(i)
        print("You Found A Perfect Number, " + str(i))

print(perfect)