'''
testing helper functions before committing to main file
'''

from hangman_no_hints import *

wordlist = load_words()

def reduceList(myList, num):
    return [word for word in wordlist if len(word) == num]

# print('>>> reduceList tests')
# print(reduceList(wordlist, 2))
# print(reduceList(wordlist, 3))
# print(reduceList(wordlist, 4))
# print(reduceList(wordlist, 5))

def matchLetter(l1, l2):
    l1 = l1.lower()
    if l1 == l2: return True
    elif l1 == '_': return True
    else: return False

print('>>> matchLetter tests')
print(matchLetter('-', 'a')) #True
print(matchLetter('a', 'a')) #True
print(matchLetter('b', 'a')) #False



# def getIndices(word):
#     # indices = []
#     # for i, letter in enumerate(word):
#     #     if letter != '_':
#     #         indices.append(i)
#     # return indices
#
#     return [i for i, letter in enumerate(word) if letter != '_']
#
# print(getIndices('___nk'))

twoList = reduceList(wordlist, 2)
guessWord = '_i'

def letterTally(word):
    #count the letters in w1 and w2, check for match
        #only count letters present in w1
    wordCount = {}
    for letter in word:
        if letter != '_' and letter not in wordCount:
            wordCount.setdefault(letter, 1)
        elif letter != '_' and letter in wordCount:
            wordCount[letter] += 1
    return wordCount

def removeSpaces(word):
    return word.replace(' ', '').strip()

def removeUnderscores(word):
    word = removeSpaces(word)
    return word.replace('_', '')

def match_with_gaps(my_word, other_word):
    my_word = removeSpaces(my_word)
    other_word = removeSpaces(other_word)

    for i, letter in enumerate(my_word):
        if not matchLetter(my_word[i], other_word[i]):
            return False

# https://stackoverflow.com/questions/9323749/python-check-if-one-dictionary-is-a-subset-of-another-larger-dictionary/41579450#41579450
    if not letterTally(my_word).items() <= letterTally(other_word).items():
        return False

    return True

print('>>> match_with_gaps tests')
print(match_with_gaps("a_ _ le", "apple")) #True
print(match_with_gaps("te_ t", "tact")) #False
print(match_with_gaps("a_ _ le", "banana")) # False
print(match_with_gaps("a_ ple", "apple")) # False

def show_possible_matches(my_word):
    my_word = removeSpaces(my_word)
    myList = reduceList(wordlist, len(my_word))
    possible_matches = [other_word for other_word in myList if match_with_gaps(my_word, other_word)]

    if len(possible_matches) > 0:
        for match in possible_matches:
            print(match, end=" ")
        print()

    else: print('No matches found')


print('>>> match_with_gaps tests')
show_possible_matches("t_ _ t")
# tact tart taut teat tent test text that tilt tint toot tort tout trot tuft twit
show_possible_matches("abbbb_ ")
#No matches found
show_possible_matches("a_ pl_ ")
# ample amply

# len(secret_word) = max value for reduceList
