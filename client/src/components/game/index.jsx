import React from 'react';
import { inject, observer } from 'mobx-react';

import { GAME_STORE_PROP_TYPES } from '../../stores/gameStore/index';
import { BOARD_SIZE, WHITE_TEAM } from '../../constants/index';
import { isShaded } from '../../utils/squareHelpers';
import Piece from '../piece';
import { Board, Square, Row } from './style';

const boardArray = new Array(BOARD_SIZE).fill(null);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamTurn: WHITE_TEAM,
    };
  }

  render() {
    const { gameStore } = this.props;

    return (
      <div>
        <h1>{this.state.teamTurn}</h1>
        <Board>
          {boardArray.map((_r, row) => (
            <Row key={`row-${row}`}>
              {boardArray.map((_c, column) => {
                const piece = gameStore.getPiece(row, column);
                return (
                  <Square
                    key={`square-${row}-${column}`}
                    isShaded={isShaded(row, column)}
                    data-row={row}
                    data-column={column}
                  >
                    {piece && <Piece piece={piece} />}
                  </Square>
                );
              })}
            </Row>
          ))}
        </Board>
      </div>
    );
  }
}

Game.propTypes = {
  gameStore: GAME_STORE_PROP_TYPES.isRequired,
};

export default inject('gameStore')(observer(Game));
