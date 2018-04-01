import React from 'react';

import Pawn from '../components/pawn';
import Bishop from '../components/bishop';
import Knight from '../components/knight';
import Rook from '../components/rook';
import Queen from '../components/queen';
import King from '../components/king';

const renderHelpers = {
  renderPiece: (piece, location) => {
    const color = piece[0] === 'w' ? 'white' : 'black';

    switch (piece[1]) {
      case 'P':
        return (<Pawn color={color} loc={location} />);
      case 'R':
        return (<Rook color={color} loc={location} />);
      case 'N':
        return (<Knight color={color} loc={location} />);
      case 'B':
        return (<Bishop color={color} loc={location} />);
      case 'Q':
        return (<Queen color={color} loc={location} />);
      case 'K':
        return (<King color={color} loc={location} />);
      default:
        return (null);
    }
  },
};

export default renderHelpers;
