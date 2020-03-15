import { observable, decorate } from 'mobx';
import PropTypes from 'prop-types';

import INITIAL_BOARD_STATE from '../../constants/startingBoardState';
import { PIECE_PROP_TYPES } from '../../constants/index';
import { createLocationHash } from '../../utils/locationHash';

class GameStore {
  constructor() {
    this.board = {};
    this.whiteKingLocation = [7, 4];
    this.blackKingLocation = [0, 4];
  }

  initializeGame() {
    INITIAL_BOARD_STATE.forEach(piece => {
      const locationHash = createLocationHash(piece.row, piece.column);
      this.board[locationHash] = Object.assign({}, piece);
    });
  }

  getPiece(row, column) {
    const locationHash = createLocationHash(row, column);
    return this.board[locationHash];
  }

  movePiece(startLocation, endLocation) {
    const [startRow, startColumn] = startLocation;
    const [endRow, endColumn] = endLocation;

    const startLocationHash = createLocationHash(startRow, startColumn);
    const endLocationHash = createLocationHash(endRow, endColumn);
    const piece = this.board[startLocationHash];

    piece.row = endRow;
    piece.column = endColumn;
    piece.hasMoved = true;
    this.board[endLocationHash] = piece;
    delete this.board[startLocationHash];
  }
}

export const GAME_STORE_PROP_TYPES = PropTypes.shape({
  board: PropTypes.objectOf(PIECE_PROP_TYPES).isRequired,
  whiteKingLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  blackKingLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  initializeGame: PropTypes.func.isRequired,
  getPiece: PropTypes.func.isRequired,
  movePiece: PropTypes.func.isRequired,
});

export default decorate(GameStore, {
  board: observable,
  whiteKingLocation: observable,
  blackKingLocation: observable,
});

