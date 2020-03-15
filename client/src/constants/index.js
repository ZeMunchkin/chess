import PropTypes from 'prop-types';

export const BOARD_SIZE = 8;

export const WHITE_TEAM = 'white';
export const BLACK_TEAM = 'black';

export const BISHOP = 'bishop';
export const KING = 'king';
export const KNIGHT = 'knight';
export const PAWN = 'pawn';
export const QUEEN = 'queen';
export const ROOK = 'rook';

export const PIECE_PROP_TYPES = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf([ BISHOP, KING, KNIGHT, PAWN, QUEEN, ROOK ]).isRequired,
  team: PropTypes.oneOf([ WHITE_TEAM, BLACK_TEAM ]).isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  hasMoved: PropTypes.boolean,
});

export const PIECE_DEFAULT_PROPS = {
  hasMoved: false,
};
