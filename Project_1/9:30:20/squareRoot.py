import math

maximum = 10
deficient = []
abundant = []
perfect = []

def sumOfFactors(i):
    factors = []
    for k in range(1, int(math.sqrt(i))):
        check = i % k
        if check == 0:
            if i / k == k:
                factors.append(k)
            else:
                factors.append(k)
                factors.append(i / k)
    print(factors)

    total = 0
    for number in factors:
        total += number

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