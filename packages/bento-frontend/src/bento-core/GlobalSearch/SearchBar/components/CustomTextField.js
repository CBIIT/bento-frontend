import React from 'react';
import { CircularProgress, TextField } from '@material-ui/core';
import { CustomSearchIcon } from './CustomSearchIcon';

/**
 * Component that renders a custom input text field
 *
 * @param {object} props
 * @returns JSX.Element
 */
export const CustomTextField = ({ ...params }) => {
  const {
    classes, placeholder, loading,
    onClick, onEnter, iconType,
  } = params;

  const InputProps = {
    ...params.InputProps,
    classes: {
      root: classes.inputRoot,
      notchedOutline: classes.notchedOutline,
      adornedEnd: classes.inputAdornedEnd,
    },
    endAdornment: (
      <>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
        <CustomSearchIcon
          classes={classes}
          onClick={onClick ? () => onClick(params.inputProps.value) : undefined}
          type={iconType}
        />
      </>
    ),
  };

  const keyDown = (event) => {
    if (onEnter && event.key === 'Enter' && event.target.value) {
      onEnter(event.target.value);
    }
  };

  return (
    <TextField
      {...params}
      hiddenLabel
      classes={{ root: classes.textFieldRoot }}
      placeholder={placeholder}
      variant="outlined"
      onKeyDown={keyDown}
      InputProps={InputProps}
    />
  );
};

export default CustomTextField;
