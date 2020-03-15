import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import GameStore from './stores/gameStore/index';
import Board from './components/board/index';
import App from './app';

const stores = {
  gameStore: new GameStore(),
};

render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
