import React from 'react';

import Pawn from '../components/pawn/index';
import Bishop from '../components/bishop/index';
import Knight from '../components/knight/index';
import Rook from '../components/rook/index';
import Queen from '../components/queen/index';
import King from '../components/king/index';

const renderPiece = (piece, location) => {
  if (!piece) {
    return null;
  }

  const { color } = piece;

  switch (piece.type) {
    case 'pawn':
      return (<Pawn color={color} loc={location} />);
    case 'rook':
      return (<Rook color={color} loc={location} />);
    case 'knight':
      return (<Knight color={color} loc={location} />);
    case 'bishop':
      return (<Bishop color={color} loc={location} />);
    case 'queen':
      return (<Queen color={color} loc={location} />);
    case 'king':
      return (<King color={color} loc={location} />);
    default:
      return (null);
  }
};

export default renderPiece;
