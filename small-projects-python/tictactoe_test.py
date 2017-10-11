#!/usr/bin/env python3

# tictactoe.py

from tictactoe_oop import *

def display_time():
    import datetime
    now = datetime.datetime.now() #2017-09-20 00:47:21.872587
    now = now.strftime("%Y%m%d %H:%M:%S") #20170920 00:52:40
    print()
    print(now)

def PRINTLINE():
    LINE = '='*40
    print(f'\n{LINE}\n')

# TESTS START:

def test_init():
    b = Board()
    t = Game(b)
    t.board.board = [' '] * 10
    print(t.__dict__)

def test_getboardcopy1():
    print('should be true, then two boards with 3 xs')
    b = Board()
    t = Game(b)
    print(b.board == [' '] * 10) #true
    b.board[4] = 'x'
    b.board[5] = 'x'
    b.board[6] = 'x'
    print(b.board)
    print(b.getBoardCopy())    

def test_getboardcopy2():
    print('should be true, then two boards with 3 xs')
    b = Board()
    t = Game(b)
    print(t.board.board == [' '] * 10) #true
    t.board.board[4] = 'x'
    t.board.board[5] = 'x'
    t.board.board[6] = 'x'
    print(t.board.board)
    print(t.board.getBoardCopy())    

def test_iswinner():
    print('SHOULD BE FALSE, TRUE')
    b = Board()
    t = Game(b)
    t.board.board = [' '] * 10
    print(t.isWinner(t.board.board, 'x')) #false
    t.board.board[4] = 'x'
    t.board.board[5] = 'x'
    t.board.board[6] = 'x'
    print(t.isWinner(t.board.board, 'x')) #true

def test_testmove():
    print('SHOULD BE False, True')
    b = Board()
    t = Game(b)
    t.board.board = [' '] * 10
    print(t.testMove('x', 5)) #false
    t.board.board[4] = 'x'
    t.board.board[6] = 'x'
    print(t.testMove('x', 5)) #true

def run_tests():
    display_time()
    PRINTLINE()
    # test_init()
    test_getboardcopy1()
    test_getboardcopy2()
    PRINTLINE()
    test_iswinner()
    PRINTLINE()
    test_testmove()

run_tests()
