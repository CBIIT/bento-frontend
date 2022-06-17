import React from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import BootstrapInput from '../bootstrapInput';

const SelectMenu = (field, formValues, handleInputChange, classes) => {
  const {
    id, options, multiple, required, label,
  } = field;
  const selectOptions = options; // Add API Call

  const getMultiSelectView = (selectedKey) => {
    const firstOption = field.options[selectedKey[0]].title.split(',')[0];
    if (selectedKey.length <= 1) return firstOption;

    return (
      <div>
        {firstOption}
        {' and '}
        {selectedKey.length}
        {'more'}
      </div>
    );
  };

  return (
    <Grid item>
      <FormControl>
        <div className={classes.formLabel}>{label}</div>
        <Select
          id="demo-customized-select-native"
          multiple={multiple}
          name={id}
          displayEmpty
          value={formValues[id]}
          required={required}
          onChange={handleInputChange}
          input={<BootstrapInput />}
          className={classes.inputSelect}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
            // error={!checkIsValid(field, formValues)}
          renderValue={(selectedKey) => (
            (selectedKey.length === 0) ? label
              : multiple
                ? (getMultiSelectView(selectedKey)) : selectOptions[selectedKey].title
          )}
        >
          {Object.keys(selectOptions).map((key) => (
            <MenuItem dense key={key} value={key} className={classes.selectMenuItem}>
              <Checkbox checked={formValues[id].indexOf(key) > -1} />
              {selectOptions[key].title}
              {/* <ListItemText primary={} /> */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectMenu;
