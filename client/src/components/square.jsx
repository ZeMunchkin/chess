import React from 'react';
import propTypes from 'proptypes';

import render from '../helperFunctions/renderHelpers';

const Square = (props) => {
  let classes = 'square';
  if (props.shaded) {
    classes = 'square shaded';
  }
  if (props.selected === props.loc) {
    classes += ' selected';
  }
  return (
    <div id={props.loc} className={classes} onClick={props.select}> {/*eslint-disable-line*/}
      {render.renderPiece(props.piece, props.loc, props.select)}
    </div>
  );
};

export default Square;

Square.propTypes = {
  loc: propTypes.string.isRequired,
  piece: propTypes.string.isRequired,
  select: propTypes.func.isRequired,
  shaded: propTypes.bool.isRequired,
  selected: propTypes.string,
};

Square.defaultProps = {
  selected: '',
};
