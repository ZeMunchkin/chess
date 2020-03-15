import React from 'react';

import { PIECE_PROP_TYPES } from '../../constants/index';
import { getPieceImageSource } from '../../utils/getPieceImageSource';
import { PieceIcon } from './style';

const Piece = ({ piece }) => (
  <PieceIcon
    src={getPieceImageSource(piece.team, piece.type)}
    alt={`${piece.team}-${piece.type}`}
  />
);

Piece.propTypes = {
  piece: PIECE_PROP_TYPES.isRequired,
};

export default Piece;
