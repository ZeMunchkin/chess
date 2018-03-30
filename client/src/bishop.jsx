import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackBishop.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteBishop.png',
};

const Bishop = props => (
  <div className="bishop">
    <img
      className="piece"
      alt={`${props.color}-bishop`}
      src={images[props.color]}
    />
  </div>
);

export default Bishop;

Bishop.propTypes = {
  color: propTypes.string.isRequired,
};
