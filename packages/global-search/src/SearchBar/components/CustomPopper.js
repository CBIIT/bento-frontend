import React from 'react';
import { Popper } from '@material-ui/core';

/**
 * Generate a default search Popper component
 *
 * @param {object} props
 * @returns JSX.Element
 */
export const CustomPopper = (props) => {
  const {
    classes,
    style,
  } = props;

  return (
    <Popper
      {...props}
      style={{ ...style, zIndex: 1502 }}
      className={classes.root}
      placement="bottom"
    />
  );
};

export default CustomPopper;
