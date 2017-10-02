#python3
"""
Byte of Python Notes
"""
print('All about functions')
#--GLOBAL STATEMENTS IN FUNCTIONS
x = 50
def funcg():
    global x #as opposed to local 
    print('x is', x)
    x = 2
    print('Changed global x to', x)
funcg()
print('Value of x is', x)
#DEFAULT ARGUMENTS
def say(message, times=1):
    print(message * times)

say('Hello') #default set to 1
say('World', 5)
#KEYWORD ARGUMENTS
def func(a, b=5, c=10):
    print('a is', a, 'and b is', b, 'and c is', c)

func(3, 7) #c is 10 by default 
func(25, c=24) #a and c were defined
func(c=50, a=100) #a and c were defined
print("-"*10)
#VARARGS PARAMETERS
print("""Sometimes you might want to define a function that can take any number of parameters, i.e. variable number of arguments, this can be achieved by using the stars* **""")
def total(a=5, *numbers, **phonebook):
    print('a', a)
    #iterate through all the items in tuple
    for single_item in numbers:
        print('single_item', single_item)
    #iterate through all the items in dictionary    
    for first_part, second_part in phonebook.items():
        print(first_part,second_part)

print(total(10,1,2,3,Jack=1123,John=2231,Inge=1560))
#a 10 - first parameter defined
#single_item 1,2,3 - see the first loop
#how is Jack=1123, etc a dictionary????
print("""How It Works
When we declare a starred parameter such as *param, then all the positional arguments from that point till the end are collected as a tuple called 'param'.
Similarly, when we declare a double-starred parameter such as **param, then all the keyword arguments from that point till the end are collected as a dictionary called 'param'.""")
print('DICTIONARY AS ARGUMENT. \nhow it works:')
def foo(**args):
  print(args)

foo(a=1, b=2)
#---
print("-"*10)
def print_max(x, y):
    '''Prints the maximum of two numbers.

    The two values must be integers.'''
    # convert to integers, if possible
    x = int(x)
    y = int(y)

    if x > y:
        print(x, 'is maximum')
    else:
        print(y, 'is maximum')

print_max(3, 5)
print(print_max.__doc__) #this is cool! always format docstrings like above.