const kingMove = (board, startLoc, endLoc, team) => {
  const startRow = Number(startLoc[1]);
  const endRow = Number(endLoc[1]);
  const startCol = Number(startLoc[3]);
  const endCol = Number(endLoc[3]);

  const color = team.toLowerCase() === 'white' ? 'w' : 'b';

  if (Math.abs(startRow - endRow) > 1 || Math.abs(startCol - endCol) > 1) {
    return false;
  }
  const endPiece = board[endRow][endCol];
  if (endPiece[0] === color) {
    return false;
  }
  return true;
};

export default kingMove;
