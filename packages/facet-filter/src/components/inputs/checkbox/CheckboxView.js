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
} from '@material-ui/core';
import clsx from 'clsx';
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
  facet,
}) => {
  const {
    name,
    customName,
    subjects,
    customSubjects,
    isChecked = false,
    index,
    section,
    tooltip,
  } = checkboxItem;
  const indexType = index % 2 === 0 ? 'Even' : 'Odd';
  const checkedSection = `${section}`.toLowerCase().replace(/\ /g,'_');

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
      {customName ? (
        <Typography className={classes.checkboxLabel}>{customName}</Typography>
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
          icon={
            <CheckBoxBlankIcon
              style={{ fontSize: 18 }}
              className={checkedSection}
            />
          }
          onClick={handleToggle}
          checked={isChecked}
          checkedIcon={(
            <CheckBoxIcon
              style={{
                fontSize: 18,
              }}
              className={`${checkedSection}CheckedIcon`}
            />
          )}
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
        />
        { tooltip ? (
          <Tooltip id={datafield} title={tooltip}>
            <div className={datafield}>
              {customName ? customName : name}
            </div>
          </Tooltip>
        ) : (
          <LabelComponent />
        )}
        <ListItemText className={`${checkedSection}_md_space`} />
        <Typography
          className={clsx(`${checkedSection}Subjects`, {
            [`${checkedSection}SubjectUnChecked`]: !isChecked,
            [`${checkedSection}SubjectChecked`]: isChecked,
          })}
        >
          {customSubjects ? customSubjects : `(${subjects})`}
        </Typography>
      </ListItem>
      <Divider
        style={{
          backgroundColor: isChecked ? '#FFFFFF' : '#b1b1b1',
          margin: '0px',
          height: isChecked ? '2px' : '1px',
        }}
      />
    </>
  );
};

export default withStyles(styles)(CheckBoxView);
