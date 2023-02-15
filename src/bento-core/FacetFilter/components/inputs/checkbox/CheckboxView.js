/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';
import styles from './CheckboxStyle';
const alignment = 'flex-start';

const CheckBoxView = ({ 
  classes,
  checkboxItem,
  datafield,
  onToggle,
  filterState,
}) => {

  const {name, subjects, isChecked} = checkboxItem;

  const handleToggle = () => {
    const toggleCheckBoxItem = {
      name: name,
      datafield: datafield,
      isChecked: isChecked ? false: true,
    };
    onToggle(toggleCheckBoxItem);
  }

  return (
    <>
      <ListItem
        width={1}
        button
        onClick={handleToggle}
        alignItems={alignment}
        classes={{ gutters: classes.listItemGutters }}
      >
        <Checkbox
          icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
          onClick={handleToggle}
          checked={isChecked}
          checkedIcon={(
            <CheckBoxIcon
              style={{
                fontSize: 18,
              }}
            />
          )}
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
        />
        <div className={classes.panelDetailText}>
          <span>{name}</span>
        </div>
        <ListItemText />
        <div className={classes.panelSubjectText}>
          <span>({subjects})</span>
        </div>
      </ListItem>
    </>
  );
}

export default withStyles(styles)(CheckBoxView);
