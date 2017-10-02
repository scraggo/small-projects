#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created 4/19/17, 11:34 AM

@author: davecohen

Title: Clear Done

Input: text file that has lines that begin with 'x ' (these are done files)
Output: text file that moves those lines to the end of the file with date stamp at top.

USAGE:
Run file with terminal - copy your todo items to clipboard.
Check your directory, "sorted files" for output.

CREATE A CONFIG FILE AS SUCH:
#config.py
myConfig = {'outputdir': 'my/output/path/'}
OR
Simply replace the outputdir line with your output path.
"""
import sys, os
from datetime import datetime

#NON-STANDARD LIBRARY
import pyperclip
#LOCAL MODULE - SEE ABOVE
from config import *

def debugP(var,num=1):
    print('dbg',num,':',var)
    d = input('...enter to continue ')

# MAIN

print('Please copy your todo list text to clipboard. Hit enter when done.')
pause = input('')

#use pyperclip to get clipboard
tododata = pyperclip.paste()

#create a list with clipboard content.
todolist = tododata.split('\n')

donelist = []
tasklist = []
outputdir = myConfig['outputdir'] #configure in a separate file
taskoutput = os.path.join(outputdir, 'sorted-tasks.txt')
doneoutput = os.path.join(outputdir, 'sorted-done.txt')
nowtime = str(datetime.now())

for line in todolist:
    if line.startswith('x '):
        donelist.append(line)
    else:
        tasklist.append(line)

with open(taskoutput, 'a') as f2:
    for taskline in tasklist:
        f2.write(taskline + '\n')

with open(doneoutput, 'a') as f2:
    f2.write(nowtime + '\n')
    for doneline in donelist:
        f2.write(doneline + '\n')

print('Files output to:', taskoutput, '\n', doneoutput)
