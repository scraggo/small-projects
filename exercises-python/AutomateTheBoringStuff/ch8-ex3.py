###Automate tbs. 
'''
Practice Projects

For practice, design and write the following programs.

Regex Search

Write a program that opens all .txt files in a folder and searches for any line 
that matches a user-supplied regular expression. 
The results should be printed to the screen.
'''
import re, os

directory = input('Your directory: ')
# directory = 'my/dir' #change to your directory
os.chdir(directory)
folder = os.listdir(directory)
emailRegex = re.compile(r'''([a-zA-Z0-9._%+-]+@[a-zA-Z.-]+(\.[a-z]{2,4}))''')
for file in folder:
    if not file.endswith('.txt'):
        continue
#     print(file) #debug
    searchfile = open(file)
    for line in searchfile:
        found = emailRegex.search(line)
        if found:
            print(found.group())
    searchfile.close()

'''
'''