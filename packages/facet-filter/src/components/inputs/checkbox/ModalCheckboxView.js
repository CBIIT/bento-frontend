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
  Tooltip,
  Box,
  Typography,
  Icon,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';
import emptyCheckBox from './assets/emptycheckbox.svg';
import checkedBox from './assets/checkedbox.svg';
import styles from './ModalCheckboxStyle';

const alignment = 'flex-start';

const CheckBoxView = ({
  classes,
  checkboxItem,
  datafield,
  onToggle,
  facet,
}) => {
  const {
    name,
    subjects,
    isChecked = false,
    index,
    section,
    tooltip,
    label,
  } = checkboxItem;
  const indexType = index % 2 === 0 ? 'Even' : 'Odd';
  const checkedSection = `${section}`.toLowerCase().replace(' ', '_');

  const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox item' } };

  const handleToggle = () => {
    const toggleCheckBoxItem = {
      name: name,
      datafield: datafield,
      isChecked: !isChecked,
    };
    onToggle(toggleCheckBoxItem);
  };

  const LabelComponent = () => (
    <Box
      component="div"
      className={clsx(classes.panelDetailText, {
        [`${checkedSection}NameUnChecked`]: !isChecked,
        [`${checkedSection}NameChecked`]: isChecked,
      })}
    >
      {label ? (
        <Typography className={classes.checkboxLabel}>{label}</Typography>
      ) : (<Typography className={classes.checkboxName}>{name}</Typography>)}
    </Box>
  );

  return (
    <>
      <ListItem
        width={1}
        button
        alignItems="flex-start"
        onClick={handleToggle}
        classes={{ gutters: classes.listItemGutters }}
        className={clsx({ [`${checkedSection}Checked${indexType}`]: isChecked })}
      >
        <Checkbox
          id={`checkbox_${facet.label}_${name}`}
          {...labelCheckbox}
          icon={
            <Icon style={{
              fontSize: '18px',
              lineHeight: '22px',
            }}
            >
              <img
                src={emptyCheckBox}
                alt="checkbox-icon"
              />
            </Icon>
          }
          onClick={handleToggle}
          checked={isChecked}
          checkedIcon={(
            <Icon
              style={{
                fontSize: '18px',
                lineHeight: '22px',
              }}
              className={`${checkedSection}CheckedIcon`}
            >
              <img
                src={checkedBox}
                alt="checkedBox-icon"
              />
            </Icon>
          )}
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
        />
        { tooltip ? (
          <Tooltip id={datafield} title={tooltip}>
            <div className={datafield}>
              <LabelComponent />
            </div>
          </Tooltip>
        ) : (
          <LabelComponent />
        )}
        <ListItemText />
        <Typography
          className={clsx(`${checkedSection}Subjects`, {
            [`${checkedSection}SubjectUnChecked`]: !isChecked,
            [`${checkedSection}SubjectChecked`]: isChecked,
          })}
        >
          {`(${subjects})`}
        </Typography>
      </ListItem>
    </>
  );
};

export default withStyles(styles)(CheckBoxView);
