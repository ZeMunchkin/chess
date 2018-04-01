const knightMove = (board, startLoc, endLoc, team) => {
  const startRow = Number(startLoc[1]);
  const endRow = Number(endLoc[1]);
  const startCol = Number(startLoc[3]);
  const endCol = Number(endLoc[3]);

  const color = team.toLowerCase() === 'white' ? 'w' : 'b';
  const curPiece = board[endRow][endCol];
  if (curPiece && curPiece[0] === color) {
    return false;
  }

  const rowChange = Math.abs(startRow - endRow);
  const colChange = Math.abs(startCol - endCol);
  if (rowChange === 2 && colChange === 1) {
    return true;
  }
  if (rowChange === 1 && colChange === 2) {
    return true;
  }
  return false;
};

export default knightMove;
