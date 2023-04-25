/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import BootstrapInput from './bootstrapInput';

// NOTE FOR DEVELOPER: Add instructions for props what are the input types.

const SelectMenu = (field, formValues, handleInputChange,
  data, classes, propOptions = null, disabled = false) => {
  const {
    id, options: custodianOptions, optionsAPIField, multiple, required, label,
  } = field;

  function getOptions() {
    return (propOptions || ((optionsAPIField && data && data[optionsAPIField])
      ? data[optionsAPIField] : custodianOptions));
  }

  const selectOptions = getOptions();

  const getShortLabel = (orignalLabel) => orignalLabel.split(',')[0];

  const getSelectView = (selectedKey) => {
    const sortedOptions = Object.keys(selectOptions).reduce((previouslySortedOptions, key) => {
      const newSortedOptions = previouslySortedOptions;
      if (selectedKey.includes(selectOptions[key].id)) newSortedOptions.push(selectOptions[key]);
      return newSortedOptions;
    }, []);

    const firstOption = getShortLabel(sortedOptions[0].name);
    if (selectedKey.length <= 1) return firstOption;

    return (
      <div>
        {firstOption}
        {' and '}
        {selectedKey.length - 1}
        {' others'}
      </div>
    );
  };

  const getLabel = (selectedKeys) => {
    if (selectedKeys.length === 0) return label;

    if (multiple) return getSelectView(selectedKeys);

    return getSelectView([selectedKeys]);
  };

  return (
    <Grid item>
      <FormControl>
        <div className={classes.formLabel}>
          {label}
          {required ? (
            <span className={classes.required}>
              *
            </span>
          ) : null}
        </div>
        <Select
          id="demo-customized-select-native"
          multiple={multiple}
          disabled={disabled}
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
          renderValue={(selectedKeys) => getLabel(selectedKeys)}
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
