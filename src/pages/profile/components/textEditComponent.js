import React from 'react';
import { Button, TextField, withStyles } from '@material-ui/core';
import { editTool } from '../../../bento/profileData';

function TextEditComponent({
  data, classes, customOptions, onSave,
}) {
  const [value, setValue] = React.useState(`${data.firstName}, ${data.lastName}`);
  const [editActivated, setEditActivated] = React.useState(false);
  const [formerValue, setFormerValue] = React.useState('');

  const handleChange = (event) => {
    if (event && event.target.value) {
      setValue(event.target.value);
    }
  };

  const handleEdit = () => {
    if (!editActivated) {
      setFormerValue(value);
      setEditActivated(true);
    }
  };

  const handleSave = () => {
    setEditActivated(false);
    if (onSave && typeof onSave === 'function') {
      onSave(value);
    }
  };

  const handleCancel = () => {
    setValue(formerValue);
    setEditActivated(false);
  };

  return (
    <div className={classes.textField}>
      <TextField
        value={value}
        onChange={handleChange}
        inputProps={{ readOnly: !editActivated }}
      />
      <Button variant="text" onClick={handleEdit}><img className={classes.editIcon} src={editTool.src} alt={customOptions.alt || 'edit'} /></Button>
      {editActivated ? (
        <div className={classes.buttonGroup}>
          <Button variant="text" onClick={handleSave}>Save</Button>
          <Button variant="text" onClick={handleCancel}>Cancel</Button>
        </div>
      ) : ''}
    </div>
  );
}

const styles = () => ({
  ':root': {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
  },

  editIcon: {
    width: '18px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
  },
});

export default withStyles(styles, { withTheme: true })(TextEditComponent);
