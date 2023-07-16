from rdflib import Dataset

path = "政治.ru"
with open(path, 'r') as f:
    update = f.read()

print(update)

d = Dataset()
d.update(update)

for s, p, o, g in d:
    print(s, p, o, g)
