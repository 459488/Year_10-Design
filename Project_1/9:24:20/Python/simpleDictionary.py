import json

jString = '{"name":"Felix", "age":20, "city":"Toronto"}'

data = json.loads(jString)

print(data)

for i in data:
    print(i)

for i in data.values():
    print(i)

for i in data.items():
    print(i)

for i in data.items():
    print(i[0] + ", " + str(i[1]))