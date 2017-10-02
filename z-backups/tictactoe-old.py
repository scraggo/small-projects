# tictactoe.py
#!/usr/bin/env python3
"""
Tic Tac Toe - OOP
adapted from https://inventwithpython.com/chapter10.html
"""

__author__ = "scraggo.github.com"
__version__ = "0.1.0"

import random

'''
ALL FUNCTIONS

*drawBoard(board)
inputPlayerLetter()
whoGoesFirst()
playAgain()
makeMove(board, letter, move)
isWinner(bo, le)
*getBoardCopy(board)
*isSpaceFree(board, move)
getPlayerMove(board)
chooseRandomMoveFromList(board, movesList)
getComputerMove(board, computerLetter)
*isBoardFull(board)
main()
'''


class Game:
    def __init__(self, board):
        self.first = random.choice(['computer', 'player'])
        self.board = board

    @staticmethod
    def inputPlayerLetter(self):
        # Let's the player type which letter they want to be.
        # Returns a list with the player's letter as the first item, and the computer's letter as the second.
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
    #     # Randomly choose the player who goes first.
    #     if random.randint(0, 1) == 0:
    #         return 'computer'
    #     else:
    #         return 'player'

    @staticmethod
    def playAgain():
        # This function returns True if the player wants to play again, otherwise it returns False.
        print('Do you want to play again? (yes or no)')
        return input().lower().startswith('y')

    def makeMove(self, letter, move):
        self.board[move] = letter

    def testMove(self, board, letter, move):
        if board == self.board:
            raise ValueError('board must be a copy.')
        # modify board copy
        board[move] = letter
        return self.isWinner(letter, board_copy=True)

    def isWinner(self, le, board_copy=False):
        # Given a board and a player's letter, this function returns True if that player has won.
        # We use bo instead of board and le instead of letter so we don't have to type as much.
        if board_copy is False:
            bo = self.board
        else:
            bo = self.board.getBoardCopy()

        return ((bo[7] == le and bo[8] == le and bo[9] == le) or # across the top
                (bo[4] == le and bo[5] == le and bo[6] == le) or # across the middle
                (bo[1] == le and bo[2] == le and bo[3] == le) or # across the bottom
                (bo[7] == le and bo[4] == le and bo[1] == le) or # down the left side
                (bo[8] == le and bo[5] == le and bo[2] == le) or # down the middle
                (bo[9] == le and bo[6] == le and bo[3] == le) or # down the right side
                (bo[7] == le and bo[5] == le and bo[3] == le) or # diagonal
                (bo[9] == le and bo[5] == le and bo[1] == le)) # diagonal

    def getPlayerMove(self):
        # Let the player type in his move.
        f_move = ' '
        while f_move not in '1 2 3 4 5 6 7 8 9'.split() or not self.board.isSpaceFree(int(f_move)):
            print('What is your next move? (1-9)')
            f_move = input()
        return int(f_move)

    def chooseRandomMoveFromList(self, movesList):
        # Returns a valid move from the passed list on the passed board.
        # Returns None if there is no valid move.
        possibleMoves = []
        for i in movesList:
            if self.board.isSpaceFree(i):
                possibleMoves.append(i)

        if len(possibleMoves) != 0:
            return random.choice(possibleMoves)
        else:
            return None

    def getComputerMove(self, computerLetter):
        # Given a board and the computer's letter, determine where to move and return that move.
        if computerLetter == 'X':
            playerLetter = 'O'
        else:
            playerLetter = 'X'

        # Here is our algorithm for our Tic Tac Toe AI:
        # First, check if we can win in the next move
        for i in range(1, 10):
            copy = self.board.getBoardCopy()
            if self.board.isSpaceFree(i):
                if self.testMove(copy, playerLetter, i):
                # self.makeMove(copy, computerLetter, i)
                # if self.isWinner(copy, computerLetter):
                    return i

        # Check if the player could win on his next move, and block them.
        for i in range(1, 10):
            copy = self.board.getBoardCopy()
            if self.board.isSpaceFree(i):
                if self.testMove(copy, playerLetter, i):
                # self.makeMove(copy, playerLetter, i)
                # if self.isWinner(playerLetter, board_copy=True):
                    return i

        # Try to take one of the corners, if they are free.
        f_move = self.chooseRandomMoveFromList([1, 3, 7, 9])
        if f_move != None:
            return f_move

        # Try to take the center, if it is free.
        if self.board.isSpaceFree(self.board, 5):
            return 5

        # Move on one of the sides.
        return self.chooseRandomMoveFromList([2, 4, 6, 8])


class Board:
    def __init__(self):
        self.board = [' '] * 10

    def drawBoard(self):
        board = self.board #will this work? YES - should I copy it?
        # This function prints out the board that it was passed.

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
        # Make a duplicate of the board list and return it the duplicate.
        return self.board[:]

    def isSpaceFree(self, f_move):
        # Return true if the passed move is free on the passed board.
        return self.board[f_move] == ' '

    def isBoardFull(self):
        # Return True if every space on the board has been taken. Otherwise return False.
        for i in range(1, 10):
            if self.isSpaceFree(i):
                return False
        return True


