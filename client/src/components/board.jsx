import React from 'react';
import Square from './square';

import kingMove from '../helperFunctions/kingMoves';
import queenMove from '../helperFunctions/queenMoves';
import rookMove from '../helperFunctions/rookMoves';
import knightMove from '../helperFunctions/knightMoves';
import bishopMove from '../helperFunctions/bishopMoves';
import pawnMove from '../helperFunctions/pawnMoves';

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
      selectedPiece: null,
    };
    this.movePiece = this.movePiece.bind(this);
    this.selectPiece = this.selectPiece.bind(this);
  }

  movePiece(fromId, toId) {
    const board = this.state.board.slice();

    const toRow = toId[1];
    const toCol = toId[3];
    const fromRow = fromId[1];
    const fromCol = fromId[3];

    const piece = board[fromRow][fromCol];
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = '';

    const turn = this.state.turn === 'White' ? 'Black' : 'White';
    const selectedPiece = null;
    this.setState({ board, turn, selectedPiece });
  }

  selectPiece(event) {
    const board = this.state.board.slice();
    const classes = event.target.className.split(' ');
    const location = event.target.id;

    if (classes[1] === this.state.turn.toLowerCase()) {
      const selected = {
        location: location,
        type: classes[2],
        color: classes[1],
      };
      this.setState({ selectedPiece: selected });
    } else if (this.state.selectedPiece) {
      // if yes, check if it's a legal move for that piece
      const piece = this.state.selectedPiece;
      let moveable = null;

      switch (piece.type) {
        case 'king':
          moveable = kingMove(board, piece.location, location, piece.color);
          break;
        case 'queen':
          moveable = queenMove(board, piece.location, location, piece.color);
          break;
        case 'rook':
          moveable = rookMove(board, piece.location, location, piece.color);
          break;
        case 'knight':
          moveable = knightMove(board, piece.location, location, piece.color);
          break;
        case 'bishop':
          moveable = bishopMove(board, piece.location, location, piece.color);
          break;
        case 'pawn':
          moveable = pawnMove(board, piece.location, location, piece.color);
          break;
        default:
          moveable = false;
      }
      
      if (moveable) {
        this.movePiece(this.state.selectedPiece.location, event.target.id);
      }
    }
  }

  renderBoard(board) {
    return (
      board.map((row, rowIndex) => (
        <div id={`row${rowIndex}`} className="row">
          {row.map((piece, colIndex) => (
            <Square piece={piece} loc={`r${rowIndex}c${colIndex}`} move={this.movePiece} select={this.selectPiece} />
          ))}
        </div>
      ))
    );
  }

  render() {
    return (
      <div>
        <h1>{`${this.state.turn}'s Move`}</h1>
        <div id="boardContainer">
          {this.renderBoard(this.state.board)}
        </div>
      </div>
    );
  }
}

export default Board;
