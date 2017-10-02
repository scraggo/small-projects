#python3
print('All about dictionaries')

print('\n9 - intro')
eng2sp = {}
eng2sp['one'] = 'uno'
print(eng2sp)
eng2sp = {'one': 'uno', 'two': 'dos', 'three': 'tres'}
print(eng2sp)
print(eng2sp['two'])
print(len(eng2sp))
print('one' in eng2sp)
print('uno' in eng2sp)
vals = list(eng2sp.values()) #creates a list of values?
print(vals) #['uno', 'dos', 'tres']
print('uno' in vals)

print('\n9.1\nHistograms\n')
word = 'brontosaurus' 
d = dict() 
for c in word: 
  if c not in d: 
    d[c] = 1 
  else: 
    d[c] = d[c] + 1 
print(d,'\nmore efficient code below.')

counts = { 'chuck' : 1 , 'annie' : 42, 'jan': 100} 
print(counts.get('jan', 0),'-> jan is in list.') 
print(counts.get('tim', 0),'->tim is not in list.')

word = 'brontosaurus'
d = dict()
for c in word:
    d[c] = d.get(c,0) + 1
print(d)
# help(d.get) #if needed

print('\n9.2')

print('\n9.3')
counts = { 'chuck' : 1 , 'annie' : 42, 'jan': 100}
for key in counts:
    print(key, counts[key])

counts = { 'chuck' : 1 , 'annie' : 42, 'jan': 100}
for key in counts:
    if counts[key] > 10 :
        print(key, counts[key])

counts = { 'chuck' : 1 , 'annie' : 42, 'jan': 100}
lst = list(counts.keys())
print(lst)
lst.sort()
for key in lst:
    print(key, counts[key])        
        

print('\n9.4 Advanced Text Parsing')
#2 ways to do this:
import string
intab = 'aeiou'
outtab = '12345'
s = 'this is string example....wow!!!'
print(s.translate({ord(x): y for (x, y) in zip(intab, outtab)}))
print("Swap vowels for numbers.".translate(str.maketrans('aeiou', '12345')))

print('\n9.5')
counts = { 'chuck' : 1 , 'annie' : 42, 'jan': 100}
print(counts.values())


#exit()
