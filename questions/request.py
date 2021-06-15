import requests
import json

filesNum = int(input("How many text files? "))
questionNum = input("How many questions per text file? ")

for file in range(filesNum):
	link = "https://www.randomtriviagenerator.com/questions?limit=" + questionNum
	response = requests.get(link)
	data = response.json()
	newData = []

	for card in data:

		try:
			newData.append({
				"id": card["_id"],
				"question": card["question"],
				"answer": card["answer"],
				"category": card["categories"][0]
			})
		except AttributeError:
			print("AttributeError")
		except KeyError:
			print("KeyError")

	fileName = "set" + str(file) + ".txt"
	with open(fileName, 'w') as f:
		f.write(json.dumps(newData))
	
	print("Created " + fileName + "\n")