import Piece from './createPiece';
import kingMove from '../moveFuncs/kingMoves';

class King extends Piece {
  constructor(color, location) {
    super(color, location);
    this.type = 'king';
    this.hasMoved = false;
  }
  move(board, endLoc) {
    return kingMove(board, this.loc, endLoc, this.color);
  }
}

export default King;
