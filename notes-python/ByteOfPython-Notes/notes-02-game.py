#python3
"""
Byte of Python Notes
Guess the number game
"""
# print('Guess the number')
import random
def guess_number():
    number = random.randint(0, 50)
    running = True  # kinda cool
    while running:
        guess = int(input('Enter an integer between 0 and 50 : '))

        if guess == number:
            print('Congratulations, you guessed it.')
            # this causes the while loop to stop
            running = False #kinda cool
        elif guess < number:
            print('No, it is a little higher than that.')
        else:
            print('No, it is a little lower than that.')
    else:
        print('The while loop is over.')
        # Do anything else you want to do here
try:
    guess_number()
    print('Done')
except:
    print('Whoops!')