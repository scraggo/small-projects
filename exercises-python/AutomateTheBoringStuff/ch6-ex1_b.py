###Automate tbs. 
'''
Table Printer

Write a function named printTable() that takes a list of lists of strings and displays it in a well-organized table with each column right-justified. Assume that all the inner lists will contain the same number of strings. For example, the value could look like this:


tableData = [['apples', 'oranges', 'cherries', 'banana'],
             ['Alice', 'Bob', 'Carol', 'David'],
             ['dogs', 'cats', 'moose', 'goose']]
             
Your printTable() function would print the following:


  apples Alice  dogs
 oranges   Bob  cats
cherries Carol moose
  banana David goose
  
Hint: Your code will first have to find the longest string in each of the inner lists so that the whole column can be wide enough to fit all the strings. You can store the maximum width of each column as a list of integers. The printTable() function can begin with colWidths = [0] * len(tableData), which will create a list containing the same number of 0 values as the number of inner lists in tableData. That way, colWidths[0] can store the width of the longest string in tableData[0], colWidths[1] can store the width of the longest string in tableData[1], and so on. You can then find the largest value in the colWidths list to find out what integer width to pass to the rjust() string method.
'''
tableData = [['apples', 'oranges', 'cherries', 'banana'],
             ['Alice', 'Bob', 'Carol', 'David'],
             ['dogs', 'cats', 'moose', 'goose']]
def printTable(tableData):
    colWidths = [0] * len(tableData)
    numofRows = len(tableData[0])
    # print(colWidths) #debug

    # get the max value of each 'column'.
    # tableData 0,0 compared to 0,1. 0,2. 0,3 = [max0,0,0]
    # tableData 1,0 compared to 1,1. 1,2. 1,3 = [0,max1,0]
    # tableData 2,0 compared to 2,1. 2,2. 2,3 = [0,0,max2]
    j = 0 #outer loop
    m = 0
    n = 0 #inner loop
    maxlen = 0
    while j < len(tableData): #len(tableData = 3
        for datarow in tableData:
            if len(tableData[j][n]) > maxlen:
                maxlen = len(tableData[j][n])
                colWidths[j] = maxlen
            n += 1
        j += 1
        n = 0
        maxlen = 0
    # print(colWidths) #debug should be 8,5,5


    # print all the values in tableData as
    # apples = 0,0, compared to Alice = 1,0, compared to dogs = 2,0. (outer loop = 0)
    # oranges = 0,1. bob = 1,1. cats = 2,1       (outer loop = 1)
    # cherries row: 0,2. 1,2. 2,2. (outer loop = 2)
    #banana row: 0,3. 1,3. 2,3. (outer loop = 3)

    j = 0 #outer loop. m = inner loop
    while j < len(tableData[0]):
        for m,datarow in enumerate(tableData):
            print(tableData[m][j].rjust(colWidths[m]+1, ' '),end='')
        print()
        j += 1

printTable(tableData)