/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import BootstrapInput from './bootstrapInput';

// NOTE FOR DEVELOPER: Add instructions for props what are the input types.

const SelectMenu = (field, formValues, handleInputChange, data, classes, propOptions = null) => {
  const {
    id, options: custodianOptions, optionsAPIField, multiple, required, label,
  } = field;

  console.log(propOptions);

  function getOptions() {
    return (propOptions || ((optionsAPIField && data && data[optionsAPIField])
      ? data[optionsAPIField] : custodianOptions));
  }

  const selectOptions = getOptions();

  const getMultiSelectView = (selectedKey) => {
    const firstOptionObject = selectOptions.find(
      (optionObject) => optionObject.id === selectedKey[0],
    );
    const firstOption = firstOptionObject.name;
    if (selectedKey.length <= 1) return firstOption;

    return (
      <div>
        {firstOption}
        {' and '}
        {selectedKey.length}
        {' more'}
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
          {selectOptions.map(({ id: key, name }) => (
            <MenuItem dense key={key} value={key} className={classes.selectMenuItem}>
              <Checkbox checked={formValues[id].indexOf(key) > -1} />
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectMenu;
