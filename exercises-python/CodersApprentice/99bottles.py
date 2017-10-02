'''
   Exercise 7.4 “99 bottles of beer” is a traditional song in the United States and Canada. It is popular to sing on long trips, as it has a very repetitive format which is easy to memorize, and can take a long time to sing. The song’s simple lyrics are as follows: “99 bottles of beer on the wall, 99 bottles of beer. Take one down, pass it around, 98 bottles of beer on the wall.” The same verse is repeated, each time with one fewer bottle. The song is completed when the singer or singers reach zero. Write a program that generates all the verses of the song (though you might start a bit lower, for instance with 10 bottles). Make sure that your loop is not endless, and that you use the proper inflection for the word “bottle.”
'''
for x in range(99,0,-1): #1 is not included.
    if x == 1:
        print('{} bottle of beer on the wall, {} bottle of beer. Take one down, pass it around, {} bottles of beer on the wall.'.format(x,x,x-1))
    elif x == 2:
        print('{} bottles of beer on the wall, {} bottles of beer. Take one down, pass it around, {} bottle of beer on the wall.'.format(x,x,x-1))
    else:
        print('{} bottles of beer on the wall, {} bottles of beer. Take one down, pass it around, {} bottles of beer on the wall.'.format(x,x,x-1))        
        
