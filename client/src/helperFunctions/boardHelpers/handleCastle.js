import movePiece from './movePiece';

const handleCastle = (directionString, row, board) => {
  let castleDirection = directionString.split(' ');
  castleDirection = castleDirection[1]; // eslint-disable-line

  const castleFromCol = castleDirection === 'left' ? 0 : 7;
  const castleToCol = castleDirection === 'left' ? 3 : 5;
  const rook = board[row][castleFromCol];
  const castleStart = `r${row}c${castleFromCol}`;
  const castleEnd = `r${row}c${castleToCol}`;

  rook.hasMoved = true;
  rook.loc = castleEnd;
  return movePiece(castleStart, castleEnd, board);
};

export default handleCastle;
