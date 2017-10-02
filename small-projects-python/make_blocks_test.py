from make_blocks import *

'''
EXPECTED OUTPUT
[['1some start', '2random end'], ['3stuff start', '4with end'], ['5random start/end'], ['6lines start/end'], ['7in start', '8certain', '9places end']]
'''

test_text = '''1some start
2random end

3stuff start
4with end


5random start/end

6lines start/end

7in start
8certain
9places end
'''

def PRINTLINE():
    LINE = '='*40
    print(f'\n{LINE}\n')

#######
# TESTS
#######

def test_block_encoder():
    f_text = test_text
    print(block_encoder(f_text))

def run_tests():
    test_block_encoder()

run_tests()