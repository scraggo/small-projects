# snippets-python

*If I have to keep looking it up, it goes here.*

template
```python
#!/usr/bin/env python3
"""
Module Docstring
"""

__author__ = "github.com/scraggo"
__version__ = "0.1.0"
__license__ = "MIT"
```

dates
```python
def display_time():
    import datetime
    now = datetime.datetime.now() #2017-09-20 00:47:21.872587
    now = now.strftime("%Y%m%d %H:%M:%S") #20170920 00:52:40
    return now
```

classes
```python
class []:
    def __init__(self, []):
        self.[] = []

if __name__ == "__main__":
    main()
```

tests
```python
from _ import *

#get test document
with open("test.txt") as f:
    text = f.readlines()
   
# print(text)

def PRINTLINE():
    LINE = '='*40
    print(f'\n{LINE}\n')

#######
# TESTS
#######

def test_function():
    assert 2 + 2 == 5, "Houston we've got a problem"

def run_tests():
    test_function()

run_tests()
```