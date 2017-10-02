# This is an attempt to make a guess the number game object-oriented.
# Original (non-OOP) version by Al Sweigart: https://inventwithpython.com/chapter4.html
# Thanks to a helpful redditor: https://www.reddit.com/r/learnpython/comments/6u68lm/converted_a_simple_guessing_game_to/

import random

class Game:
    def __init__(self, high_num, myName):
        self.high_num = high_num
        self.myName = myName
        self.guessesTaken = 0
        self.number = random.randint(1, self.high_num)
        self.guess = None

    def get_guess(self):
        print('Take a guess.')
        try:
            self.guess = int(input())
        except ValueError:
            print('Not a valid guess.')
            return False
            
        return True

    def play(self):
        print('Well, {},  I am thinking of a number between 1 and {}.'
            .format(self.myName, self.high_num))
        while self.guessesTaken < 6:
            if not self.get_guess():
                continue
            # else: self.guess gets changed in get_guess function

            self.guessesTaken += 1
        
            if self.guess < self.number:
                print('Your guess is too low.')
        
            if self.guess > self.number:
                print('Your guess is too high.')
        
            if self.guess == self.number:
                break

        if self.guess == self.number:
            print('Good job, {}! You guessed my number in {} guesses!'
                .format(self.myName, self.guessesTaken))
        else:
            print('Nope. The number I was thinking of was', self.number)

def main():
    print('Hello! What is your name?')
    myName = input()
    print("Right on, {}! We've got 2 brands of game here.".format(myName))

    while True:
        print('Type 1 for easy or 2 for difficult guessing game. Type q to quit.')
        user_choice = input()

        if user_choice.lower().startswith('q'):
            print("Goodbye!")
            break

        try:
            user_choice = int(user_choice)
            if user_choice not in [1,2]:
                continue
        except ValueError:
            continue

        if user_choice == 1:
            # make easy game
            easy_game = Game(20, myName)
            # play easy game
            easy_game.play()
            
        elif user_choice == 2:
            # make difficult game
            diff_game = Game(30, myName)
            # play difficult game
            diff_game.play()

        print("\nHow about another?")


# if __name__ == 'main':
#     main()

main()
