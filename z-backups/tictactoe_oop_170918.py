# tictactoe_oop.py
#!/usr/bin/env python3
"""
Tic Tac Toe - OOP
adapted from https://inventwithpython.com/chapter10.html
"""

import random

class Game:
    def __init__(self):
        self.first = random.choice(['computer', 'player'])
        # we initialize the board class
        # to access board data (list), we use self.board.board
        # self.board = board

    def inputPlayerLetter(self):
        '''
        # Let's the player type which letter they want to be.
        # Returns a list with the player's letter as the first item, and the computer's letter as the second.
        '''
        letter = ''
        while not (letter == 'X' or letter == 'O'):
            print('Do you want to be X or O?')
            letter = input().upper()

        # the first element in the tuple is the player's letter, the second is the computer's letter.
        if letter == 'X':
            return ['X', 'O']
        else:
            return ['O', 'X']

    # def whoGoesFirst(self):

    @staticmethod
    def playAgain():
        '''
        # This function returns True if the player wants to play again, otherwise it returns False.
        '''
        print('Do you want to play again? (yes or no)')
        return input().lower().startswith('y')

    def makeMove(self, board, letter, move):
        board.board[move] = letter

    def testMove(self, board, letter, move):
        # make a copy of the board
        board_copy = board.getBoardCopy()
            # raise ValueError('board must be a copy.')
        # modify board copy
        board_copy[move] = letter
        return self.isWinner(board_copy, letter)

    def isWinner(self, board, letter):
        '''
        # Given a board and a player's letter, this function returns True if that player has won.
        # We use bo instead of board and le instead of letter so we don't have to type as much.
        '''
        bo = board
        le = letter

        return ((bo[7] == le and bo[8] == le and bo[9] == le) or # across the top
                (bo[4] == le and bo[5] == le and bo[6] == le) or # across the middle
                (bo[1] == le and bo[2] == le and bo[3] == le) or # across the bottom
                (bo[7] == le and bo[4] == le and bo[1] == le) or # down the left side
                (bo[8] == le and bo[5] == le and bo[2] == le) or # down the middle
                (bo[9] == le and bo[6] == le and bo[3] == le) or # down the right side
                (bo[7] == le and bo[5] == le and bo[3] == le) or # diagonal
                (bo[9] == le and bo[5] == le and bo[1] == le)) # diagonal

    def getPlayerMove(self, board):
        '''
        # Let the player type in his move.
        '''
        move = ' '
        while move not in '1 2 3 4 5 6 7 8 9'.split() or not board.isSpaceFree(int(move)):
            print('What is your next move? (1-9)')
            move = input()
        return int(move)

    def chooseRandomMoveFromList(self, board, movesList):
        '''
        # Returns a valid move from the passed list on the passed board.
        # Returns None if there is no valid move.
        '''
        possibleMoves = []
        for i in movesList:
            if board.isSpaceFree(i):
                possibleMoves.append(i)

        if len(possibleMoves) != 0:
            return random.choice(possibleMoves)
        else:
            return None

    def getComputerMove(self, board, computerLetter):
        '''
        # Given a board and the computer's letter, determine where to move and return that move.
        '''
        if computerLetter == 'X':
            playerLetter = 'O'
        else:
            playerLetter = 'X'

        # Here is our algorithm for our Tic Tac Toe AI:
        # First, check if we can win in the next move
        for i in range(1, 10):
            if board.isSpaceFree(i) and self.testMove(board, playerLetter, i):
                # self.makeMove(copy, computerLetter, i)
                # if self.isWinner(copy, computerLetter):
                return i

        # Check if the player could win on his next move, and block them.
        for i in range(1, 10):
            if board.isSpaceFree(i) and self.testMove(board, playerLetter, i):
                # self.makeMove(copy, playerLetter, i)
                # if self.isWinner(playerLetter, board_copy=True):
                return i

        # Try to take one of the corners, if they are free.
        move = self.chooseRandomMoveFromList(board, [1, 3, 7, 9])
        if move != None:
            return move

        # Try to take the center, if it is free.
        if board.isSpaceFree(5):
            return 5

        # Move on one of the sides.
        return self.chooseRandomMoveFromList(board, [2, 4, 6, 8])

    # duplicated methods
    def drawBoard(self, board):
        board.drawBoard()

    def isBoardFull(self, board):
        return board.isBoardFull()



class Board:
    def __init__(self):
        self.board = [' '] * 10

    def drawBoard(self):
        # This function prints out the board that it was passed.
        board = self.board # amazingly, this works!

        # "board" is a list of 10 strings representing the board (ignore index 0)
        print('   |   |')
        print(' {} | {} | {}'.format(board[7], board[8], board[9]))
        print('   |   |')
        print('-----------')
        print('   |   |')
        print(' {} | {} | {}'.format(board[4], board[5], board[6]))
        print('   |   |')
        print('-----------')
        print('   |   |')
        print(' {} | {} | {}'.format(board[1], board[2], board[3]))
        print('   |   |')

    def getBoardCopy(self):
        '''Make a duplicate of the board list and return it the duplicate.'''
        return self.board[:]

    def isSpaceFree(self, move):
        ''' Return true if the passed move is free on the passed board.'''
        return self.board[move] == ' '

    def isBoardFull(self):
        ''' Return True if every space on the board has been taken. Otherwise return False.'''
        for i in range(1, 10):
            if self.isSpaceFree(i):
                return False
        return True


def main():
    print('Welcome to Tic Tac Toe!')

    while True:
        # Reset the board
        b = Board()
        t = Game()
        playerLetter, computerLetter = t.inputPlayerLetter()
        turn = t.first
        print('The {} will go first.'.format(turn))
        gameIsPlaying = True

        while gameIsPlaying:
            if turn == 'player':
                # Player's turn.
                t.drawBoard(b) #dup
                move = t.getPlayerMove(b)
                t.makeMove(b, playerLetter, move)

                if t.isWinner(b.board, playerLetter):
                    t.drawBoard(b) #dup
                    print('Hooray! You have won the game!')
                    gameIsPlaying = False
                else:
                    if t.isBoardFull(b): #dup
                        t.drawBoard(b) #dup
                        print('The game is a tie!')
                        # break
                        gameIsPlaying = False
                    else:
                        turn = 'computer'

            else:
                # Computer's turn.
                move = t.getComputerMove(b, computerLetter)
                t.makeMove(b, computerLetter, move)

                if t.isWinner(b.board, computerLetter):
                    t.drawBoard(b) #dup
                    print('The computer has beaten you! You lose.')
                    gameIsPlaying = False
                else:
                    if t.isBoardFull(b): #dup
                        t.drawBoard(b) #dup
                        print('The game is a tie!')
                        # break
                        gameIsPlaying = False
                    else:
                        turn = 'player'

        if not t.playAgain():
            break

main()
