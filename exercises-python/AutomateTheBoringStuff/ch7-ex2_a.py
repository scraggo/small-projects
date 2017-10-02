'''
Practice Projects

For practice, write programs to do the following tasks.

Regex Version of strip()

Write a function that takes a string and does the same thing as the strip() string method. If no other arguments are passed other than the string to strip, then whitespace characters will be removed from the beginning and end of the string. Otherwise, the characters specified in the second argument to the function will be removed from the string.
'''
import re

def regex_strip(s, replace=None): 
    #case 1 - remove spaces at beginning & end
    if replace==None:
        s = re.compile(r'^\s+').sub('', s)
        s = re.compile(r'\s+$').sub('', s)
        print(s)

    #case 2 - substitute chars
    elif replace != None:
        replace_with = ''
        s = re.compile(replace).sub(replace_with, s)
        print(s)

regex_strip('  Hello World!  ')
regex_strip('  Hello World!  ','!')

'''
NOTES:
#strip method: removes leading and trailing whitespace. (if string = argument1, no 2nd arg.)
# ^\s       and \s$
#2nd arg: characters to remove.
#how do I set a regex as the default arg?
#case 1 - remove spaces at beginning/end
strEx = '  Agent Alice gave the \tsecret documents to Agent Bob.\n'
print(strEx) #debug
strEx = re.compile(r'^\s+').sub('', strEx)
strEx = re.compile(r'\s+$').sub('', strEx)
print(strEx) #debug

#case 2 - sub chars
strEx = '  Agent Alice gave the \tsecret documents to Agent Bob.\n'
print(strEx) #debug
replace = 'Agent'
replace_with = ''
strEx = re.compile(replace).sub(replace_with, strEx)
print(strEx) #debug

WHERE I LEFT OFF:
I NEED 
an if/else sequence for inside the function. 
to replace strEx with s
print or return?
'''