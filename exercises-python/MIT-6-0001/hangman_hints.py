#!/usr/bin/python
# -*- coding: utf-8 -*-

# MIT 6.0001 Problem Set 2, hangman.py
#   PART 4 - WITH HINTS
# github.com/scraggo

# Hangman Game
# -----------------------------------
# Helper code
# You don't need to understand this helper code,
# but you will have to know how to use the functions
# (so be sure to read the docstrings!)
import random
import string

WORDLIST_FILENAME = "words.txt"


def load_words():
    """
    Returns a list of valid words. Words are strings of lowercase letters.

    Depending on the size of the word list, this function may
    take a while to finish.
    """
    print("Loading word list from file...")
    # inFile: file
    inFile = open(WORDLIST_FILENAME, 'r')
    # line: string
    line = inFile.readline() # all words are in one line of file
    inFile.close()
    # wordlist: list of strings
    wordlist = line.split()
    print("  ", len(wordlist), "words loaded.")
    return wordlist



def choose_word(wordlist):
    """
    wordlist (list): list of words (strings)

    Returns a word from wordlist at random
    """
    return random.choice(wordlist)

# end of helper code

# -----------------------------------

# Load the list of words into the variable wordlist
# so that it can be accessed from anywhere in the program
wordlist = load_words()


def is_word_guessed(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing; assumes all letters are
      lowercase
    letters_guessed: list (of letters), which letters have been guessed so far;
      assumes that all letters are lowercase
    returns: boolean, True if all the letters of secret_word are in
    letters_guessed;
      False otherwise
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    for letter in secret_word:
        if letter not in letters_guessed:
            return False
    return True

def get_guessed_word(secret_word, letters_guessed):
    '''
    secret_word: string, the word the user is guessing
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string, comprised of letters, underscores (_), and spaces that
    represents which letters in secret_word have been guessed so far.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    dash_word = ''
    for letter in secret_word:
        if letter in letters_guessed:
            dash_word += letter
        else:
            dash_word += '_ '
    return dash_word

def get_available_letters(letters_guessed):
    '''
    letters_guessed: list (of letters), which letters have been guessed so far
    returns: string (of letters), comprised of letters that represents which
    letters have not yet been guessed.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    not_guessed = ''
    x = string.ascii_lowercase
    for letter in x:
        if letter not in letters_guessed:
            not_guessed += letter
    return not_guessed

### MORE HELPER FUNCTIONS
def get_user_guess():
    '''
    gets user input. checks if length == 1 and if in alphabet.
    returns -1 if invalid. returns userGuess otherwise.
    ADDITIONS: if userGuess == '*' then it's returned.
    '''
    userGuess = input('Please guess a letter: ').lower()
    if len(userGuess) != 1:
        return -1
    if userGuess == '*':
        return userGuess
    if not str.isalpha(userGuess):
        return -1
    return userGuess

def display_num_warnings(warnings):
    '''
    Given a number of warnings, a properly formatted display is printed.
    '''
    if warnings > 1 or warnings == 0:
        print('You have {} warnings left: '.format(warnings), end='')
    elif warnings == 1:
        print('You have {} warning left: '.format(warnings), end='')
    else:
        print('You have no warnings left so you lose one guess: ', end='')

def penalty(warnings):
    '''
    Given a number of warnings, a penalty is assessed.
    '''
    if warnings < 0:
        return True

#The total score is the number of  guesses_remaining  once the user has
#guessed the  secret_word  times the number of unique letters in  secret_word .
def num_unique_letters(secret_word):
    '''
    Given a secret_word, the number of unique letters is returned.
    '''
    count = 0
    unique = []
    for letter in secret_word:
        if letter not in unique:
            unique.append(letter)
            count += 1
    return count

# HELPER FUNCTIONS FOR HANGMAN WITH HINTS
def reduceList(myList, num):
    '''
    Given a long list of words and num (length of word), a list of words on with
    num length is returned.
    '''
    return [word for word in wordlist if len(word) == num]

def matchLetter(letter1, letter2):
    '''
    given two letters, functions returns True if they match (or the first letter
    is '_') and returns false otherwise.
    '''
    letter1 = letter1.lower()
    if letter1 == letter2: return True
    elif letter1 == '_': return True
    else: return False

def letterTally(word):
    '''
    Given a string (word), a dict which counts letters
    in form of {'a':1, 'b':2} is returned.
    '''
    wordCount = {}
    for letter in word: #use str.isalpha(letter) instead?
        if letter != '_' and letter not in wordCount:
            wordCount.setdefault(letter, 1)
        elif letter != '_' and letter in wordCount:
            wordCount[letter] += 1
    return wordCount

def removeSpaces(word):
    '''
    Given a string (word), a string is returned with all spaces removed.
    '''
    return word.replace(' ', '').strip()

def removeUnderscores(word):
    '''
    Given a string (word), all spaces are removed per removeSpaces, all '_' are
    removed and the string is returned.
    '''
    word = removeSpaces(word)
    return word.replace('_', '')

def match_with_gaps(my_word, other_word):
    '''
    my_word: string with _ characters, current guess of secret word
    other_word: string, regular English word
    returns: boolean, True if all the actual letters of my_word match the
        corresponding letters of other_word, or the letter is the special symbol
        _ , and my_word and other_word are of the same length;
        False otherwise:
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    my_word = removeSpaces(my_word)
    other_word = removeSpaces(other_word)

    for i, letter in enumerate(my_word):
        if not matchLetter(my_word[i], other_word[i]):
            return False

    #This function checks if the letterTally in my_word is found in other_word.
        #Why? if the letters aren't found and the counts are not the same,
        #the word is not a possible match.
    # https://stackoverflow.com/questions/9323749/python-check-if-one-dictionary-is-a-subset-of-another-larger-dictionary/41579450#41579450
    if not letterTally(my_word).items() <= letterTally(other_word).items():
        return False

    return True

def show_possible_matches(my_word):
    '''
    my_word: string with _ characters, current guess of secret word
    returns: nothing, but should print out every word in wordlist that matches my_word
             Keep in mind that in hangman when a letter is guessed, all the positions
             at which that letter occurs in the secret word are revealed.
             Therefore, the hidden letter(_ ) cannot be one of the letters in the word
             that has already been revealed.

    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    my_word = removeSpaces(my_word)
    myList = reduceList(wordlist, len(my_word))
    possible_matches = [other_word for other_word in myList if match_with_gaps(my_word, other_word)]

    if len(possible_matches) > 0:
        print('Possible word matches are:')
        for match in possible_matches:
            print(match, end=" ")
        print()

    else: print('No matches found')

### END HELPER FUNCTIONS


def hangman_with_hints(secret_word):
    '''
    secret_word: string, the secret word to guess.

    Starts up an interactive game of Hangman.

    * At the start of the game, let the user know how many
      letters the secret_word contains and how many guesses s/he starts with.

    * The user should start with 6 guesses

    * Before each round, you should display to the user how many guesses
      s/he has left and the letters that the user has not yet guessed.

    * Ask the user to supply one guess per round. Make sure to check that the user guesses a letter

    * The user should receive feedback immediately after each guess
      about whether their guess appears in the computer's word.

    * After each guess, you should display to the user the
      partially guessed word so far.

    * If the guess is the symbol *, print out all words in wordlist that
      matches the current guessed word.

    Follows the other limitations detailed in the problem write-up.
    '''
    # FILL IN YOUR CODE HERE AND DELETE "pass"
    print('Welcome to the game Hangman!')
    print('Type (*) for a hint.')
    print('I am thinking of a word that is {} letters long.'.format(len(secret_word)))
    print('-------------')
    guessNum = 6
    letters_guessed = ''
    warnings = 3
    while True:
        print('You have {} guesses left.'.format(guessNum))
        print('Available letters: ', get_available_letters(letters_guessed))

        userGuess = get_user_guess() #function returns -1 if invalid

        if userGuess == -1:
            warnings -= 1
            print('Oops! That is not a valid letter. ', end='')
            display_num_warnings(warnings)
            if penalty(warnings): guessNum -= 1

        elif userGuess == '*':
            show_possible_matches(get_guessed_word(secret_word, letters_guessed))

        elif userGuess in letters_guessed:
            warnings -= 1
            print('Oops! You\'ve already guessed that letter. ', end='')
            display_num_warnings(warnings)
            if penalty(warnings): guessNum -= 1

        else:
            letters_guessed += userGuess

            if userGuess in secret_word:
                print('Good guess! ', end='')
            else:
                print('Oops! That letter is not in my word: ', end='')
                if userGuess in 'aeiou': #Vowels lose 2 guesses!
                    guessNum -= 2
                else:
                    guessNum -= 1

        print(get_guessed_word(secret_word, letters_guessed))
        print('-------------')

        if is_word_guessed(secret_word, letters_guessed):
            score = (guessNum) * num_unique_letters(secret_word)
            print('Congratulations, you won!')
            print('Your total score for this game is: {}'.format(score))
            break

        if guessNum <= 0:
            print('Sorry, you ran out of guesses. The word was: {}.'.format(secret_word))
            break


# -----------------------------------


# When you've completed your hangman_with_hint function, comment the two similar
# lines above that were used to run the hangman function, and then uncomment
# these two lines and run this file to test!
# Hint: You might want to pick your own secret_word while you're testing.


if __name__ == "__main__":
    # pass

    # To test part 2, comment out the pass line above and
    # uncomment the following two lines.

    # secret_word = choose_word(wordlist)
    # hangman(secret_word)


###############

    # To test part 3 re-comment out the above lines and
    # uncomment the following two lines.

    secret_word = choose_word(wordlist)
    hangman_with_hints(secret_word)
