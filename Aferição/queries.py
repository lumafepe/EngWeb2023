import pymongo
import json
myclient = pymongo.MongoClient()
db = myclient.EMD
collection = db.exames

print("1:")
print(len(collection.distinct("_id")))
print("2:")
print(len(list(collection.find({"resultado":True }))))
print("3:")
print(list(collection.aggregate([
  {
    '$group': {
      '_id': '$género',
      'count': {
        '$sum': 1
            }
    }
  }
])))
print("4:")
print(list(collection.aggregate([
  {
    '$group': {
      '_id': '$modalidade',
      'count': {
        '$sum': 1
            }
    }
  }
])))
print("5:")
print(len(list(collection.find({"federado":True,"clube":"GDGoma"}))))
print("6:")
print(len(list(collection.find({"género":"F","modalidade": "Triatlo"}))))



