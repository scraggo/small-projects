'''
Exercise 7.11 Write a program that prints a multiplication table for digits 1 to a certain number num (you may assume for the output that num is one digit). A multiplication table for the numbers 1 to num = 3 looks as follows:
. | 1 2 3 
------------ 
1 | 1 2 3       1*x, 1*x, 2*x, 3*x  (x = 1)
2 | 2 4 6       1*x, 1*x, 2*x, 3*x  (x = 2)
3 | 3 6 9       1*x, 1*x, 2*x, 3*x  (x = 3)
So the labels on the rows are multiplied by the labels on the columns, and the result is shown in the cell that is on that row/column combination.
'''

from pcinput import getInteger

def debug(var,num=1):
    print('dbg',num,':',var)
    d = input('...enter to continue ')

#top rows setup
n = 9 #number of columns / rows
print('. |  ',end='')
for x in range(1,n+1):
    print('{:<3}'.format(x),end='')
print('\n-------'+'---'*(n-1))

for x in range(1,n+1):
    print('{:<2}|  '.format(x),end='')
    print('{:<3}'.format(x),end='')
    for y in range(2,n+1):
        print('{:<3}'.format(y*x),end='')
    print()
