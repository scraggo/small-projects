'''
Exercise 8.6 In statistics, the binomial coefficient indexed by n and k (often expressed as “n over k,” whereby n must be bigger than or equal to k) is calculated as n!/(k! * (n − k)!), whereby n! indicates the factorial of n. As I explained in Chapter 7: the factorial of a positive integer is that integer, multiplied by all positive integers that are lower (excluding zero). You write the factorial as the number with an exclamation mark after it. E.g., the factorial of 5 is 5! = 5∗4∗3∗2∗1 = 120. If you did all the exercises until now, you wrote some code for this. 

Write a function that calculates the binomial coefficient for its two parameters, and returns the value. Write the code in such a way that it can be used as a module by another program (i.e., put the tests of your program in a main() function that is called as explained above).
'''
def factorial(int):
    '''Returns factorial of an integer >= 0. [ex: 5! or 5*4*3*2*1]
    Otherwise, returns 0.
    '''
    if int < 0: return 0
    factorial = 1
    if int <= 1: return factorial
    else:
        for x in range(2,int+1):
            factorial *= x 
        return factorial

def binomial_c(n,k):
    '''Calculates and returns the Binomial Coefficient of integers n and k. 
    n and k must be >= 0 and n must be >= k. 
    Returns None if conditions aren't met.
    '''
    if (n < 0) or (k < 0) or (n < k):
        return
    else: 
        return factorial(n) / ( factorial(k) * factorial((n - k)) )

def main():
    print(binomial_c(50,2))
    print(binomial_c(3,5))
    print(binomial_c(2,2))
    print(binomial_c(-22,35))
    print(binomial_c(233,52))

if __name__ == '__main__':
    main()

'''
1225.0
None
1.0
None
3.3032401254304923e+52

'''