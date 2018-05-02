import movePiece from './movePiece';
import checkIfCheck from './inCheck';

const checkValidMove = (endLoc, pieceLoc, board, whiteKing, blkKing) => {
  const pieceRow = pieceLoc.slice(1, 2);
  const pieceCol = pieceLoc.slice(3);
  const piece = board[pieceRow][pieceCol];
  let changeKingPosition = piece.type === 'king';
  let kingInCheck;

  let moveable = piece.move(board, endLoc);

  if (!moveable) {
    return false;
  }

  const newBoard = movePiece(pieceLoc, endLoc, board);
  if (changeKingPosition) {
    kingInCheck = checkIfCheck(newBoard, endLoc, piece.color);
    changeKingPosition = false;
  } else {
    const king = piece.color === 'white' ? whiteKing.loc : blkKing.loc;
    kingInCheck = checkIfCheck(newBoard, king, piece.color);
  }

  if (kingInCheck) {
    moveable = false;
  }

  return moveable;
};

export default checkValidMove;
