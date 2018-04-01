import helpers from './moveHelpers';

const bishopMove = (board, startLoc, endLoc, team) => {
  if (helpers.byMajorDiag(board, startLoc, endLoc, team)) {
    return true;
  }
  if (helpers.byMinorDiag(board, startLoc, endLoc, team)) {
    return true;
  }
  return false;
};

export default bishopMove;
