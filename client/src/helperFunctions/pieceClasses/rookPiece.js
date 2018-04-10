import Piece from './createPiece';
import rookMove from '../moveFuncs/rookMoves';

class Rook extends Piece {
  constructor(color, location) {
    super(color, location);
    this.type = 'rook';
    this.hasMoved = false;
  }
  move(board, endLoc) {
    return rookMove(board, this.loc, endLoc, this.color);
  }
}

export default Rook;
