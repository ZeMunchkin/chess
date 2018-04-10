import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackQueen.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteQueen.png',
};

const Queen = props => (
  <img
    id={props.loc}
    className={`piece ${props.color} queen`}
    alt={`${props.color}-queen`}
    src={images[props.color]}
  />
);

export default Queen;

Queen.propTypes = {
  color: propTypes.string.isRequired,
  loc: propTypes.string.isRequired,
};
