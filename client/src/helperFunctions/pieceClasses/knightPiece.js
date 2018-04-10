import Piece from './createPiece';
import knightMove from '../moveFuncs/knightMoves';

class Knight extends Piece {
  constructor(color, location) {
    super(color, location);
    this.type = 'knight';
  }
  move(board, endLoc) {
    return knightMove(board, this.loc, endLoc, this.color);
  }
}

export default Knight;
