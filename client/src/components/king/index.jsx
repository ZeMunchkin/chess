import React from 'react';
import PropTypes from 'prop-types';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackKing.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteKing.png',
};

const King = props => (
  <img
    id={props.loc}
    className={`piece ${props.color} king`}
    alt={`${props.color}-king`}
    src={images[props.color]}
  />
);

export default King;

King.propTypes = {
  color: PropTypes.string.isRequired,
  loc: PropTypes.string.isRequired,
};
