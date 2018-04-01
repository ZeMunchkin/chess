const helpers = {
  byRow: (board, startLoc, endLoc, team) => {
    if (startLoc === endLoc) {
      return false;
    }

    const startRow = Number(startLoc[1]);
    const endRow = Number(endLoc[1]);
    if (startRow !== endRow) {
      return false;
    }

    const color = team.toLowerCase() === 'white' ? 'w' : 'b';
    const startCol = Number(startLoc[3]);
    const endCol = Number(endLoc[3]);

    if (startCol > endCol) {
      for (let i = startCol - 1; i >= endCol; i -= 1) {
        const curPiece = board[startRow][i];
        if (curPiece && i !== endCol) {
          return false;
        }
        if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    } else {
      for (let i = startCol + 1; i <= endCol; i += 1) {
        const curPiece = board[startRow][i];
        if (curPiece && i !== endCol) {
          return false;
        }
        if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    }
    return true;
  },

  byCol: (board, startLoc, endLoc, team) => {
    if (startLoc === endLoc) {
      return false;
    }

    const startCol = Number(startLoc[3]);
    const endCol = Number(endLoc[3]);
    if (startCol !== endCol) {
      return false;
    }
    const color = team.toLowerCase() === 'white' ? 'w' : 'b';
    const startRow = Number(startLoc[1]);
    const endRow = Number(endLoc[1]);

    if (startRow > endRow) {
      for (let i = startRow - 1; i >= endRow; i -= 1) {
        const curPiece = board[i][startCol];
        if (curPiece && i !== endRow) {
          return false;
        }
        if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    } else {
      for (let i = startRow + 1; i <= endRow; i += 1) {
        const curPiece = board[i][startCol];
        if (curPiece && i !== endRow) {
          return false;
        }
        if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    }
    return true;
  },

  // go from tl to br
  byMajorDiag: (board, startLoc, endLoc, team) => {
    if (startLoc === endLoc) {
      return false;
    }

    const startRow = Number(startLoc[1]);
    const endRow = Number(endLoc[1]);
    const startCol = Number(startLoc[3]);
    const endCol = Number(endLoc[3]);

    if (startRow - endRow !== startCol - endCol) {
      return false;
    }
    const color = team.toLowerCase() === 'white' ? 'w' : 'b';

    if (startRow - endRow < 0) {
      const max = endRow - startRow;
      for (let i = 1; i <= max; i += 1) {
        const curPiece = board[startRow + i][startCol + i];
        if (curPiece && startRow + i !== endRow) {
          return false;
        } else if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    } else {
      const max = startRow - endRow;
      for (let i = 1; i <= max; i += 1) {
        const curPiece = board[startRow - i][startCol - i];
        if (curPiece && startRow - i !== endRow) {
          return false;
        } else if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    }
    return true;
  },

  // go from tr to bl
  byMinorDiag: (board, startLoc, endLoc, team) => {
    if (startLoc === endLoc) {
      return false;
    }

    const startRow = Number(startLoc[1]);
    const endRow = Number(endLoc[1]);
    const startCol = Number(startLoc[3]);
    const endCol = Number(endLoc[3]);

    if (startRow - endRow !== -(startCol - endCol)) {
      return false;
    }
    const color = team.toLowerCase() === 'white' ? 'w' : 'b';

    if (startRow - endRow < 0) {
      const max = endRow - startRow;
      for (let i = 1; i <= max; i += 1) {
        const curPiece = board[startRow + i][startCol - i];
        if (curPiece && startRow + i !== endRow) {
          return false;
        } else if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    } else {
      const max = startRow - endRow;
      for (let i = 1; i <= max; i += 1) {
        const curPiece = board[startRow - i][startCol + i];
        if (curPiece && startRow - i !== endRow) {
          return false;
        } else if (curPiece && curPiece[0] === color) {
          return false;
        }
      }
    }
    return true;
  },
};

export default helpers;
