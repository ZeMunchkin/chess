import kingMove from './kingMoves';
import queenMove from './queenMoves';
import rookMove from './rookMoves';
import knightMove from './knightMoves';
import bishopMove from './bishopMoves';
import pawnMove from './pawnMoves';

const inCheck = (board, kingLoc, kingTeam) => {
  const opposingColor = kingTeam.toLowerCase() === 'white' ? 'black' : 'white';

  const pieceMoves = {
    king: kingMove,
    queen: queenMove,
    rook: rookMove,
    knight: knightMove,
    bishop: bishopMove,
    pawn: pawnMove,
  };

  for (let i = 0; i < board.length; i += 1) {
    const curRow = board[i];
    for (let j = 0; j < curRow.length; j += 1) {
      const curPiece = board[i][j];
      if (curPiece.type && curPiece.color !== kingTeam.toLowerCase()) {
        const { type } = curPiece;
        const kingInCheck = pieceMoves[type](board, curPiece.loc, kingLoc, opposingColor);
        if (kingInCheck) {
          return true;
        }
      }
    }
  }
  return false;
};

export default inCheck;
