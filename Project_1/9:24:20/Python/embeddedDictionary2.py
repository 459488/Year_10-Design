import json

jString = '[{"name":{"firstName":"Cleopatra", "lastName":"Ptolemy"}, "address":{"city":"Alexandria", "province":"Egypt"}}, {"name":{"firstName":"Marc", "lastName":"Antony"}, "address":{"city":"Rome", "province":"Italia"}}]'

data = json.loads(jString)

# print(data[0]['name'])
# print(data[0]['name']['firstName'])
# print(data[0]['address'])

for i in data:
	print (i['name'])

for i in data:
	print (i['name']['lastName'] + ", " + i['name']['firstName'])