import React from 'react';
import PropTypes from 'prop-types';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackBishop.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteBishop.png',
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
  color: PropTypes.string.isRequired,
  loc: PropTypes.string.isRequired,
};
