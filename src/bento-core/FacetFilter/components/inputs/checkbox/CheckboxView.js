/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
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
}) => {
  const { name, subjects, isChecked } = checkboxItem;

  const handleToggle = () => {
    const toggleCheckBoxItem = {
      name: name,
      datafield: datafield,
      isChecked: !isChecked,
    };
    onToggle(toggleCheckBoxItem);
  };

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
};

export default withStyles(styles)(CheckBoxView);
