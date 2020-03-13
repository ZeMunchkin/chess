const movePiece = (fromId, toId, board) => {
  const toRow = toId.slice(1, 2);
  const toCol = toId.slice(3);
  const fromRow = fromId.slice(1, 2);
  const fromCol = fromId.slice(3);

  const piece = board[fromRow][fromCol];
  board[toRow][toCol] = piece; // eslint-disable-line
  board[fromRow][fromCol] = {}; // eslint-disable-line

  return board;
};

export default movePiece;
