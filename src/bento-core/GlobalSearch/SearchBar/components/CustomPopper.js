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
  } = props;

  return (
    <Popper
      {...props}
      className={classes.root}
      placement="bottom"
    />
  );
};

export default CustomPopper;
