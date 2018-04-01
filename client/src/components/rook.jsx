import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackRook.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteRook.png',
};

const Rook = props => (
  <img
    id={props.loc}
    className={`piece ${props.color} rook`}
    alt={`${props.color}-rook`}
    src={images[props.color]}
  />
);

export default Rook;

Rook.propTypes = {
  color: propTypes.string.isRequired,
  loc: propTypes.string.isRequired,
};