"""
def drawBoard(board):
    # This function prints out the board that it was passed.

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

def inputPlayerLetter():
    # Let's the player type which letter they want to be.
    # Returns a list with the player's letter as the first item, and the computer's letter as the second.
    letter = ''
    while not (letter == 'X' or letter == 'O'):
        print('Do you want to be X or O?')
        letter = input().upper()

    # the first element in the tuple is the player's letter, the second is the computer's letter.
    if letter == 'X':
        return ['X', 'O']
    else:
        return ['O', 'X']

def whoGoesFirst():
    # Randomly choose the player who goes first.
    if random.randint(0, 1) == 0:
        return 'computer'
    else:
        return 'player'

def playAgain():
    # This function returns True if the player wants to play again, otherwise it returns False.
    print('Do you want to play again? (yes or no)')
    return input().lower().startswith('y')

def makeMove(board, letter, f_move):
    board[f_move] = letter

def isWinner(bo, le):
    # Given a board and a player's letter, this function returns True if that player has won.
    # We use bo instead of board and le instead of letter so we don't have to type as much.
    return ((bo[7] == le and bo[8] == le and bo[9] == le) or # across the top
    (bo[4] == le and bo[5] == le and bo[6] == le) or # across the middle
    (bo[1] == le and bo[2] == le and bo[3] == le) or # across the bottom
    (bo[7] == le and bo[4] == le and bo[1] == le) or # down the left side
    (bo[8] == le and bo[5] == le and bo[2] == le) or # down the middle
    (bo[9] == le and bo[6] == le and bo[3] == le) or # down the right side
    (bo[7] == le and bo[5] == le and bo[3] == le) or # diagonal
    (bo[9] == le and bo[5] == le and bo[1] == le)) # diagonal

def getBoardCopy(board):
    # Make a duplicate of the board list and return it the duplicate.
    dupeBoard = []

    for i in board:
        dupeBoard.append(i)

    return dupeBoard

def isSpaceFree(board, f_move):
    # Return true if the passed move is free on the passed board.
    return board[f_move] == ' '

def getPlayerMove(board):
    # Let the player type in his move.
    f_move = ' '
    while f_move not in '1 2 3 4 5 6 7 8 9'.split() or not isSpaceFree(board, int(f_move)):
        print('What is your next move? (1-9)')
        f_move = input()
    return int(f_move)

def chooseRandomMoveFromList(board, movesList):
    # Returns a valid move from the passed list on the passed board.
    # Returns None if there is no valid move.
    possibleMoves = []
    for i in movesList:
        if isSpaceFree(board, i):
            possibleMoves.append(i)

    if len(possibleMoves) != 0:
        return random.choice(possibleMoves)
    else:
        return None

def getComputerMove(board, computerLetter):
    # Given a board and the computer's letter, determine where to move and return that move.
    if computerLetter == 'X':
        playerLetter = 'O'
    else:
        playerLetter = 'X'

    # Here is our algorithm for our Tic Tac Toe AI:
    # First, check if we can win in the next move
    for i in range(1, 10):
        copy = getBoardCopy(board)
        if isSpaceFree(copy, i):
            makeMove(copy, computerLetter, i)
            if isWinner(copy, computerLetter):
                return i

    # Check if the player could win on his next move, and block them.
    for i in range(1, 10):
        copy = getBoardCopy(board)
        if isSpaceFree(copy, i):
            makeMove(copy, playerLetter, i)
            if isWinner(copy, playerLetter):
                return i

    # Try to take one of the corners, if they are free.
    f_move = chooseRandomMoveFromList(board, [1, 3, 7, 9])
    if f_move != None:
        return f_move

    # Try to take the center, if it is free.
    if isSpaceFree(board, 5):
        return 5

    # Move on one of the sides.
    return chooseRandomMoveFromList(board, [2, 4, 6, 8])

def isBoardFull(board):
    # Return True if every space on the board has been taken. Otherwise return False.
    for i in range(1, 10):
        if isSpaceFree(board, i):
            return False
    return True

"""


def main():
    print('Welcome to Tic Tac Toe!')

    while True:
        # Reset the board
        b = Board()
        t = Game(b)
        playerLetter, computerLetter = t.inputPlayerLetter()
        turn = t.first
        print('The {} will go first.'.format(turn))
        gameIsPlaying = True

        while gameIsPlaying:
            if turn == 'player':
                # Player's turn.
                b.drawBoard()
                move = t.getPlayerMove()
                t.makeMove(playerLetter, move)

                if t.isWinner(playerLetter):
                    b.drawBoard()
                    print('Hooray! You have won the game!')
                    gameIsPlaying = False
                else:
                    if b.isBoardFull():
                        b.drawBoard()
                        print('The game is a tie!')
                        break
                    else:
                        turn = 'computer'

            else:
                # Computer's turn.
                move = t.getComputerMove(computerLetter)
                t.makeMove(computerLetter, move)

                if t.isWinner(computerLetter):
                    b.drawBoard()
                    print('The computer has beaten you! You lose.')
                    gameIsPlaying = False
                else:
                    if b.isBoardFull():
                        b.drawBoard()
                        print('The game is a tie!')
                        break
                    else:
                        turn = 'player'

        if not t.playAgain():
            break

main()
