###Automate tbs. 
'''Practice Projects

For practice, write programs to do the following tasks.

1. Comma Code
Say you have a list value like this:
spam = ['apples', 'bananas', 'tofu', 'cats']
Write a function that takes a list value as an argument and returns a string with all the items separated by a comma and a space, with and inserted before the last item. For example, passing the previous spam list to the function would return 'apples, bananas, tofu, and cats'. But your function should be able to work with any list value passed to it.
'''
###without enumerate:
spam = ['apples', 'bananas', 'tofu', 'cats', 'dogs', 'etc']
sentence = ''
lastindex = len(spam)-1
for item in spam:
    if item != spam[lastindex]:
        sentence = sentence + '{}, '.format(item)
    else:
        sentence = sentence + 'and {}. '.format(item)
print(sentence)

print('NOW WITH ENUMERATE:')

###with enumerate
spam = ['apples', 'bananas', 'tofu', 'cats', 'dogs', 'etc']
sentence = ''
for n,item in enumerate(spam, start = 1):
    if n < len(spam):
        sentence = sentence + '{}, '.format(item)
    else:
        sentence = sentence + 'and {}. '.format(item)
print(sentence)