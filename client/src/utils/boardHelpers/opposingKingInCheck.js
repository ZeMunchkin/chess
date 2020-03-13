import inCheck from './inCheck';

const opposingKingInCheck = (piece, board, boardComponent) => {
  const opposingKingColor = piece.color === 'white' ? 'black' : 'white';
  const opposingKing = boardComponent.state[`${opposingKingColor}King`];
  const opposingKingLoc = opposingKing.loc;
  const checkPaths = inCheck(board, opposingKingLoc, opposingKingColor);

  if (checkPaths) {
    return {
      kingInCheck: opposingKingColor,
      checkOriginationPaths: checkPaths,
    };
  }
  return { kingInCheck: '' };
};

export default opposingKingInCheck;
