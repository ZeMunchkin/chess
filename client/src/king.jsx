import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackKing.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteKing.png',
};

const King = props => (
  <div className="king">
    <img
      className="piece"
      alt={`${props.color}-king`}
      src={images[props.color]}
    />
  </div>
);

export default King;

King.propTypes = {
  color: propTypes.string.isRequired,
};
