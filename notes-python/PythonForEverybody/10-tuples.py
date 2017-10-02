#python3
print('Ch10.1 -\nTuples are immutable')
t_no = 'a', 'b', 'c', 'd', 'e'
t_paren = ('a', 'b', 'c', 'd', 'e')
print(t_no == t_paren)
print(t_no is t_paren)
t1 = ('a',)
print(type(t1))
s1 = ('a')
print(type(s1),'<-always include the final comma in a tuple of len 1!')
t_emp = tuple()
print(t_emp)
t_lup = tuple('lupins')
print(t_lup,'<-a string in a tuple function is iterated over the chars of the string')
t5 = ('a', 'b', 'c', 'd', 'e')
print(t5[0],'<- this is like get item 0')
print(t5[1:3])
#t5[0] = 'A' #this yields an error
t5 = ('A',) + t5[1:]
print(t5,'<-this replaced the old t5')

print('\nCh10 -\nComparing tuples')
t012 = (0, 1, 2)
t034 = (0, 3, 4)
print(t012 < t034)
t012 = (0, 1, 200000)
print(t012 < t034)
#---
'''This function sorts text from longest to shortest.'''
txt = 'but soft what light in yonder window breaks'
words = txt.split()
t = list() #empty list
for word in words:
    t.append((len(word), word)) #create a tuple of 2 as list item
t.sort(reverse=True)
res = list() #list of tuples
for length, word in t:
    res.append(word) #appends words in order of length
print(res)
#---

print('\nCh10 -\nTuple assignment')
m = [ 'have', 'fun' ]
x, y = m
print(x,'<- x is roughly equiv to m[0]')
print(y,'<- y is roughly equiv to m[1]')
a, b = 1,2
a, b = b, a
print(a,'<- we swapped the variables')
#---
addr = 'monty@python.org'
uname, domain = addr.split('@')
print(uname)
print(domain)
#---
print('\nCh10 -\nDictionaries and tuples')
d = {'a':10, 'b':1, 'c':22}
t = list(d.items()) #here, we made a list of d.items
print(t)
#---
d = {'a':10, 'b':1, 'c':22}
t = list(d.items())
t.sort()
print(t,'<-sorted!')

print('\nCh10.5 -\nMultiple assignment with dictionaries')
for key, val in list(d.items()):
    print(val, key)
print('^this is what\'s up!')
d = {'a':10, 'b':1, 'c':22}
l = list()
#---
"""The function below creates a reverse sorted tuple from dictionary."""
for key, val in d.items() :
    l.append( (val, key) )
    #print(l)
l.sort(reverse=True)
print(l)
#---
print('\nCh10 -\nUsing tuples as keys in dictionaries')
first = 'd' #input('enter first name: ')
last = 'e' #input('enter last name: ')
number = 3 #input('enter number: ')
directory = {}
directory[last,first] = number #creates the dictionary syntax
for last, first in directory:
  print(first, last, directory[last,first])

print('\nCh10 -\nSo many data types')
print('.sorted: sorted(iterable[, key][, reverse])')
print(sorted([5, 2, 3, 1, 4]))
print(sorted({1: 'D', 2: 'B', 3: 'B', 4: 'E', 5: 'A'}))
student_tuples = [('john', 'A', 15),('jane', 'B', 12),('dave', 'B', 10)]
print(sorted(student_tuples, key=lambda student: student[2]))   # sort by age
print('^woah wtf is lamda?')
#---
print('reversed: reversed(seq) \n Return a reverse iterator. seq must be an object which has a __reversed__() method or supports the sequence protocol (the __len__() method and the __getitem__() method with integer arguments starting at 0).')
student_list = ['jim','sally','greg']
new_list = list(reversed(student_list))
print(reversed(new_list))
print('^I\'m so confused.')


