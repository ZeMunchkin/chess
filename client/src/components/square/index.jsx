import React from 'react';
import PropTypes from 'prop-types';

import render from '../../utils/renderHelpers';

const Square = (props) => {
  let classes = 'square';
  if (props.shaded) {
    classes += ' shaded';
  }
  if (props.selected === props.loc) {
    classes += ' selected';
  }
  if (props.checkMatePath) {
    classes += ' checkMatePath';
  }

  return (
    <div id={props.loc} className={classes} onClick={props.select}> {/*eslint-disable-line*/}
      {render(props.piece, props.loc)}
    </div>
  );
};

export default Square;

Square.propTypes = {
  loc: PropTypes.string.isRequired,
  piece: PropTypes.shape({
    color: PropTypes.string,
    type: PropTypes.string,
  }),
  select: PropTypes.func.isRequired,
  shaded: PropTypes.bool.isRequired,
  checkMatePath: PropTypes.bool.isRequired,
  selected: PropTypes.string,
};

Square.defaultProps = {
  selected: '',
  piece: {},
};
