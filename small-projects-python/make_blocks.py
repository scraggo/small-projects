#!/usr/bin/env python3
"""
Converts multi-line text into a list of lists (blocks).
all blank lines are removed.
"""

__author__ = "github.com/scraggo"

def block_encoder(text):
    '''
    Args:
        text: string, multiple lines
    Returns:
        list of lists (see module docstring)
    '''
    text_array = text.split('\n')
    block_array = []

    for line in text_array:
        #initializing the block delineator for empty list
        if len(block_array) <= 0:
            block_index = 0

        #if line is blank, it's a block delineator
        if len(line.strip()) <= 0:
            #this check is performed every time there's a blank line
            #possible index error squashed by the change detector (later)
            if len(block_array) > 0:
                block_index += 1
        else:
            #else, line has content and it's part of a 'block'

            if len(block_array) <= 0:
                #append the very first 'block', a list with first line
                block_array.append([line])

            else:
            #start/append new 'block' value OR add to last block
                if block_index > len(block_array) - 1:
                    # detect change and start a new block
                    block_array.append([line])
                    # reset block_index
                    block_index = len(block_array) - 1
                    #continue
                else:
                    #else, add to last block
                    block_array[block_index].append(line)

    return block_array
