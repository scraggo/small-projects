"""
Byte of Python Notes
"""
print('All about strings')
age = 20
name = 'Swaroop'
print('{0} was {1} years old when he wrote this book'.format(name, age))
print('Why is {0} playing with that python?'.format(name))
#numbers are optional:
print('{} was {} years old when he wrote this book'.format(name, age))
print('Why is {} playing with that python?'.format(name))
# decimal (.) precision of 3 for float '0.333'
print('{0:.3f}'.format(1.0/3))
# fill with underscores (_) with the text centered
# (^) to 11 width '___hello___'
print('{0:_^11}'.format('hello'))
# keyword-based 'Swaroop wrote A Byte of Python'
print('{name} wrote {book}'.format(name='Swaroop', book='A Byte of Python'))
#print ends:
print('a', end=' ')
print('b', end=' ')
print('c')
#good \ trick to know:
print("This is the first sentence. \
This is the second sentence.")
#r prefix: raw string that ignores escapes:
print(r"Newlines are indicated by \n")
s = '''This is a multi-line string.
This is the second line.'''
print(s)
#this can be done, but don't do it:
i = 5; print(i)
#---
print('All about operators')
print("""
<< (left shift)
Shifts the bits of the number to the left by the number of bits specified. (Each number is represented in memory by bits or binary digits i.e. 0 and 1)
2 << 2 gives 8. 2 is represented by 10 in bits.
Left shifting by 2 bits gives 1000 which represents the decimal 8.
>> (right shift)
Shifts the bits of the number to the right by the number of bits specified.
11 >> 1 gives 5.
11 is represented in bits by 1011 which when right shifted by 1 bit gives 101which is the decimal 5.
& (bit-wise AND)
Bit-wise AND of the numbers
5 & 3 gives 1.
| (bit-wise OR)
Bitwise OR of the numbers
5 | 3 gives 7
^ (bit-wise XOR)
Bitwise XOR of the numbers
5 ^ 3 gives 6
~ (bit-wise invert)
The bit-wise inversion of x is -(x+1)
~5 gives -6. More details at http://stackoverflow.com/a/11810203

a = 2
a = a * 3
can be written as:
a = 2
a *= 3
""")