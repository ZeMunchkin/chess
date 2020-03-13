import React from 'react';
import PropTypes from 'prop-types';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-icons/blackPawn.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-icons/whitePawn.png',
};

const Pawn = props => (
  <img
    id={props.loc}
    className={`piece ${props.color} pawn`}
    alt={`${props.color}-pawn`}
    src={images[props.color]}
  />
);

export default Pawn;

Pawn.propTypes = {
  color: PropTypes.string.isRequired,
  loc: PropTypes.string.isRequired,
};
