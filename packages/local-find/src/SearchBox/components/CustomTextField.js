import React from 'react';
import { CircularProgress, TextField } from '@material-ui/core';

/**
 * Render the text <input> field for the SearchBox component
 *
 * @param {object} props
 * @param {object} props.classes
 * @param {boolean} [props.loading]
 * @param {string} [props.placeholder]
 * @param {object} [props.InputProps]
 * @returns JSX.Element
 */
export const CustomTextField = ({ ...params }) => {
  const {
    classes,
    loading = false,
    placeholder = '',
  } = params;

  const InputProps = {
    ...params.InputProps,
    classes: { root: classes.inputRoot },
    endAdornment: (
      <>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
      </>
    ),
  };

  const label = { inputProps: { 'aria-label': 'Participant ID Text Search box' } };

  return (
    <TextField
      {...params}
      {...label}
      classes={classes}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      InputProps={InputProps}
    />
  );
};

export default CustomTextField;
