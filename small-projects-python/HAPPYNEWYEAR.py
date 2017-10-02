#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
SOLUTION TO
HA^PPY = NEW + YEAR

(MIT Math Challenge)

Brute force approach:
    assign exclusive random numbers to each digit and test each solution.
'''

import random

def addletters():
    #create list of numbers as strings
    digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    #letters (will match indices to digits)
    letters = ['H', 'P', 'N', 'Y', 'A', 'E', 'W', 'R']

    random.shuffle(digits)

    HA = int(digits[0] + digits[4])
    PPY = int(digits[1] + digits[1] + digits[3])
    NEW = int(digits[2] + digits[5] + digits[6])
    YEAR = int(digits[3] + digits[5] + digits[4] + digits[7])

    if HA**PPY == NEW + YEAR:
        print('HA: {}\nPPY: {}\nNEW: {}\nYEAR: {}'.format(HA, PPY, NEW, YEAR))
        return False
    else: return True

print("WARNING: THIS MAY RUN FOR A LONG TIME. HIT 'STOP' IF YOU GET TIRED OF WAITING.\n")
print('Solution to HA^PPY = NEW + YEAR:')
while addletters():
    pass
