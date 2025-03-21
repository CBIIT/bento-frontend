/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable object-shorthand */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-useless-escape */

import React, { useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  ListItem,
  ListItemText,
  Divider,
  Tooltip,
  Box,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import clsx from 'clsx';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';
import styles from './ModalCheckboxStyle';

const CheckBoxView = ({
  classes,
  checkboxItem,
  datafield,
  onToggle,
  facet,
  searchText,
}) => {
  const { isChecked = false, index, section, tooltip } = checkboxItem;
  const {
    field = 'group',
    count = 'subjects',
    customCount = (text) => `(${text})`,
  } = facet;

  const indexType = index % 2 === 0 ? 'Even' : 'Odd';
  const checkedSection = `${section}`.toLowerCase().replace(/\ /g, '_');

  const name = checkboxItem[field] || 'N/A';
  const checkboxId = `checkbox_${facet.label}_${name}`;

  const rippleRef = useRef(null);

  const handleRippleStart = (event) => {
    if (rippleRef.current) {
      rippleRef.current.start(event);
    }
  };

  const handleRippleStop = (event) => {
    if (rippleRef.current) {
      rippleRef.current.stop(event);
    }
  };

  const handleToggle = () => {
    const toggleCheckBoxItem = {
      name,
      datafield,
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
      <Typography className={classes.checkboxName}>{name}</Typography>
    </Box>
  );

  return (
    <>
      <ListItem
        component="div"
        width={1}
        alignItems="flex-start"
        onClick={handleToggle}
        onMouseDown={handleRippleStart}
        onMouseUp={handleRippleStop}
        onMouseLeave={handleRippleStop}
        classes={{
          gutters: classes.listItemGutters,
          root: classes.listItemRoot,
        }}
        className={clsx({
          [`${checkedSection}Checked${indexType}`]: isChecked,
        })}
      >
        <Checkbox
          id={checkboxId}
          icon={
            <CheckBoxBlankIcon
              style={{ fontSize: 18 }}
              className={checkedSection}
            />
          }
          inputProps={{
            'aria-label': 'checkbox',
            tabIndex: -1,
            'aria-hidden': true,
          }}
          checked={isChecked}
          checkedIcon={
            <CheckBoxIcon
              style={{
                fontSize: 18,
              }}
              className={`${checkedSection}CheckedIcon`}
            />
          }
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
          style={{ pointerEvents: 'none' }}
        />
        {tooltip ? (
          <Tooltip id={datafield} title={tooltip}>
            <div className={datafield}>{name}</div>
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
          {customCount(checkboxItem[count] || 0)}
        </Typography>
        <TouchRipple ref={rippleRef} center />
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
