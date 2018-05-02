import King from '../pieceClasses/kingPiece';
import Queen from '../pieceClasses/queenPiece';
import Rook from '../pieceClasses/rookPiece';
import Knight from '../pieceClasses/knightPiece';
import Bishop from '../pieceClasses/bishopPiece';
import Pawn from '../pieceClasses/pawnPiece';

const createState = () => ({
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
  checkDisplay: false,
  checkMate: false,
  checkMatePaths: [],
});

export default createState;
