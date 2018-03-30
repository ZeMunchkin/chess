import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackKnight.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteKnight.png',
};

const Knight = props => (
  <div className="knight">
    <img
      className="piece"
      alt={`${props.color}-knight`}
      src={images[props.color]}
    />
  </div>
);

export default Knight;

Knight.propTypes = {
  color: propTypes.string.isRequired,
};
