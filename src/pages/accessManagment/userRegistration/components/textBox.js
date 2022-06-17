import React from 'react';
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const TextBox = (field, formValues, handleInputChange, classes) => {
  const {
    id, type, required, label, placeHolder,
  } = field;

  return (
    <Grid item>
      <div className={classes.formLabel}>{label}</div>
      <TextField
        id={id}
        name={id}
        placeholder={placeHolder}
        type={type}
        required={required}
        variant="outlined"
        value={formValues[id]}
        onChange={handleInputChange}
          // error={!checkIsValid(field, formValues)}
        InputProps={{ classes: { input: classes.inputText } }}
      />
    </Grid>
  );
};

export default TextBox;
