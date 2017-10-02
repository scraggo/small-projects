'''
Exercise 7.14 A, B, C, and D are all different digits. The number DCBA is equal to 4 times the number ABCD. What are the digits? Note: to make ABCD and DCBA conventional numbers, neither A nor D can be zero. Use a quadruple-nested loop.
'''
#first test with 2 digits.
for a in range(1,3): #we don't need to test above 2,000
    a *= 1000
    for b in range(1,10):
        b *= 100
        for c in range(1,10):
            c *= 10
            for d in range(1,10):
#                 print(a,b,c,d) #debug
                ABCD = a+b+c+d 
#                 print(ABCD,end=' ') #debug
                DCBA = (d*1000)+(c*10)+(b//10)+(a//1000)
#                 print(DCBA)
                if 4*ABCD == DCBA: 
                    print('FOUND IT!!! {}*4 = {}'.format(ABCD,DCBA))
                elif 4*ABCD >= 10000: continue    #don't calculate above 100
'''
'''