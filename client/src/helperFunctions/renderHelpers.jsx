import React from 'react';

import PawnClass from '../components/pawnClass';
import BishopClass from '../components/bishopClass';
import KnightClass from '../components/knightClass';
import RookClass from '../components/rookClass';
import QueenClass from '../components/queenClass';
import KingClass from '../components/kingClass';

const renderPiece = (piece, location) => {
  if (!piece) {
    return null;
  }

  const { color } = piece;

  switch (piece.type) {
    case 'pawn':
      return (<PawnClass color={color} loc={location} />);
    case 'rook':
      return (<RookClass color={color} loc={location} />);
    case 'knight':
      return (<KnightClass color={color} loc={location} />);
    case 'bishop':
      return (<BishopClass color={color} loc={location} />);
    case 'queen':
      return (<QueenClass color={color} loc={location} />);
    case 'king':
      return (<KingClass color={color} loc={location} />);
    default:
      return (null);
  }
};

export default renderPiece;
