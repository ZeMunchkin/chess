import React from 'react';
import { inject, observer } from 'mobx-react';

// import { GAME_STORE_PROP_TYPES } from '../../stores/gameStore/index';
import { BOARD_SIZE, WHITE_TEAM } from '../../constants/index';
import { isShaded } from '../../utils/squareHelpers';
import { Square, Row } from './style';

const boardArray = new Array(BOARD_SIZE).fill(null);

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamTurn: WHITE_TEAM,
    };
  }

  render() {
    return (
      <div>
        <h3>{this.state.teamTurn}</h3>
        <div>
          {boardArray.map((rowEl, row) => (
            <Row>
              {boardArray.map((colEl, column) => (
                <Square
                  isShaded={isShaded(row, column)}
                  data-row={row}
                  data-column={column}
                />
              ))}
            </Row>
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  // gameStore: GAME_STORE_PROP_TYPES.isRequired,
};

export default inject('gameStore')(observer(Game));
