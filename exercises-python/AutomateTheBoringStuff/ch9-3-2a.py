###Automate tbs. 
'''

3-2 = the added challenge!
if you run this twice, you get two gaps. 
everytime you run, you get another gap: 3 times, 3 gaps, etc.

Filling in the Gaps

Write a program that finds all files with a given prefix, such as spam001.txt, spam002.txt, and so on, in a single folder and locates any gaps in the numbering (such as if there is a spam001.txt and spam003.txt but no spam002.txt). Have the program rename all the later files to close this gap.

As an added challenge, write another program that can insert gaps into numbered files so that a new file can be added.
---

'''
import os, shutil
from os import path as p, listdir
from shutil import move

def debugP(*var):
    print('dbg',var)
    d = input('...enter to continue ')

def create_subfolder(new_dest):
    new_sub = new_dest
    if os.path.exists(new_sub) is False:
        os.makedirs(new_sub)
    return new_sub

# spampath should exist if using this function for real
spampath = input('Path to spam folder: ')
spamlist = listdir(spampath)

# where we want to create a gap in the file number (006)
GAP = ('{num:03d}'.format(num=6))

# going in reverse to not overwrite files
for file in reversed(spamlist):
    if file.startswith('spam'):
        #initialize
        num0 = int(file[4:7])
        if file[4:7] >= GAP:
            num000 = ('{num:03d}'.format(num=num0+1))
            spamnew = ''.join((file[:4], num000, '.txt'))
#             print(spamnew)
            move(p.join(spampath, file), p.join(spampath, spamnew))
            num0 -= 1
        else: break
            
print('Files were successfully renumbered.')
'''
'''