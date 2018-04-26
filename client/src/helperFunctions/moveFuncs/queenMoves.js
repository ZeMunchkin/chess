import helpers from './moveHelpers';

const queenMove = (board, startLoc, endLoc, team) => {
  const rowPath = helpers.byRow(board, startLoc, endLoc, team);
  if (rowPath) {
    return rowPath;
  }

  const colPath = helpers.byCol(board, startLoc, endLoc, team);
  if (colPath) {
    return colPath;
  }

  const majorPath = helpers.byMajorDiag(board, startLoc, endLoc, team);
  if (majorPath) {
    return majorPath;
  }

  const minorPath = helpers.byMinorDiag(board, startLoc, endLoc, team);
  if (minorPath) {
    return minorPath;
  }

  return false;
};

export default queenMove;
