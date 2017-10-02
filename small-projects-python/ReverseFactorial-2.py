#PythonTemplate
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on 2/27/17

@author: davecohen

Title: Reverse Factorial - Checks reverse factorials of integers > 0. Example: 120 = 5! 150 doesn't have a factorial
"""
'''[2016-10-03] Challenge #286 [Easy] Reverse Factorial
Nearly everyone is familiar with the factorial operator in math. 5! yields 120 because factorial means "multiply successive terms where each are one less than the previous":
5! -> 5 * 4 * 3 * 2 * 1 -> 120
Simple enough.
Now let's reverse it. Could you write a function that tells us that "120" is "5!"?
Hint: The strategy is pretty straightforward, just divide the term by successively larger terms until you get to "1" as the resultant:
120 -> 120/2 -> 60/3 -> 20/4 -> 5/5 -> 1 => 5!

Sample Input
You'll be given a single integer, one per line. Examples:
120
150

Sample Output
Your program should report what each number is as a factorial, or "NONE" if it's not legitimately a factorial. Examples:
120 = 5!
150   NONE

Challenge Input
3628800
479001600
6
18

Challenge Output
3628800 = 10!
479001600 = 12!
6 = 3!
18  NONE
'''
import math

def check_factorial(n):
    '''function checks if integer ans (which is > 0) has an integer factorial
    '''
    x = 2
    ans = n
    if ans < 2:
        x = 1

    for x in range(x,ans):
        ans = ans/x
        if ans <=1: break

    if ans == math.floor(ans):
        print('{} = {}!'.format(n,x))
    else:
        print('{} has no reverse factorial.'.format(n))

print('\nSAMPLE REVERSE FACTORIALS\n')
check_factorial(1)
check_factorial(2)
check_factorial(3)
check_factorial(4)
check_factorial(5)
check_factorial(120)
check_factorial(150)
check_factorial(3628800)
check_factorial(479001600)
check_factorial(6)
check_factorial(18)

userCheck = int(input('\nInput an integer > 0 to check it\'s factorial: '))
check_factorial(userCheck)

'''
OUTPUT:
1 = 1!
2 = 2!
3 NONE
4 NONE
5 NONE
120 = 5!
150 NONE
3628800 = 10!
479001600 = 12!
6 = 3!
18 NONE
'''
