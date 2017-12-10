# Name: Flora Boudewijnse
# Student number: 10196153
# Function converts csv to json.

import json
import csv

# import csv file
input_file = open("zuid-holland.csv", "r")
columns = ["party", "votes", "seats", "percentage"]
reader = csv.DictReader(input_file, fieldnames = columns)

# write jsonfile
jsonfile = open("zuid-holland.json", "w")
data = []

for row in reader:
    data.append(row)

json.dump(data, jsonfile, indent = 4)
