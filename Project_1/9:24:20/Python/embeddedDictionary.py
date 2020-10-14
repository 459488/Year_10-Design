import json

jString = '{"name":{"firstName":"Julius", "lastName":"Caesar"}, "address":{"city":"Toronto", "province":"ON"}}'

data = json.loads(jString)

print(data['name'])
print(data['name']['firstName'])
print(data['address'])