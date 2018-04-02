import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackKnight.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-icons/whiteKnight.png',
};

const Knight = props => (
  <img
    id={props.loc}
    className={`piece ${props.color} knight`}
    alt={`${props.color}-knight`}
    src={images[props.color]}
  />
);

export default Knight;

Knight.propTypes = {
  color: propTypes.string.isRequired,
  loc: propTypes.string.isRequired,
};
