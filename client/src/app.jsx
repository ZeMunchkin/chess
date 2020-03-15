import React from 'react';
import { inject } from 'mobx-react';

import { GAME_STORE_PROP_TYPES } from './stores/gameStore/index';
import Game from './components/game/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    props.gameStore.initializeGame();
  }

  render() {
    return (
      <Game />
    );
  }
}

App.propTypes = {
  gameStore: GAME_STORE_PROP_TYPES.isRequired,
};

export default inject('gameStore')(App);
