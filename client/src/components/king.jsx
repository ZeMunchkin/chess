import React from 'react';
import propTypes from 'proptypes';

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
  color: propTypes.string.isRequired,
  loc: propTypes.string.isRequired,
};
