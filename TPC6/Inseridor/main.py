import requests
import json
 
# Opening JSON file
with open('dataset-extra1.json') as json_file:
    data = json.load(json_file)
    inseridos=0
    for dataline in data['pessoas']:
        dataline['_id']=dataline.pop('id')
        response = requests.post("http://localhost:3000/pessoas",json=dataline)
        if response.status_code!=201:
            print(response.status_code)
            print("problema ao inserir")
            break
        else:
            inseridos+=1
    print(f"Inseridos {inseridos} records")
            