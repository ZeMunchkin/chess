import React from 'react';
import Square from './square';
import King from '../helperFunctions/pieceClasses/kingPiece';
import Queen from '../helperFunctions/pieceClasses/queenPiece';
import Rook from '../helperFunctions/pieceClasses/rookPiece';
import Knight from '../helperFunctions/pieceClasses/knightPiece';
import Bishop from '../helperFunctions/pieceClasses/bishopPiece';
import Pawn from '../helperFunctions/pieceClasses/pawnPiece';
import checkIfCheck from '../helperFunctions/moveFuncs/inCheck';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [
          new Rook('black', 'r0c0'), new Knight('black', 'r0c1'), new Bishop('black', 'r0c2'), new Queen('black', 'r0c3'),
          new King('black', 'r0c4'), new Bishop('black', 'r0c5'), new Knight('black', 'r0c6'), new Rook('black', 'r0c7'),
        ],
        [
          new Pawn('black', 'r1c0'), new Pawn('black', 'r1c1'), new Pawn('black', 'r1c2'), new Pawn('black', 'r1c3'),
          new Pawn('black', 'r1c4'), new Pawn('black', 'r1c5'), new Pawn('black', 'r1c6'), new Pawn('black', 'r1c7'),
        ],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}, {}, {}, {}],
        [
          new Pawn('white', 'r6c0'), new Pawn('white', 'r6c1'), new Pawn('white', 'r6c2'), new Pawn('white', 'r6c3'),
          new Pawn('white', 'r6c4'), new Pawn('white', 'r6c5'), new Pawn('white', 'r6c6'), new Pawn('white', 'r6c7'),
        ],
        [
          new Rook('white', 'r7c0'), new Knight('white', 'r7c1'), new Bishop('white', 'r7c2'), new Queen('white', 'r7c3'),
          new King('white', 'r7c4'), new Bishop('white', 'r7c5'), new Knight('white', 'r7c6'), new Rook('white', 'r7c7'),
        ],
      ],
      turn: 'White',
      selectedPiece: null,
      whiteKingLoc: 'r7c4',
      blackKingLoc: 'r0c4',
      inCheck: '',
    };
    this.selectPiece = this.selectPiece.bind(this);
  }

  movePiece(fromId, toId, boardParam) {
    const board = boardParam || this.copyBoard();

    const toRow = toId.slice(1, 2);
    const toCol = toId.slice(3);
    const fromRow = fromId.slice(1, 2);
    const fromCol = fromId.slice(3);

    const piece = board[fromRow][fromCol];
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = {};

    return board;
  }

  selectPiece(event) {
    const classes = event.target.className.split(' ');
    const pieceLoc = this.state.selectedPiece;
    const pieceColor = classes[1];
    const endLoc = event.target.id;
    let moveable;

    if (pieceColor === this.state.turn.toLowerCase()) {
      const selected = endLoc;
      this.setState({ selectedPiece: selected });
      return;
    }

    if (pieceLoc) {
      moveable = this.checkValidMove(endLoc);

      if (moveable) {
        const pieceRow = pieceLoc.slice(1, 2);
        const pieceCol = pieceLoc.slice(3);
        const piece = this.state.board[pieceRow][pieceCol];
        let board = this.movePiece(pieceLoc, endLoc);
        piece.loc = endLoc;

        if (typeof moveable === 'string') {
          board = this.handleCastle(moveable, pieceRow, board);
        }

        if (piece.type === 'rook' || piece.type === 'king') {
          piece.hasMoved = true;
        }

        if (piece.type === 'king' && piece.color === 'white') {
          this.setState({ whiteKingLoc: endLoc });
        } else if (piece.type === 'king' && piece.color === 'black') {
          this.setState({ blackKingLoc: endLoc });
        }

        let kingInCheck = '';
        const opposingKing = piece.color === 'white' ? 'black' : 'white';
        const opposingKingLoc = this.state[`${opposingKing}KingLoc`];
        if (checkIfCheck(board, opposingKingLoc, opposingKing)) {
          kingInCheck = opposingKing;
        }
        this.playTurn(board, kingInCheck);
      }
    }
  }

  playTurn(board, inCheck) {
    const turn = this.state.turn === 'White' ? 'Black' : 'White';
    const selectedPiece = null;
    this.setState({
      board,
      turn,
      selectedPiece,
      inCheck,
    });
  }

  checkValidMove(endLoc) {
    const pieceLoc = this.state.selectedPiece;
    const pieceRow = pieceLoc.slice(1, 2);
    const pieceCol = pieceLoc.slice(3);
    let board = this.copyBoard();
    const piece = board[pieceRow][pieceCol];
    let changeKingPosition = piece.type === 'king';
    let kingInCheck;

    let moveable = piece.move(board, endLoc);

    if (!moveable) {
      return false;
    }

    board = this.movePiece(pieceLoc, endLoc);
    if (changeKingPosition) {
      kingInCheck = checkIfCheck(board, endLoc, piece.color);
      changeKingPosition = false;
    } else {
      const king = piece.color === 'white' ? this.state.whiteKingLoc : this.state.blackKingLoc;
      kingInCheck = checkIfCheck(board, king, piece.color);
    }

    if (kingInCheck) {
      moveable = false;
    }

    return moveable;
  }

  copyBoard() {
    const curBoard = this.state.board;
    const copiedBoard = [];
    for (let key in curBoard) { // eslint-disable-line
      copiedBoard[key] = curBoard[key].slice();
    }
    return copiedBoard;
  }

  handleCastle(moveString, row, board) {
    let castleDirection = moveString.split(' ');
    castleDirection = castleDirection[1]; // eslint-disable-line

    const castleFromCol = castleDirection === 'left' ? 0 : 7;
    const castleToCol = castleDirection === 'left' ? 3 : 5;
    const rook = board[row][castleFromCol];
    const castleStart = `r${row}c${castleFromCol}`;
    const castleEnd = `r${row}c${castleToCol}`;

    rook.hasMoved = true;
    return this.movePiece(castleStart, castleEnd, board);
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
              selected={this.state.selectedPiece}
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
