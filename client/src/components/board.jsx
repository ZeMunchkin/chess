import React from 'react';
import Square from './square';

import kingMove from '../helperFunctions/kingMoves';
import queenMove from '../helperFunctions/queenMoves';
import rookMove from '../helperFunctions/rookMoves';
import knightMove from '../helperFunctions/knightMoves';
import bishopMove from '../helperFunctions/bishopMoves';
import pawnMove from '../helperFunctions/pawnMoves';

import inCheck from '../helperFunctions/inCheck';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
      ],
      turn: 'White',
      selectedPiece: {
        location: null,
        type: null,
        color: null,
      },
      whiteKingLoc: 'r7c4',
      blackKingLoc: 'r0c4',
      inCheck: '',
    };
    this.selectPiece = this.selectPiece.bind(this);
  }

  movePiece(fromId, toId) {
    const board = this.copyBoard();

    const toRow = toId[1];
    const toCol = toId[3];
    const fromRow = fromId[1];
    const fromCol = fromId[3];

    const piece = board[fromRow][fromCol];
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = '';

    return board;
  }

  selectPiece(event) {
    const classes = event.target.className.split(' ');
    const endLoc = event.target.id;
    const piece = this.state.selectedPiece;
    let moveable;

    if (classes[1] === this.state.turn.toLowerCase()) {
      const selected = {
        location: endLoc, // eslint-disable-line
        type: classes[2],
        color: classes[1],
      };
      this.setState({ selectedPiece: selected });
      return;
    }

    if (piece.location) {
      moveable = this.checkValidMove(endLoc);
      if (moveable) {
        const board = this.movePiece(piece.location, endLoc);

        if (piece.type === 'king' && piece.color === 'white') {
          this.setState({ whiteKingLoc: endLoc });
        } else if (piece.type === 'king' && piece.color === 'black') {
          this.setState({ blackKingLoc: endLoc });
        }

        let kingInCheck = '';
        const opposingKing = piece.color === 'white' ? 'black' : 'white';
        const opposingKingLoc = this.state[`${opposingKing}KingLoc`];
        if (inCheck(board, opposingKingLoc, opposingKing)) {
          kingInCheck = opposingKing;
        }

        this.playTurn(board, kingInCheck);
      }
    }
  }

  playTurn(board, inCheck) {
    const turn = this.state.turn === 'White' ? 'Black' : 'White';
    const selectedPiece = {
      location: null,
      type: null,
      color: null,
    };
    this.setState({
      board,
      turn,
      selectedPiece,
      inCheck,
    });
  }

  checkValidMove(endLoc) {
    const piece = this.state.selectedPiece;
    let board = this.copyBoard();
    let moveable = null;
    let changeKingPosition = false;
    let kingInCheck;

    switch (piece.type) {
      case 'king':
        moveable = kingMove(board, piece.location, endLoc, piece.color);
        changeKingPosition = true;
        break;
      case 'queen':
        moveable = queenMove(board, piece.location, endLoc, piece.color);
        break;
      case 'rook':
        moveable = rookMove(board, piece.location, endLoc, piece.color);
        break;
      case 'knight':
        moveable = knightMove(board, piece.location, endLoc, piece.color);
        break;
      case 'bishop':
        moveable = bishopMove(board, piece.location, endLoc, piece.color);
        break;
      case 'pawn':
        moveable = pawnMove(board, piece.location, endLoc, piece.color);
        break;
      default:
        moveable = false;
    }

    if (!moveable) {
      return false;
    }

    board = this.movePiece(piece.location, endLoc);
    if (changeKingPosition) {
      kingInCheck = inCheck(board, endLoc, piece.color);
      changeKingPosition = false;
    } else {
      const king = piece.color === 'white' ? this.state.whiteKingLoc : this.state.blackKingLoc;
      kingInCheck = inCheck(board, king, piece.color);
    }

    if (kingInCheck) {
      return false;
    }

    return true;
  }

  copyBoard() {
    const curBoard = this.state.board;
    const copiedBoard = [];
    for (let i = 0; i < curBoard.length; i += 1) {
      copiedBoard.push(curBoard[i].slice());
    }
    return copiedBoard;
  }

  renderBoard(board) {
    const returnShaded = (row, col) => {
      if (row % 2 === 0 && col % 2 !== 0) {
        return true;
      } else if (row % 2 !== 0 && col % 2 === 0) {
        return true;
      }
      return false;
    };

    return (
      board.map((row, rowIndex) => (
        <div id={`row${rowIndex}`} className="row" key={`row${rowIndex}`}> {/* eslint-disable-line */}
          {row.map((piece, colIndex) => (
            <Square
              piece={piece}
              loc={`r${rowIndex}c${colIndex}`}
              select={this.selectPiece}
              shaded={returnShaded(rowIndex, colIndex)}
              selected={this.state.selectedPiece.location}
              key={`r${rowIndex}c${colIndex}`} /* eslint-disable-line */
            />
          ))}
        </div>
      ))
    );
  }

  render() {
    return (
      <div id="appContainer">
        <h1>{`${this.state.turn}'s Move`}</h1>
        <div id="boardContainer">
          {this.renderBoard(this.state.board)}
        </div>
      </div>
    );
  }
}

export default Board;
