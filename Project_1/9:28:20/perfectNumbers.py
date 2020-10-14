limit = 10000
deficient = []
abundant = []
perfect = []

for i in range(1, (limit + 1)):
    
    factors = []
    for k in range(1, i):
        check = i % k
        if check == 0:
            factors.append(k)

    total = 0
    for number in factors:
        total += number
    
    if total < i:
        deficient.append(i)
    elif total > i:
        abundant.append(i)
    else:
        perfect.append(i)
        print("You Found A Perfect Number, " + str(i))
    
print(perfect)