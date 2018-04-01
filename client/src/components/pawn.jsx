import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackPawn.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whitePawn.png',
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
  color: propTypes.string.isRequired,
  loc: propTypes.string.isRequired,
};
