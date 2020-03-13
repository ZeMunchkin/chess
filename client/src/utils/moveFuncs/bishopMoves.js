import helpers from './moveHelpers';

const bishopMove = (board, startLoc, endLoc, team) => {
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

export default bishopMove;
