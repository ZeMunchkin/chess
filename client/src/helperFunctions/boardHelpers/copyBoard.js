const copyBoard = (curBoard) => {
  const copiedBoard = [];
  for (let key in curBoard) { // eslint-disable-line
    copiedBoard[key] = curBoard[key].slice();
  }
  return copiedBoard;
};

export default copyBoard;
