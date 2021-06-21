def sort(line):
    clean = inputData[line].replace(" ", "")
    # remove any spaces
    letters = []
    letters[:0] = clean
    # turn string into list
    for i in range(len(letters)):
        for j in range(len(letters) - i - 1):
            if letters[j] > letters[j + 1]: 
                letters[j], letters[j + 1] = letters[j + 1], letters[j]
                # simultaneous assignment
    return letters

def checkAnagram():
    list1 = sort(0)
    list2 = sort(1)
    if len((list1)) == len((list2)):
    # they must be the same length to be an anagram
        for i in range(len(list1)):
            if list1[i] == list2[i]:
                if i == len(list1) - 1:
                # if done searching through list
                    print("Is an anagram")
            else:
                print("Is not an anagram")
                break
    else:
        print("Is not an anagram")

inputData = []
while True:
    try:
        line = input()
    except EOFError:
        break
    inputData.append(line)
    # separate each line into an item in a list

checkAnagram()