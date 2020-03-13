import { observable, decorate } from 'mobx';
import PropTypes from 'prop-types';

import INITIAL_BOARD_STATE from '../../constants/startingBoardState';
import { PIECE_PROP_TYPES } from '../../constants/index';
import createLocationHash from '../../utils/createLocationHash';

class boardStore {
  constructor() {
    this.board = {};
    this.whiteKingLocation = [7, 4];
    this.blackKingLocation = [0, 4];
  }

  initializeBoard() {
    INITIAL_BOARD_STATE.forEach(piece => {
      const locationHash = createLocationHash(piece.row, piece.column);
      this.board[locationHash] = Object.assign({}, piece);
    });
  }

  movePiece(startLocation, endLocation) {
    const [startRow, startColumn] = startLocation;
    const [endRow, endColumn] = endLocation;

    const startLocationHash = createLocationHash(startRow, startColumn);
    const endLocationHash = createLocationHash(endRow, endColumn);
    const piece = this.board[startLocationHash];

    piece.row = endRow;
    piece.column = endColumn;
    this.board[endLocationHash] = piece;
    delete this.board[startLocationHash];
  }
}

export const BOARD_STORE_PROP_TYPES = PropTypes.shape({
  board: PropTypes.objectOf(PIECE_PROP_TYPES).isRequired,
  whiteKingLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  blackKingLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  initializeBoard: PropTypes.func.isRequired,
  movePiece: PropTypes.func.isRequired,
});

export default decorate(boardStore, {
  board: observable,
  whiteKingLocation: observable,
  blackKingLocation: observable,
});

