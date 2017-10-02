'''
Exercise 7.5 The Fibonacci sequence is a sequence of numbers that starts with 1, followed by 1 again. Every next number is the sum of the two previous numbers. I.e., the sequence starts with 1, 1, 2, 3, 5, 8, 13, 21,... Write a program that calculates and prints the Fibonacci sequence until the numbers get higher than 1000.
'''
fib = 0
fib_p = 0
n = 1
while True: 
    if n == 1:
        fib = fib_p + 1
        print(fib)
        n += 1
    elif n > 1:
        fib = fib_p + fib
        if fib > 1000: 
            break
        else:
            print(fib)
        fib_p = fib - fib_p
        n += 1  
    
'''
fib = fib_p + fib
fib_p = fib - fib_p

'''