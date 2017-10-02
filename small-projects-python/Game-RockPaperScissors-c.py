#python3

import random
print('\nLet\'s play Rock, Paper, Scissors!\n')
while True :
    compList = ['r', 'p', 's']
    names = ['rock', 'paper', 'scissors']
    draws = ['rr', 'pp', 'ss']
    wins = ['rs', 'pr', 'sp']
    loses = ['rp', 'ps', 'sr']

    #COMPUTER
    computer_opponent = random.randint(0,2)

    #GET USER INPUT
    user_input = input('Choose rock (r), paper (p), or scissors (s). Type (q) to quit.\n').lower()

    #DRAW
    if user_input + compList[computer_opponent] in draws:
        print('Draw. Computer shot {} too.'.format(names[computer_opponent]))
    #WIN
    if user_input + compList[computer_opponent] in wins:
        print('YOU WIN! Computer shot {}.'.format(names[computer_opponent]))
    #LOSE
    if user_input + compList[computer_opponent] in loses:
        print('You lose. Computer shot {}.'.format(names[computer_opponent]))
    #QUIT
    if user_input == 'q':
        break
    if user_input != 'r' and user_input != 'p' and user_input != 's' :
        print('Wait...what?')

print('Thanks for playing!')

'''
TODO:
give choice of best of 3 or 5
add GUI?
'''