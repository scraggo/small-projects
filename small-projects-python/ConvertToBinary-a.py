#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on 3/6/17, 11:42 PM

@author: davecohen

Title: Convert to Binary

https://www.reddit.com/r/dailyprogrammer/comments/5xu7sz/20170306_challenge_305_easy_permutation_base/

"""
#define main function
def base10tobase2(base10in):
    base10 = abs(base10in)
    base2string = ''
    Loop = True
    if base10 >= 0:
        while Loop:
    #         print(base10,' ', end='') #debug
            base2digit = base10%2
    #         print(base2digit) #debug
            base10 //= 2
            base2string = str(base2digit) + base2string
            if base10 < 1: break
        if base10in < 0:
            base2string = '-' + base2string
    base2 = int(base2string)
    print(base2)

# Get user input
Loop = True
while Loop:
    print('''Input your decimal (denary / base10) number to convert to binary (base 2):
        Can be <= 0.
        'q' to quit.''')
    base10in = input('> ')
    if base10in == 'q':
        break
    try:
        base10in = int(base10in)
        # execute
        base10tobase2(base10in)
    except:
        print('Invalid input.')
# execute
# base10tobase2(base10in)

lists = []
# lists = [[1,2],[3,4],[5,6]]

for list in lists:
    input, output = list
    print('Decimal, Binary: {}, {}'.format(input,output))
    
'''
'''