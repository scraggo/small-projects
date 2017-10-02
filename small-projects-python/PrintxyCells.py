"""
Print X Y Cells (see below)

Adapted from 
    Think Python: How to Think Like a Computer Scientist
    Allen B. Downey
    Version 2.0.17
    http://greenteapress.com/thinkpython/html/thinkpython004.html

Exercise 5  
This exercise can be done using only the statements and other features we have learned so far.
Write a function that draws a grid like the following:
+ - - - - + - - - - +
|         |         |
|         |         |
|         |         |
|         |         |
+ - - - - + - - - - +
|         |         |
|         |         |
|         |         |
|         |         |
+ - - - - + - - - - +
Hint: to print more than one value on a line, 
you can print a comma-separated sequence:
print '+', '-'
If the sequence ends with a comma, Python leaves the line unfinished, 
so the value printed next appears on the same line.
print '+', 
print '-'
The output of these statements is '+ -'.
A print statement all by itself ends the current line and goes to the next line.

Write a function that draws a similar grid with four rows and four columns.
Solution: http://thinkpython.com/code/grid.py. 
Credit: This exercise is based on an exercise in Oualline, 
Practical C Programming, Third Edition, O’Reilly Media, 1997.
"""
def print_beam(x) :
  print("+ - - - - " * x, "+")

def print_top(x) :
  print_beam(x)
    #I love using loops to print!
  for s in range(4):
    print("|         " *x,"|")

def print_grid(x,y) :
  for grid in range(y):
      print_top(x)
  print_beam(x)

y = input('Enter num of rows, up to 10: ')
x = input('Enter num of columns, up to 10: ')
try:
  x = int(x)
  y = int(y)
  if (x > 10 or x < 1) or (y > 10 or y < 1):
    print('Error, out of range.')
  else:
    print_grid(x,y)
except Exception as e:
  print('Error, expected 2 integers')