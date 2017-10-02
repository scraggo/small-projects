###Automate tbs. 
'''
Deleting Unneeded Files

It’s not uncommon for a few unneeded but humongous files or folders to take up the bulk of the space on your hard drive. If you’re trying to free up room on your computer, you’ll get the most bang for your buck by deleting the most massive of the unwanted files. But first you have to find them.

Write a program that walks through a folder tree and searches for exceptionally large files or folders—say, ones that have a file size of more than 100MB. (Remember, to get a file’s size, you can use os.path.getsize() from the os module.) Print these files with their absolute path to the screen.

[Note: this script skips hidden files, ie, files that start with (.) ]
'''

import os, sys, shutil

def debugP(var,num=1):
    print('dbg',num,':',var)
    d = input('...enter to continue ')

def file_size_check():
    try:
        joined = os.path.join(folderName, filename)
        filesize = os.path.getsize(joined) / 1000000
    except Exception as e:
        print('>>> {}'.format(e))
        return
    if filesize > mb_limit:
        print('{}/{} is greater than {} MB.'.format(folderName, filename, mb_limit))

print('\nList Large Files')
myDir = input('Your directory: ')

mb_limit = 100

for folderName, subfolders, filenames in os.walk(myDir):
#     print('The current folder is ' + folderName)
#     for subfolder in subfolders:
#         print('SUBFOLDER OF ' + folderName + ': ' + subfolder)
    for filename in filenames:
        if filename.startswith('.'): continue #skip hidden files
        file_size_check()

'''
'''