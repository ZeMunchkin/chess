const inCheck = (board, kingLoc, kingTeam) => {
  const allPaths = [];

  for (let i = 0; i < board.length; i += 1) {
    const curRow = board[i];
    for (let j = 0; j < curRow.length; j += 1) {
      const curPiece = board[i][j];
      if (curPiece.type && curPiece.color !== kingTeam.toLowerCase()) {
        const kingInCheck = curPiece.move(board, kingLoc);
        if (kingInCheck) {
          allPaths.push(kingInCheck);
        }
      }
    }
  }

  if (allPaths.length > 0) {
    return allPaths;
  }

  return false;
};

export default inCheck;
