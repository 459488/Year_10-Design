import json

inData = '{"quiz": {"sport": {"q1": {"question": "Which one is a correct team name in NBA?","options": ["New York Bulls","Los Angeles Kings","Golden State Warriros","Houston Rockets"],"answer": "Houston Rockets"}},"math": {"q1": {"question": "5 + 7 = ?","options": ["10","11","12","13"],"answer": "12"},"q2": {"question": "12 - 8 = ?","options": ["1","2","3","4"],"answer": "4"}}}}'

jsonFormat = json.loads(inData)

# print(jsonFormat['quiz']['sport']['q1'])

print(jsonFormat['quiz']['sport']['q1']['question'])
choices = ["a", "b", "c", "d"]
for i in range(len(jsonFormat['quiz']['sport']['q1']['options'])):
    print(choices[i] + ") " + jsonFormat['quiz']['sport']['q1']['options'][i])
print("The correct answer is: d) " + jsonFormat['quiz']['sport']['q1']['answer'])

for i in range(2):
    print("")
    qNumber = "q" + str(i + 1)
    print(jsonFormat['quiz']['math'][qNumber]['question'])
    choices = ["a", "b", "c", "d"]
    for i in range(len(jsonFormat['quiz']['math'][qNumber]['options'])):
        print(choices[i] + ") " + jsonFormat['quiz']['math'][qNumber]['options'][i])
    print("The correct answer is: " + jsonFormat['quiz']['math'][qNumber]['answer'])