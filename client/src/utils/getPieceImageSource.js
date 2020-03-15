import {
  WHITE_TEAM,
  BLACK_TEAM,
  BISHOP,
  KING,
  KNIGHT,
  PAWN,
  QUEEN,
  ROOK,
} from '../constants/index';

const IMAGES = {
  [WHITE_TEAM]: {
    [BISHOP]: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteBishop.png',
    [KING]: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteKing.png',
    [KNIGHT]: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteKnight.png',
    [PAWN]: 'https://s3-us-west-1.amazonaws.com/chess-icons/whitePawn.png',
    [QUEEN]: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteQueen.png',
    [ROOK]: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteRook.png',
  },
  [BLACK_TEAM]: {
    [BISHOP]: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackBishop.png',
    [KING]: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackKing.png',
    [KNIGHT]: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackKnight.png',
    [PAWN]: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackPawn.png',
    [QUEEN]: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackQueen.png',
    [ROOK]: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackRook.png',
  },
};

export const getPieceImageSource = (team, pieceType) => (
  IMAGES[team][pieceType]
);
