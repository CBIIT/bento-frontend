/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { generateQueryStr } from '@bento-core/util';
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
import styles from './CheckboxStyle';

const alignment = 'flex-start';

const CheckBoxView = ({
  classes,
  checkboxItem,
  datafield,
  onToggle,
  facet,
  queryParams,
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
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();
  const indexType = index % 2 === 0 ? 'Even' : 'Odd';
  const checkedSection = `${section}`.toLowerCase().replace(' ', '_');

  const labelCheckbox = { inputProps: { 'aria-label': 'Checkbox item' } };

  const handleToggle = () => {
    const toggleCheckBoxItem = {
      name: name,
      datafield: datafield,
      isChecked: !isChecked,
    };
    const checkedValues = query.get(datafield);
    const paramValue = {};
    if (toggleCheckBoxItem.isChecked) {
      if (checkedValues) {
        const newValues = checkedValues.split('|');
        newValues.push(name);
        paramValue[datafield] = newValues.join('|');
      } else {
        paramValue[datafield] = name;
      }
    } else if (checkedValues) {
      const newValues = checkedValues.split('|');
      const idx = newValues.indexOf(name);
      if (idx > -1) {
        newValues.splice(idx, 1);
      }
      paramValue[datafield] = newValues.length > 0 ? newValues.join('|') : '';
    } else {
      paramValue[datafield] = '';
    }
    const queryStr = generateQueryStr(query, queryParams, paramValue);
    navigate(`/explore${queryStr}`);
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
          {`(${subjects.toLocaleString()})`}
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
