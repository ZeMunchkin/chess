import Piece from './createPiece';
import queenMove from '../moveFuncs/queenMoves';

class Queen extends Piece {
  constructor(color, location) {
    super(color, location);
    this.type = 'queen';
  }
  move(board, endLoc) {
    return queenMove(board, this.loc, endLoc, this.color);
  }
}

export default Queen;
