const pawnMove = (board, startLoc, endLoc, team) => {
  const startRow = Number(startLoc[1]);
  const endRow = Number(endLoc[1]);
  const startCol = Number(startLoc[3]);
  const endCol = Number(endLoc[3]);
  const color = team.toLowerCase() === 'white' ? 'w' : 'b';

  if (Math.abs(startRow - endRow) > 2) {
    return false;
  }

  if (color === 'b') {
    if (startRow === 1 && endRow === 3) {
      const row2Piece = board[2][startCol];
      const row3Piece = board[3][startCol];
      if (!row2Piece && !row3Piece && startCol === endCol) {
        return true;
      }
    } else if (endRow - startRow === 1) {
      const endPiece = board[endRow][endCol];
      if (!endPiece && startCol === endCol) {
        return true;
      } else if (Math.abs(startCol - endCol) === 1 && endPiece[0] !== color) {
        return true;
      }
    }
  } else if (color === 'w') {
    if (startRow === 6 && endRow === 4) {
      const row5Piece = board[5][startCol];
      const row4Piece = board[4][startCol];
      if (!row5Piece && !row4Piece && startCol === endCol) {
        return true;
      }
    } else if (startRow - endRow === 1) {
      const endPiece = board[endRow][endCol];

      if (!endPiece && startCol === endCol) {
        return true;
      } else if (Math.abs(startCol - endCol) === 1 && endPiece && endPiece[0] !== color) {
        return true;
      }
    }
  }
  return false;
};

export default pawnMove;
