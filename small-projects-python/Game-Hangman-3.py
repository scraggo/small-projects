#pythontemplate
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on 3/1/17, 12:31 PM

@author: davecohen

Title: Hangman

===TODO
able to restart the game?
word list
graphics
"""
############
###GAME SETUP
############
import re
import getpass
#Word is prompted by non-game player. This may only work in bash terminal?
word=getpass.getpass("Type a word or phrase for someone else to guess: ")
print("Let's play Hangman!")
prompt = 'Have someone put in a word or phrase for you to guess: '
word = word.upper()
word = re.sub(r'[^\w\s]','',word)
censored = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
hanged = 0
hangman = [
    'The post is built.',
    'The head appears.',
    'The body appears.',
    'First arm up.',
    'Now, the other arm.',
    'First leg up. ONLY ONE MORE GUESS LEFT!',
    '''Now, the other leg.
Sorry, you lose.
GAME OVER''',
    ]

guessed = []
valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
############
###FUNCTIONS
############
def dashword_call():
    '''print dashword from censored'''
    dashword = ''
    for letter in word:
        if letter in censored:
            dashword = dashword + '-'
        else: dashword = dashword + letter
    return dashword

############
###GAME
############
print('{} wrong guesses and you get taken to the gallows!!!'.format(len(hangman)))
print(dashword_call())
while hanged < len(hangman):
    guess = str(input('guess a letter: ')) #in function?
    guess = guess.upper()
    guess = re.sub(r'[^\w\s]','',guess)
    #edit censored without guess:
    if (len(guess) != 1) or (guess not in valid) :
        print('invalid input.')
        print(dashword_call())
        continue
    if guess in guessed:
        print('already guessed.')
        print(dashword_call())
        continue
    if guess in word and guess in censored:
        censored = censored.replace(guess,'')
        print(dashword_call())
    if word == dashword_call():
        print('YOU WIN!!')
        break
    if (guess not in word) and (guess not in guessed):
        print('WRONG GUESS ({}/{}). {}'.format(hanged+1,len(hangman),hangman[hanged]))
        hanged += 1
        if hanged == len(hangman): break
        print(dashword_call())
    guessed.append(guess)
'''
'''
