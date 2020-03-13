import Piece from './createPiece';
import pawnMove from '../moveFuncs/pawnMoves';

class Pawn extends Piece {
  constructor(color, location) {
    super(color, location);
    this.type = 'pawn';
  }
  move(board, endLoc) {
    return pawnMove(board, this.loc, endLoc, this.color);
  }
}

export default Pawn;
