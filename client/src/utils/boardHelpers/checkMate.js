const checkForCheckmate = (board, king, paths) => { // eslint-disable-line
  const startRow = Number(king.loc.slice(1, 2));
  const startCol = Number(king.loc.slice(3));

  // can the king move anywhere
  const locChanges = [-1, 0, 1];
  for (let i = 0; i < locChanges.length; i += 1) {
    const rowIndex = startRow + locChanges[i];
    if (rowIndex >= 0 && rowIndex <= 7) {
      for (let j = 0; j < locChanges.length; j += 1) {
        const colIndex = startCol + locChanges[j];
        if (colIndex >= 0 && colIndex <= 7) {
          const endLoc = `r${rowIndex}c${colIndex}`;
          if (king.move(board, endLoc)) {
            return false;
          }
        }
      }
    }
  }

  // can any other piece move to protect the king?
  const numPaths = paths.length;

  if (numPaths > 1) {
    let intersection;
    const firstPath = paths[0];
    const secondPath = paths[1];

    for (let i = 0; i < firstPath.length; i += 1) {
      const curLoc = firstPath[i];
      if (secondPath.includes(curLoc)) {
        intersection = curLoc;
        break;
      }
    }

    if (!intersection || intersection === king.loc) {
      return paths;
    }

    if (numPaths > 2) {
      for (let i = 2; i < numPaths; i += 1) {
        const curPath = paths[i];
        if (!curPath.includes(intersection)) {
          return paths;
        }
      }
    }

    for (let i = 0; i < board.length; i += 1) {
      const curRow = board[i];
      for (let j = 0; j < curRow.length; j += 1) {
        const curPiece = curRow[j];

        if (curPiece.color === king.color) {
          if (curPiece.move(board, intersection)) {
            return false;
          }
        }
      }
    }
  } else {
    const curPath = paths[0];
    for (let i = 0; i < board.length; i += 1) {
      const curRow = board[i];
      for (let j = 0; j < curRow.length; j += 1) {
        const curPiece = curRow[j];

        if (curPiece.color === king.color) {
          for (let l = 0; l < curPath.length; l += 1) {
            const loc = curPath[l];
            if (curPiece.move(board, loc)) {
              return false;
            }
          }
        }
      }
    }
  }

  return paths;
};

export default checkForCheckmate;
