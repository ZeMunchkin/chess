const pawnMove = (board, startLoc, endLoc, team) => {
  const startRow = Number(startLoc.slice(1, 2));
  const endRow = Number(endLoc.slice(1, 2));
  const startCol = Number(startLoc.slice(3));
  const endCol = Number(endLoc.slice(3));

  const color = team.toLowerCase();

  if (Math.abs(startRow - endRow) > 2) {
    return false;
  }

  if (color === 'black') {
    if (startRow === 1 && endRow === 3) {
      const row2Piece = board[2][startCol];
      const row3Piece = board[3][startCol];
      if (!row2Piece.type && !row3Piece.type && startCol === endCol) {
        return true;
      }
    } else if (endRow - startRow === 1) {
      const endPiece = board[endRow][endCol];
      if (!endPiece.type && startCol === endCol) {
        return true;
      } else if (Math.abs(startCol - endCol) === 1 && endPiece.type && endPiece.color !== color) {
        return true;
      }
    }
  } else if (color === 'white') {
    if (startRow === 6 && endRow === 4) {
      const row5Piece = board[5][startCol];
      const row4Piece = board[4][startCol];
      if (!row5Piece.type && !row4Piece.type && startCol === endCol) {
        return true;
      }
    } else if (startRow - endRow === 1) {
      const endPiece = board[endRow][endCol];

      if (!endPiece.type && startCol === endCol) {
        return true;
      } else if (Math.abs(startCol - endCol) === 1 && endPiece.type && endPiece.color !== color) {
        return true;
      }
    }
  }
  return false;
};

export default pawnMove;
