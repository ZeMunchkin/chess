import kingMove from './kingMoves';
import queenMove from './queenMoves';
import rookMove from './rookMoves';
import knightMove from './knightMoves';
import bishopMove from './bishopMoves';
import pawnMove from './pawnMoves';

const inCheck = (board, kingLoc, kingTeam) => {
  const kingColor = kingTeam.toLowerCase() === 'white' ? 'w' : 'b';
  const opposingColor = kingTeam.toLowerCase() === 'white' ? 'black' : 'white';

  const pieceMoves = {
    K: kingMove,
    Q: queenMove,
    R: rookMove,
    N: knightMove,
    B: bishopMove,
    P: pawnMove,
  };

  for (let i = 0; i < board.length; i += 1) {
    const curRow = board[i];
    for (let j = 0; j < curRow.length; j += 1) {
      const curPiece = board[i][j];
      if (curPiece && curPiece[0] !== kingColor) {
        const curLoc = `r${i}c${j}`;
        const type = curPiece[1];
        const kingInCheck = pieceMoves[type](board, curLoc, kingLoc, opposingColor);
        if (kingInCheck) {
          return true;
        }
      }
    }
  }
  return false;
};

export default inCheck;
