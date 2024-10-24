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
export const CustomTextField = ({
  classes, placeholder = '', params, loading,
}) => {
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

  return (
    <TextField
      {...params}
      classes={classes}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      InputProps={{
        ...InputProps,
        inputProps: {
          title: 'local find search input',
          ...params.inputProps,
        },
      }}
    />
  );
};

export default CustomTextField;
