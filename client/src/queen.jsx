import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackQueen.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteQueen.png',
};

const Queen = props => (
  <div className="queen">
    <img
      className="piece"
      alt={`${props.color}-queen`}
      src={images[props.color]}
    />
  </div>
);

export default Queen;

Queen.propTypes = {
  color: propTypes.string.isRequired,
};
