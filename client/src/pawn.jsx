import React from 'react';
import propTypes from 'proptypes';

const images = {
  black: 'https://s3-us-west-1.amazonaws.com/chess-pieces/blackPawn.png',
  white: 'https://s3-us-west-1.amazonaws.com/chess-pieces/whitePawn.png',
};

const Pawn = props => (
  <div className="pawn">
    <img
      className="piece"
      alt={`${props.color}-pawn`}
      src={images[props.color]}
    />
  </div>
);

export default Pawn;

Pawn.propTypes = {
  color: propTypes.string.isRequired,
};
