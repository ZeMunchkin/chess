import helpers from './moveHelpers';

const rookMove = (board, startLoc, endLoc, team) => {
  const rowPath = helpers.byRow(board, startLoc, endLoc, team);
  if (rowPath) {
    return rowPath;
  }

  const colPath = helpers.byCol(board, startLoc, endLoc, team);
  if (colPath) {
    return colPath;
  }

  return false;
};

export default rookMove;
