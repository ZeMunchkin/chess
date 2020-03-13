import Piece from './createPiece';
import bishopMove from '../moveFuncs/bishopMoves';

class Bishop extends Piece {
  constructor(color, location) {
    super(color, location);
    this.type = 'bishop';
  }
  move(board, endLoc) {
    return bishopMove(board, this.loc, endLoc, this.color);
  }
}

export default Bishop;
