import pymongo
import json
myclient = pymongo.MongoClient()
db = myclient.EMD
collection = db.exames
with open('emd.json') as file:
    file_data = json.load(file)
    for i in file_data:
        collection.insert_one(i)

