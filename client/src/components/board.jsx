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
      whiteKing: null,
      blackKing: null,
      promotion: false,
      inCheck: '',
      checkOrigination: null,
      checkDisplay: false,
    };
    this.selectPiece = this.selectPiece.bind(this);
    this.handlePromotionSelect = this.handlePromotionSelect.bind(this);
  }

  componentDidMount() {
    this.setState({ // eslint-disable-line
      whiteKing: this.state.board[7][4],
      blackKing: this.state.board[0][4],
    });
  }

  selectPiece(event) {
    if (this.state.promotion) {
      return null;
    }

    const classes = event.target.className.split(' ');
    const pieceLoc = this.state.selectedPiece;
    const pieceColor = classes[1];
    const endLoc = event.target.id;
    let moveable;

    if (pieceColor === this.state.turn.toLowerCase()) {
      const selected = endLoc;
      this.setState({ selectedPiece: selected });
      return null;
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

        const lastRow = piece.color === 'white' ? 0 : 7;
        let promotion = false;
        if (piece.type === 'pawn' && lastRow === Number(endLoc.slice(1, 2))) {
          promotion = piece;
        }

        const kingInCheck = this.opposingKingInCheck(piece, board);
        let checkOriginator;
        if (kingInCheck) {
          checkOriginator = piece;
        }
        this.playTurn(board, kingInCheck, promotion, checkOriginator);
      }
    }
    return null;
  }

  copyBoard() {
    const curBoard = this.state.board;
    const copiedBoard = [];
    for (let key in curBoard) { // eslint-disable-line
      copiedBoard[key] = curBoard[key].slice();
    }
    return copiedBoard;
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

  playTurn(board, inCheck, promo, checkOrigin) {
    const promotion = promo || false;
    const turn = this.state.turn === 'White' ? 'Black' : 'White';
    const checkDisplay = !!inCheck;
    const selectedPiece = null;
    const checkOriginator = checkOrigin || null;
    this.setState({
      board,
      turn,
      selectedPiece,
      inCheck,
      promotion,
      checkDisplay,
      checkOriginator,
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
      const king = piece.color === 'white' ? this.state.whiteKing.loc : this.state.blackKing.loc;
      kingInCheck = checkIfCheck(board, king, piece.color);
    }

    if (kingInCheck) {
      moveable = false;
    }

    return moveable;
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
    rook.loc = castleEnd;
    return this.movePiece(castleStart, castleEnd, board);
  }

  opposingKingInCheck(piece, board) {
    let kingInCheck = '';
    const opposingKingColor = piece.color === 'white' ? 'black' : 'white';
    const opposingKingLoc = this.state[`${opposingKingColor}King`].loc;
    if (checkIfCheck(board, opposingKingLoc, opposingKingColor)) {
      kingInCheck = opposingKingColor;
    }
    return kingInCheck;
  }

  handlePromotionSelect(event) { // eslint-disable-line
    const classes = event.target.className.split(' ');
    const selection = classes[1];
    const board = this.copyBoard();

    const { loc, color } = this.state.promotion;
    const row = loc.slice(1, 2);
    const col = loc.slice(3);

    switch (selection) {
      case 'queen':
        board[row][col] = new Queen(color, loc);
        break;
      case 'rook':
        board[row][col] = new Rook(color, loc);
        break;
      case 'knight':
        board[row][col] = new Knight(color, loc);
        break;
      case 'bishop':
        board[row][col] = new Bishop(color, loc);
        break;
      default:
        return null;
    }
    const promotion = false;
    this.setState({
      board,
      promotion,
    });
  }

  handlePromotionRender() {
    const piece = this.state.promotion;
    let queenImg, rookImg, knightImg, bishopImg; // eslint-disable-line

    if (piece.color === 'white') {
      queenImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteQueen.png';
      rookImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteRook.png';
      knightImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteKnight.png';
      bishopImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteBishop.png';
    } else {
      queenImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/blackQueen.png';
      rookImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/blackRook.png';
      knightImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/blackKnight.png';
      bishopImg = 'https://s3-us-west-1.amazonaws.com/chess-icons/blackBishop.png';
    }
    return (
      <div>
        <button className="queen" onClick={this.handlePromotionSelect}>
          <img
            className="promoSelect queen"
            alt={`${piece.color}-queen`}
            src={queenImg}
          />
        </button>
        <button className="rook" onClick={this.handlePromotionSelect}>
          <img
            className="promoSelect rook"
            alt={`${piece.color}-rook`}
            src={rookImg}
          />
        </button>
        <button className="knight" onClick={this.handlePromotionSelect}>
          <img
            className="promoSelect knight"
            alt={`${piece.color}-knight`}
            src={knightImg}
          />
        </button>
        <button className="bishop" onClick={this.handlePromotionSelect}>
          <img
            className="promoSelect bishop"
            alt={`${piece.color}-bishop`}
            src={bishopImg}
          />
        </button>
      </div>
    );
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

  renderHeaders() {
    const { promotion } = this.state;
    const check = this.state.checkDisplay;

    if (promotion) {
      return (
        <div className="promotionContainer">
          <h3>Select Pawn Promotion</h3>
          {this.handlePromotionRender()}
        </div>
      );
    }
    if (check) {
      setTimeout(() => {
        this.setState({
          checkDisplay: false,
        });
      }, 1500);
      return (
        <h1 id="title">Check!</h1>
      );
    }
    return (
      <h1 id="title">{`${this.state.turn}'s Move`}</h1>
    );
  }

  render() {
    return (
      <div id="appContainer">
        {this.renderHeaders()}
        <div id="boardContainer">
          {this.renderBoard(this.state.board)}
        </div>
      </div>
    );
  }
}

export default Board;
