import React from 'react';
import propTypes from 'proptypes';

import render from '../helperFunctions/renderHelpers';

const Square = props => (
  <div id={props.loc} className="square" onClick={props.select}>
    {render.renderPiece(props.piece, props.loc, props.select)}
  </div>
);

export default Square;

Square.propTypes = {
  loc: propTypes.string.isRequired,
  piece: propTypes.string.isRequired,
  select: propTypes.func.isRequired,
};
