import React from 'react';
import Pawn from './pawn';
import Bishop from './bishop';
import Knight from './knight';
import Rook from './rook';
import Queen from './queen';
import King from './king';

const renderRules = (string) => {
  const color = string[0] === 'w' ? 'white' : 'black';

  switch (string[1]) {
    case 'P':
      return (<Pawn color={color} />);
    case 'R':
      return (<Rook color={color} />);
    case 'N':
      return (<Knight color={color} />);
    case 'B':
      return (<Bishop color={color} />);
    case 'Q':
      return (<Queen color={color} />);
    case 'K':
      return (<King color={color} />);
    default:
      return null;
  }
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        0: ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
        1: ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
        2: ['', '', '', '', '', '', '', ''],
        3: ['', '', '', '', '', '', '', ''],
        4: ['', '', '', '', '', '', '', ''],
        5: ['', '', '', '', '', '', '', ''],
        6: ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
        7: ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'],
      },
      turn: 'white',
    };
  }

  // togglePiece(from, to) {

  // }


  render() {
    return (
      <div>
        <King color="black" />
      </div>
    );
  }
}

export default Board;
