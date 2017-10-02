###Automate tbs. 
'''
Filling in the Gaps

Write a program that finds all files with a given prefix, such as spam001.txt, spam002.txt, and so on, in a single folder and locates any gaps in the numbering (such as if there is a spam001.txt and spam003.txt but no spam002.txt). Have the program rename all the later files to close this gap.

As an added challenge, write another program that can insert gaps into numbered files so that a new file can be added.
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
userPath = input('Input a path to create "spam" subfolder.')
spampath = create_subfolder(userPath)

# create spam00x files (unnecessary if files exist)
for i1 in range(12):
    if i1 == 6: continue        #we're skipping spam006.txt
    num000 = ('{num:03d}'.format(num=i1))   # create formatted 00x numbers
    spamfile = open(''.join((spampath, 'spam', num000, '.txt')), 'w')
    spamfile.close()

'''
# pause (only for testing)
print('Pause - check if files were created.')
pause = input('...enter to continue ')
'''

#initialize
num0 = 0
num000 = ('{num:03d}'.format(num=num0))

spamlist = listdir(spampath)

for i2, file in enumerate(spamlist):
    if file.startswith('spam'):        
        spamnew = ''.join((file[:-7], num000, '.txt'))
        if spamnew != file:
            move(p.join(spampath, file), p.join(spampath, spamnew))
        num0 += 1
        num000 = ('{num:03d}'.format(num=num0))
            
print('Files were successfully renumbered.')
'''
'''