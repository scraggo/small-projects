#python3
print('All about lists')

print('\n8.1')
tens = [10, 20, 30, 40]
gross = ['crunchy frog', 'ram bladder', 'lark vomit']
nestedlist = ['spam', 2.0, 5, [10, 20]]
print('tens:',tens)
print('gross:',gross)
print('nestedlist:',nestedlist)
print('printing consecutive lists:',tens,gross,nestedlist)

print('\n8.2')
cheeses = ['Cheddar', 'Edam', 'Gouda']
print(cheeses)
print('first cheese:',cheeses[0])
cheeses[0] = 'Mozzarella'
print('now, first cheese:',cheeses[0])
print('Edam' in cheeses)
print('Brie' in cheeses)

print('\n8.3')
for cheese in cheeses:
  print(cheese)
for i in range(len(tens)):
  tens[i] = tens[i] * 2
print("each value in tens * 2:\n",tens)

print('\n8.4')
a = [1, 2, 3]
b = [4, 5, 6]
c = a + b
print("a:",a,"b:",b)
print("concatenated lists:",c)
d = [0] * 4
e = [1, 2, 3] * 3
print("multiplied lists:")
print("d:",d,"e:",e)

print('\n8.5')
t = ['a', 'b', 'c', 'd', 'e', 'f'] 
print(t)
print(t[1:3])
print(t[:4])
print(t[3:])
t_copy = t[:]
t_copy[1:3] = ['x', 'y'] 
print(t_copy)
print(t)

print('\n8.6')
help(t.append)
t_copy2 = t_copy.append('g')
print('you get',t_copy2,'if you print .append AND t_copy is altered!')
t_copy.append('h')
print(t_copy)

help(t.extend)
t1 = ['a', 'b', 'c'] 
t2 = ['d', 'e'] 
print(t1,t2)
t1.extend(t2) 
print(t1)

help(t.sort)
t = ['d', 'c', 'e', 'b', 'a'] 
t.sort()
print(t)
t.sort(reverse=True)
print(t)

print('\n8.7')
help(t.pop)
t = ['a', 'b', 'c'] 
x = t.pop(1) 
print(t) 
print(x)

t = ['a', 'b', 'c'] 
del t[1] 
print(t)
t = ['a', 'b', 'c', 'd', 'e', 'f'] 
del t[1:5] 
print(t)

help(t.remove)
t = ['a', 'b', 'c'] 
t.remove('b') 
print(t)

print('\nch8.8')
nums = [3, 41, 12, 9, 74, 15]
print(nums)
print(len(nums),'elements') 
print(max(nums),'max')
print(min(nums),'min')
print(sum(nums),'total')
print(sum(nums)/len(nums),'average')

print('Averaging program. Type \'done\' when complete.')
total = 0
count = 0
while (True):
    inp = input('Enter a number: ')
    if inp == 'done': break
    try:
      value = float(inp)
      total = total + value
      count = count + 1
    except:
      break
try:
  average = total / count
  print('Average:', average)
except:
  print('division by zero.')
###
print('Averaging program #2. Type \'done\' when complete.')
numlist = list()
while (True):
    inp = input('Enter a number: ')
    if inp == 'done': break
    try:
      value = float(inp)
      numlist.append(value)
    except:
      break
try:
  average = sum(numlist) / len(numlist)
  print('Average:', average)
except:
  print('division by zero.')

print('\nch8.9')
s = 'spam' 
t = list(s) 
print(t)
s = 'pining for the fjords' 
t = s.split() 
print(t) 
print(t[2])

help(s.split)
s = 'spam-jam-in-the-house' 
#the book was wrong!!! see the help file above.
#delimiter = '-'
#print(delimiter.split(t))
spam_jam_list = (s.split(sep="-")) #we can assign this function!
print(spam_jam_list[1])

help(s.join)
t = ['pining', 'for', 'the', 'fjords']
delimiter = ' '
print(delimiter.join(t))

print('\nch8.10')
print('can\'t display...see the trinket module')

print('\nch8.11')
a = 'banana' 
b = 'banana' 
print(a is b)

a = [1, 2, 3] 
b = [1, 2, 3] 
print(a is b)

a = [1, 2, 3] 
b = a 
print(b is a)

print('\nch8.13')
def delete_head(t):
  del t[0]
delete_head(b)
print(b)
#-----------------
#code malfunctions here. copy and paste starting here.

t1 = [1,2]
print(t1)
t2 = t1.append(3) 
print(t1) #.append affected t1
print(t2) #t2 returned None
t3 = t1 + [3]
print(t3) #not what is expected, eh?
print(t2 is t3)


t1 = [1,2]
print(t1)
t2 = t1.append(3) 
print(t1) #.append affected t1
print(t2) #t2 returned None
t3 = t1 + [3]
print(t3) #not what is expected, eh?
print(t2 is t3)

def bad_delete_head(t):
  t = t[1:]              # WRONG!
badlist = [1,2,3,4,5]
bad_delete_head(badlist)
print(badlist,'it\'s unchanged.')

def tail(t):
  return t[1:]
goodlist = [1,2,3,4,5]
changed = tail(goodlist)
print(changed)

#---
print('\nch8.14')
t = ['stuff',1,2,3]
x = 'thing'
t.append([x])          # WRONG!
print(t,'converted x to a list and appended it')
print(x)
print('-'*10)

t = ['stuff',1,2,3]
x = 'thing'
t = t.append(x)        # WRONG!
print(t,' - append returns none')
print(x)
print('-'*10)

t = ['stuff',1,2,3]
x = 'thing'
print(t)
print(x)
# WRONG!
print(t + [x],'this embedded string as last element - probably not expected. but OK according to notes?')
print('-'*10)

t = ['stuff',1,2,3]
x = 'thing'
# WRONG! TypeError: can only concatenate list (not "str") to list
#t = t + x






#exit()






#exit()
