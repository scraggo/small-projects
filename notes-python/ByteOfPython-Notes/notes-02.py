#python3
"""
Byte of Python Notes
"""
print('All about control flow')

def guess_number():
    number = 23
    running = True  # kinda cool
    while running:
        guess = int(input('Enter an integer : '))

        if guess == number:
            print('Congratulations, you guessed it.')
            # this causes the while loop to stop
            running = False #kinda cool
        elif guess < number:
            print('No, it is a little higher than that.')
        else:
            print('No, it is a little lower than that.')
    else:
        print('The while loop is over.')
        # Do anything else you want to do here
try:
    guess_number()
    print('Done')
except:
    print('Whoops!')
#---
print("""
If we supply a third number to range, then that becomes the step count. For example, range(1,5,2) gives [1,3]. Remember that the range extends up to the second number i.e. it does not include the second number.
Note that range() generates only one number at a time, if you want the full list of numbers, call list() on the range(), for example, list(range(5)) will result in [0, 1, 2, 3, 4]. Lists are explained in the data structures chapter.
The for loop then iterates over this range - for i in range(1,5) is equivalent to for i in [1, 2, 3, 4] which is like assigning each number (or object) in the sequence to i, one at a time, and then executing the block of statements for each value of i. In this case, we just print the value in the block of statements.""")

#nice way to create a list:
t = list(range(5))
print(t)
#range by step 2:
for i in range(1,5,2):
  print(i)

#so...instead of range:
for i in [1, 2, 3, 44]:
  print(i)
  
print(range(5)) #not what I expected!