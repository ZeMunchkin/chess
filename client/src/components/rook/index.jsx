import React from 'react';
import PropTypes from 'prop-types';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackRook.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteRook.png',
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
  color: PropTypes.string.isRequired,
  loc: PropTypes.string.isRequired,
};
