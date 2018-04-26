const knightMove = (board, startLoc, endLoc, team) => {
  const startRow = Number(startLoc.slice(1, 2));
  const endRow = Number(endLoc.slice(1, 2));
  const startCol = Number(startLoc.slice(3));
  const endCol = Number(endLoc.slice(3));
  const path = [startLoc, endLoc];

  const color = team.toLowerCase();
  const curPiece = board[endRow][endCol];
  if (curPiece.type && curPiece.color === color) {
    return false;
  }

  const rowChange = Math.abs(startRow - endRow);
  const colChange = Math.abs(startCol - endCol);
  if (rowChange === 2 && colChange === 1) {
    return path;
  }
  if (rowChange === 1 && colChange === 2) {
    return path;
  }
  return false;
};

export default knightMove;
