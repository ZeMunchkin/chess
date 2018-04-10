const kingMove = (board, startLoc, endLoc, color) => {
  const startRow = Number(startLoc.slice(1, 2));
  const endRow = Number(endLoc.slice(1, 2));
  const startCol = Number(startLoc.slice(3));
  const endCol = Number(endLoc.slice(3));

  if (Math.abs(startRow - endRow) > 1 || Math.abs(startCol - endCol) > 1) {
    return false;
  }
  const endPiece = board[endRow][endCol];
  if (endPiece.color === color) {
    return false;
  }
  return true;
};

export default kingMove;
