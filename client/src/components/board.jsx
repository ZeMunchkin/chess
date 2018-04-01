import React from 'react';
import Square from './square';
import helpers from '../helperFunctions/moveHelpers';

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
    const classes = event.target.className.split(' ');

    if (classes[1] === this.state.turn.toLowerCase()) {
      const selected = {
        location: event.target.id,
        type: classes[2],
        color: classes[1],
      };
      this.setState({ selectedPiece: selected });
    } else if (this.state.selectedPiece) {
      // if yes, check if it's a legal move for that piece
      const piece = this.state.selectedPiece;
      const major = helpers.byMajorDiag(this.state.board, piece.location, event.target.id, piece.color);
      const minor = helpers.byMinorDiag(this.state.board, piece.location, event.target.id, piece.color);
      // if yes, move the pieces
      if (major || minor) {
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
