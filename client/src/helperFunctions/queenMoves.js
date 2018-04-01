import helpers from './moveHelpers';

const queenMove = (board, startLoc, endLoc, team) => {
  if (helpers.byRow(board, startLoc, endLoc, team)) {
    return true;
  }
  if (helpers.byCol(board, startLoc, endLoc, team)) {
    return true;
  }
  if (helpers.byMajorDiag(board, startLoc, endLoc, team)) {
    return true;
  }
  if (helpers.byMinorDiag(board, startLoc, endLoc, team)) {
    return true;
  }
  return false;
};

export default queenMove;
