import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackRook.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteRook.png',
};

const Rook = props => (
  <div className="rook">
    <img
      className="piece"
      alt={`${props.color}-rook`}
      src={images[props.color]}
    />
  </div>
);

export default Rook;

Rook.propTypes = {
  color: propTypes.string.isRequired,
};
