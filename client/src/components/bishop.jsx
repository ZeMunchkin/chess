import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackBishop.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whiteBishop.png',
};

const Bishop = props => (
  <img
    className={`piece ${props.color} bishop`}
    alt={`${props.color}-bishop`}
    src={images[props.color]}
    id={props.loc}
  />
);

export default Bishop;

Bishop.propTypes = {
  color: propTypes.string.isRequired,
  loc: propTypes.string.isRequired,
};
