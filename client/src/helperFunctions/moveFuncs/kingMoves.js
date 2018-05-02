import inCheck from '../boardHelpers/inCheck';
import copyBoard from '../boardHelpers/copyBoard';
import movePiece from '../boardHelpers/movePiece';

const kingMove = (board, startLoc, endLoc, color) => {
  const startRow = Number(startLoc.slice(1, 2));
  const endRow = Number(endLoc.slice(1, 2));
  const startCol = Number(startLoc.slice(3));
  const endCol = Number(endLoc.slice(3));

  const king = board[startRow][startCol];
  const sameRow = startRow === endRow;

  // address right castles
  if (!king.hasMoved && endCol === 6 && sameRow) {
    const checked = inCheck(board, startLoc, color);
    const rook = board[startRow][7];
    if (rook.type === 'rook' && !rook.hasMoved && !checked) {
      const pieceCol5 = board[startRow][5].type;
      const pieceCol6 = board[startRow][6].type;
      const checkCol5 = inCheck(board, `r${startRow}c5`, color);
      const checkCol6 = inCheck(board, `r${startRow}c6`, color);

      if (!pieceCol5 && !pieceCol6 && !checkCol5 && !checkCol6) {
        return 'castle right';
      }
    }
  }
  // address left castles
  if (!king.hasMoved && endCol === 2 && sameRow) {
    const checked = inCheck(board, startLoc, color);
    const rook = board[startRow][0];
    if (rook.type === 'rook' && !rook.hasMoved && !checked) {
      const pieceCol3 = board[startRow][3].type;
      const pieceCol2 = board[startRow][2].type;
      const pieceCol1 = board[startRow][1].type;
      const checkCol3 = inCheck(board, `r${startRow}c3`, color);
      const checkCol2 = inCheck(board, `r${startRow}c2`, color);

      if (!pieceCol3 && !pieceCol2 && !pieceCol1 && !checkCol3 && !checkCol2) {
        return 'castle left';
      }
    }
  }


  if (Math.abs(startRow - endRow) > 1 || Math.abs(startCol - endCol) > 1) {
    return false;
  }
  const endPiece = board[endRow][endCol];
  if (endPiece.color === color) {
    return false;
  }
  const movedBoard = movePiece(startLoc, endLoc, copyBoard(board));
  const endsInCheck = (inCheck(movedBoard, endLoc, color));
  if (endsInCheck) {
    return false;
  }
  const path = [startLoc, endLoc];
  return path;
};

export default kingMove;
