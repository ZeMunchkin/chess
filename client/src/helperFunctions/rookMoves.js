import helpers from './moveHelpers';

const rookMove = (board, startLoc, endLoc, team) => {
  if (helpers.byRow(board, startLoc, endLoc, team)) {
    return true;
  }
  if (helpers.byCol(board, startLoc, endLoc, team)) {
    return true;
  }
  return false;
};

export default rookMove;
