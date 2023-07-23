import sys
import json
from pddiktipy import api
from pprint import pprint as p

a = api()

data = a.search_by_category('mahasiswa', sys.argv[1])
data = data['mahasiswa'][0]['text']
data = data.split(',')
university = data[1].replace(' PT : ', '')
prodi = data[2].replace(' Prodi: ', '')
name = data[0]
name = name.split('(')
nim = name[1].replace(')', '')
data = "%s, %s, %s, %s" % (name[0], nim, university, prodi)
print(data)