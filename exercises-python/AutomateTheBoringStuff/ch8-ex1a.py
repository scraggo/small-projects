###Automate tbs. 
'''
Practice Projects
For practice, design and write the following programs.
Extending the Multiclipboard

Extend the multiclipboard program in this chapter so that it has a delete
<keyword> command line argument that will delete a keyword from the shelf. Then
add a delete command line argument that will delete all keywords.

USAGE:
python mcb.py save <keyword> - Saves clipboard to keyword.

https://docs.python.org/3.6/library/shelve

(made a version with menu)

'''

#! python3
# mcb.py - Saves and loads pieces of text to the clipboard.
# Usage: python mcb.py save <keyword> - Saves clipboard to keyword.
#        python mcb.py <keyword> - Loads keyword to clipboard.
#        python mcb.py list - Loads all keywords to clipboard.
#        python mcb.py delete <keyword> - deletes keyword from shelf.
#        python mcb.py clear - deletes all keywords from shelf.

import shelve, pyperclip, sys, os

mcbShelf = shelve.open('mcb')

if len(sys.argv) == 3:
# Save clipboard content.
    if sys.argv[1].lower() == 'save':
        mcbShelf[sys.argv[2]] = pyperclip.paste()
# Delete keyword from shelf
    elif sys.argv[1].lower() == 'delete':
        del mcbShelf[sys.argv[2]]

elif len(sys.argv) == 2:
# Delete all keywords from shelf.
    if sys.argv[1].lower() == 'clear':
        os.remove("mcb.db")
        sys.exit()
# List keywords and load content.
    if sys.argv[1].lower() == 'list':
        pyperclip.copy(str(list(mcbShelf.keys())))
    elif sys.argv[1] in mcbShelf:
        pyperclip.copy(mcbShelf[sys.argv[1]])

mcbShelf.close()

'''
ORIGINAL:

#! python3
# mcb.pyw - Saves and loads pieces of text to the clipboard.
# Usage: py.exe mcb.pyw save <keyword> - Saves clipboard to keyword.
#        py.exe mcb.pyw <keyword> - Loads keyword to clipboard.
#        py.exe mcb.pyw list - Loads all keywords to clipboard.

import shelve, pyperclip, sys

mcbShelf = shelve.open('mcb')

# Save clipboard content.
if len(sys.argv) == 3 and sys.argv[1].lower() == 'save':
        mcbShelf[sys.argv[2]] = pyperclip.paste()
elif len(sys.argv) == 2:
# List keywords and load content.
    if sys.argv[1].lower() == 'list':
        pyperclip.copy(str(list(mcbShelf.keys())))
    elif sys.argv[1] in mcbShelf:
        pyperclip.copy(mcbShelf[sys.argv[1]])
    
mcbShelf.close()
'''