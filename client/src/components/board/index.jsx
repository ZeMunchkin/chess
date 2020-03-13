import React from 'react';

import Square from '../square/index';
import Queen from '../../utils/pieceClasses/queenPiece';
import Rook from '../../utils/pieceClasses/rookPiece';
import Knight from '../../utils/pieceClasses/knightPiece';
import Bishop from '../../utils/pieceClasses/bishopPiece';

import createState from '../../utils/boardHelpers/createState';
import copyBoard from '../../utils/boardHelpers/copyBoard';
import checkIfCheck from '../../utils/boardHelpers/inCheck';
import movePiece from '../../utils/boardHelpers/movePiece';
import handleCastle from '../../utils/boardHelpers/handleCastle';
import checkValidMove from '../../utils/boardHelpers/checkValidMove';
import opposingKingInCheck from '../../utils/boardHelpers/opposingKingInCheck';
import checkForCheckmate from '../../utils/boardHelpers/checkMate';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = createState();
    this.selectPiece = this.selectPiece.bind(this);
    this.handlePromotionSelect = this.handlePromotionSelect.bind(this);
  }


  componentDidMount() {
    this.setState({ // eslint-disable-line
      whiteKing: this.state.board[7][4],
      blackKing: this.state.board[0][4],
    });
  }


  newGame() {
    this.setState(createState());
  }


  selectPiece(event) {
    if (this.state.promotion || this.state.checkMate) {
      return null;
    }

    const classes = event.target.className.split(' ');
    const pieceLoc = this.state.selectedPiece;
    const pieceColor = classes[1];
    const endLoc = event.target.id;
    let moveable;

    // set selected piece
    if (pieceColor === this.state.turn.toLowerCase()) {
      const selected = endLoc;
      this.setState({ selectedPiece: selected });
      return null;
    }

    // move piece already selected
    if (pieceLoc) {
      moveable = checkValidMove(
        endLoc, this.state.selectedPiece, copyBoard(this.state.board),
        this.state.whiteKing, this.state.blackKing,
      );

      if (moveable) {
        const pieceRow = pieceLoc.slice(1, 2);
        const pieceCol = pieceLoc.slice(3);
        const piece = this.state.board[pieceRow][pieceCol];
        let board = movePiece(pieceLoc, endLoc, copyBoard(this.state.board));
        piece.loc = endLoc;

        if (typeof moveable === 'string') {
          board = handleCastle(moveable, pieceRow, board);
        }

        if (piece.type === 'rook' || piece.type === 'king') {
          piece.hasMoved = true;
        }

        const lastRow = piece.color === 'white' ? 0 : 7;
        let promotion = false;
        if (piece.type === 'pawn' && lastRow === Number(endLoc.slice(1, 2))) {
          promotion = piece;
        }

        const opposingCheck = opposingKingInCheck(piece, board, this);

        const { kingInCheck, checkOriginationPaths } = opposingCheck;
        let checkMate = false;
        let checkMatePaths = [];
        const opposingKing = piece.color === 'white' ? this.state.blackKing : this.state.whiteKing;
        if (kingInCheck) {
          checkMatePaths = checkForCheckmate(board, opposingKing, checkOriginationPaths);
          checkMate = !!checkMatePaths;
        }
        this.playTurn(board, kingInCheck, promotion, checkMate, checkMatePaths);
      }
    }
    return null;
  }


  playTurn(board, inCheck, promo, checkMate, checkMatePaths) {
    const promotion = promo || false;
    const turn = this.state.turn === 'White' ? 'Black' : 'White';
    const checkDisplay = !!inCheck;
    const selectedPiece = null;
    this.setState({
      board,
      turn,
      selectedPiece,
      inCheck,
      promotion,
      checkDisplay,
      checkMate,
      checkMatePaths,
    });
  }


  handlePromotionSelect(event) { // eslint-disable-line
    const classes = event.target.className.split(' ');
    const selection = classes[1];
    const board = copyBoard(this.state.board);

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

    const opposingKingColor = color === 'white' ? 'black' : 'white';
    let inCheck = '';
    const kingInCheck = checkIfCheck(board, this.state[`${opposingKingColor}King`].loc, opposingKingColor);

    if (kingInCheck) {
      inCheck = opposingKingColor;
    }

    const promotion = false;
    const checkDisplay = !!kingInCheck;

    this.setState({
      board,
      promotion,
      inCheck,
      checkDisplay,
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

    const returnCheckMatePath = (row, col) => {
      const loc = `r${row}c${col}`;
      const paths = this.state.checkMatePaths;
      for (let i = 0; i < paths.length; i += 1) {
        const curPath = paths[i];
        if (curPath.includes(loc)) {
          return true;
        }
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
              checkMatePath={returnCheckMatePath(rowIndex, colIndex)}
              key={`r${rowIndex}c${colIndex}`} /* eslint-disable-line */
            />
          ))}
        </div>
      ))
    );
  }


  renderHeaders() {
    const { promotion, checkMate } = this.state;
    const check = this.state.checkDisplay;

    if (checkMate) {
      return (
        <h1 id="title">Checkmate!</h1>
      );
    }

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
