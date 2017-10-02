'''Practice Projects

For practice, write programs to do the following tasks.

Strong Password Detection

Write a function that uses regular expressions to make sure the password string it is passed is strong. A strong password is defined as one that is 
at least eight characters long, 
contains both uppercase and lowercase characters, 
and has at least one digit. 

You may need to test the string against multiple regex patterns to validate its strength.
'''
# at least 8 chars: non-whitespace.         \S
# contains both uppercase and lowercase characters: use a search for letter/upper and letter/lower
# [a-zA-Z]
# and has at least one digit: use a search for digit    \d

import re
def strongPass(password):
    passRegex1 = re.compile(r'\S{8}').search(password)
    passRegex2 = re.compile(r'[a-z]').search(password)
    passRegex3 = re.compile(r'[A-Z]').search(password)
    passRegex4 = re.compile(r'\d').search(password)
    if (passRegex1 and passRegex2 and passRegex3 and passRegex4) != None:
        print('Great - Strong Password.')
    else: 
        print('Weak Password.')

print('Let\'s check the strength of your password.')
while True:
    user_pass = input('Enter your password: (type \'q\' to quit) ')
    if user_pass != 'q':
        strongPass(user_pass)
    elif user_pass == 'q':
        break
