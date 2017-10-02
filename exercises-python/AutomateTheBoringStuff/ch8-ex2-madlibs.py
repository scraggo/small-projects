###Automate tbs. 
'''
3/23/17, 9:48 AM
After many versions...finally got
it!
--------
For practice, design and write the following programs.

Mad
Libs

Create a Mad Libs program that reads in text files and lets the user add
their own text anywhere the word ADJECTIVE, NOUN, ADVERB, or VERB appears in the
text file. For example, a text file may look like this:

The ADJECTIVE panda walked to the NOUN and then VERB. 
A nearby NOUN was unaffected by these events.

The program would find these occurrences and prompt the user to replace
them.

Enter an adjective:
silly
Enter a noun:
chandelier
Enter a
verb:
screamed
Enter a noun:
pickup truck
The following text file would then
be created:

The silly panda walked to the chandelier and then screamed. A
nearby pickup
truck was unaffected by these events.
The results should be
printed to the screen and saved to a new text file.
'''
with open('madlibs.txt', 'r') as f:
    madlib1 = f.read()

#! now in file
# madlib1 = '''The ADJECTIVE panda walked to the NOUN and then VERB. A nearby NOUN was unaffected by these events.'''
madlib1list = madlib1.split()
punclist = ['.',',','!','?']

def puncStrip(word):
    '''get location of punctuation, if any. returns integer or None'''
    for punc in punclist:
        if punc in word:
            ploc = word.find(punc)
            return ploc
    
def displayWord(word, ploc):
    '''Display (print) word without punctuation.
    '''
    if ploc != -1:
        word = word[0:ploc]
    print('Enter a specific for:',word)
    
def replaceWord(userword, ploc):
    '''userword is user entered word. if applicable, we add back the punctuation. new word is returned. (to put into madliblist).
    '''
    if ploc != None:
        word = userword + madlib1list[i][ploc:]
    else: 
        word = userword
    return word
   
i = 0
while True:
    if len(madlib1list[i]) > 1 and madlib1list[i] == madlib1list[i].upper():
        ploc = puncStrip(madlib1list[i])
#         print(ploc) #debug
        displayWord(madlib1list[i], ploc)
        userword = input('-> ')
        madlib1list[i] = replaceWord(userword, ploc)
#         print(madlib1list[i]) #debug
    if i == len(madlib1list)-1: break
    i+=1

madlib_complete = ' '.join(madlib1list)
print(madlib_complete)
print('Saving to new text file \'madlib-1.txt\'...')
with open('madlibs-1.txt', 'w') as f:
    f.write(madlib_complete)
'''
'''