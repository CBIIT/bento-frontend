import React from 'react';
import {
  Button, TextField, withStyles, InputAdornment,
} from '@material-ui/core';
import { editTool } from '../../../bento/profileData';

const checkProp = (obj, prop) => {
  if (!obj || !prop) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(obj, prop) ? obj[prop] : null;
};

const defaultValidation = (val) => val && val.length > 0;

function TextEditComponent({
  data, classes, customOptions, onSave,
}) {
  const [value, setValue] = React.useState(data || '');
  const [editActivated, setEditActivated] = React.useState(false);
  const [formerValue, setFormerValue] = React.useState('');
  const [error, setError] = React.useState({
    value: false,
    message: '',
  });

  const handleChange = (event) => {
    if (event && event.target.value) {
      setValue(event.target.value);
      return;
    }
    setValue('');
  };

  const handleEdit = () => {
    const disabled = checkProp(customOptions, 'disabled');

    if (!editActivated && !disabled) {
      setFormerValue(value);
      setEditActivated(true);
    }
  };

  const handleSave = () => {
    const validationEnabled = checkProp(customOptions, 'validationEnabled');
    const validation = checkProp(customOptions, 'validation');
    let errorFound = false;

    setEditActivated(false);
    if (validationEnabled) {
      if (validation && typeof validation === 'function') {
        errorFound = validation(value);
      } else {
        errorFound = defaultValidation(value);
      }
    }
    setError({ value: errorFound, message: errorFound ? 'please enter value prior to saving.' : '' });

    if (!error.value && onSave && typeof onSave === 'function') {
      onSave(value, customOptions.field);
    }
  };

  const handleCancel = () => {
    setValue(formerValue);
    setEditActivated(false);
  };

  const useLargerField = checkProp(customOptions, 'useLargerField');

  return (
    <div className={classes.textField}>
      <TextField
        error={error.value}
        value={value}
        className={`${useLargerField ? classes.textField_ex : ''}`}
        onChange={handleChange}
        InputProps={{
          classes: {
            input: classes.inputFont,
          },
          endAdornment: (
            <InputAdornment position="start" onClick={handleEdit}>
              <img
                className={classes.editIcon}
                src={editTool.src}
                alt={checkProp(customOptions, 'alt') || 'edit'}
              />
            </InputAdornment>
          ),
          readOnly: !editActivated,
        }}
        helperText={error.message}
      />
      {editActivated ? (
        <div className={classes.buttonGroup}>
          <Button className={classes.btnSave} variant="contained" onClick={handleSave}>Save</Button>
          <Button className={classes.btnCancel} variant="text" onClick={handleCancel}>Cancel</Button>
        </div>
      ) : ''}
    </div>
  );
}

const styles = () => ({
  textField: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    flex: 2,
    fontWeight: 'bold',
    color: '#7b858f',
    minWidth: '70%',
  },
  textField_ex: {
    minWidth: '75%',
  },
  btnEdit: {
    minWidth: '34px',
    padding: 0,
    margin: '0 5px',
  },
  editIcon: {
    width: '14px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    alignSelf: 'center',
  },
  btnCancel: {
    padding: 0,
    minWidth: '50px',
    margin: '0 5px',
    lineHeight: '1.5em',
    height: '26px',
  },
  btnSave: {
    padding: 0,
    minWidth: '50px',
    margin: '0 5px 0 10px',
    lineHeight: '1.5em',
    height: '26px',
    backgroundColor: '#375fac',
    color: '#ffffff',
    '&:hover': {
      color: '#000000',
    },
  },
  inputFont: {
    color: '#525f6b',
    fontWeight: 'bold',
    padding: '5px 0 5px 10px',
  },
});

export default withStyles(styles, { withTheme: true })(TextEditComponent);
