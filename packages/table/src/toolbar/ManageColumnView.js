import React, { useState, useRef, useEffect } from 'react';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
  withStyles,
  Divider,
} from '@material-ui/core';
import {
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  Close,
} from '@material-ui/icons';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';
import { cellTypes } from '../util/Types';
import viewColumnsIcon from './assets/View_Columns.svg';
import hiddenColumnsIcon from './assets/Hidden_Column.svg';

const ManageColumnView = ({
  table,
  onColumnViewChange,
  onAllColumnViewChange,
  manageViewColumns,
}) => {
  if (!manageViewColumns) {
    return null;
  }
  const { columns } = table;
  const [listDisplay, setListDisplay] = useState('none');
  const [selectAll, setSelectAll] = useState(false);

  const viewColumns = columns.filter((col) => col.role === cellTypes.DISPLAY);

  const dropdownSelection = useRef(null);

  const handleClose = () => {
    setListDisplay('none');
  };

  const handleClickButton = () => {
    if (listDisplay === 'none') {
      setListDisplay('block');
    } else {
      setListDisplay('none');
    }
  };

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        console.log(event.target);
        if (!(event.target.getAttribute('id') && event.target.getAttribute('id').includes('dropdownListItem'))
        && !(event.target.getAttribute('class') && event.target.getAttribute('class').includes('MuiFormControlLabel'))
        ) {
          setListDisplay('none');
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(dropdownSelection);

  const handleSelectAll = () => {
    const state = selectAll;
    setSelectAll(!selectAll);
    onAllColumnViewChange(!state);
  };

  const columnDropdown = {
    width: '48px',
    height: '36px',
    paddingLeft: '5px',
    border: `${listDisplay === 'none' ? '0.75px solid #606060' : '1.5px solid #5666BD'}`,
    borderRadius: '5px',
    display: 'inline-flex',
    position: 'relative',
    marginTop: '2px',
    marginRight: '7px',
  };

  const displayColumnStyle = {
    position: 'absolute',
    right: '35px',
    bottom: '23px',
  };

  const viewColumnsStyle = {
    marginTop: '6px',
    height: '24px',
    backgroundColor: 'transparent',
  };

  const dropdownList = {
    position: 'absolute',
    width: '230px',
    marginTop: '38px',
    marginLeft: '-187px',
    overflow: 'auto',
    zIndex: '5',
    border: '1.5px solid #5666BD',
    borderRadius: '5px',
    background: '#ffffff',
    display: listDisplay,
  };

  const arrowdownIcon = {
    fill: '#606060',
  };
  return (
    <div style={columnDropdown}>
      <Tooltip title="Columns may be hidden">
        <img src={hiddenColumnsIcon} alt="hiddenColumnsIcon" style={displayColumnStyle} />
      </Tooltip>
      <Tooltip title={manageViewColumns.title}>
        <IconButton variant="contained" onClick={handleClickButton} style={viewColumnsStyle}>
          <img src={viewColumnsIcon} alt="viewColumnsIcon" />
          <KeyboardArrowDownOutlinedIcon style={arrowdownIcon} />
        </IconButton>
      </Tooltip>
      <div style={dropdownList}>
        <Typography variant="caption" className="viewColumnText">
          {manageViewColumns.title}
        </Typography>
        <IconButton
          onClick={handleClose}
          className="closeIcon"
          style={{ float: 'right' }}
        >
          <Close />
        </IconButton>
        <List className="viewColumnList">
          {viewColumns.map((column, index) => (
            <ListItem
              width={1}
              className="viewColumnListItem"
              id={`dropdownListItem-${index}`}
            >
              <FormControlLabel
                control={(
                  <Checkbox
                    icon={(
                      <CheckBoxBlankIcon
                        style={{ fontSize: 18 }}
                        className="checkBoxIcon"
                      />
                    )}
                    onClick={() => onColumnViewChange(column)}
                    checked={column.display}
                    id={`dropdownListItemCheckbox-${index}`}
                    checkedIcon={(
                      <CheckBoxIcon
                        style={{
                          fontSize: 18,
                          color: column.hideable ? 'rgba(11, 53, 86, 1)' : 'rgba(11, 53, 86, 0.38)',
                        }}
                        className="checkBoxIcon"
                      />
                    )}
                    disableRipple
                    color="secondary"
                    className="checkBox"
                    disabled={!column.hideable}
                  />
                )}
                disabled={!column.hideable}
                label={column.header}
                id={`dropdownListItem-${index}-label`}
              />
            </ListItem>
          ))}
          <Divider style={{ color: '#375F9A', marginTop: '5px', marginBottom: '5px' }} />
          <ListItem
            width={1}
            className="viewColumnListItem"
          >
            <FormControlLabel
              control={(
                <Checkbox
                  icon={(
                    <CheckBoxBlankIcon
                      style={{ fontSize: 18 }}
                      className="checkBoxIcon"
                    />
                  )}
                  onClick={() => handleSelectAll()}
                  checked={selectAll}
                  id="dropdownListItem-all"
                  checkedIcon={(
                    <CheckBoxIcon
                      style={{
                        fontSize: 18,
                        color: 'rgba(11, 53, 86, 1)',
                      }}
                      className="checkBoxIcon"
                    />
                  )}
                  disableRipple
                  color="secondary"
                  className="checkBox"
                />
              )}
              label={selectAll ? 'Deselect All' : 'Select All'}
              id="dropdownListItem-all-label"
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

const styles = () => ({
  root: {
    padding: '16px 24px 16px 24px',
    fontFamily: 'Roboto',
  },
  title: {
    marginRight: '24px',
    fontSize: '14px',
    color: '#0B3556',
    textAlign: 'left',
    fontWeight: 500,
  },
  formGroup: {
    marginTop: '8px',
  },
  formControl: {},
  checkbox: {
    padding: '0px',
    width: '32px',
    height: '32px',
  },
  checkboxRoot: {
    '&$checked': {
      color: '#0B3556',
    },
  },
  checked: {},
  label: {
    fontSize: '15px',
    marginLeft: '8px',
  },
});

export default withStyles(styles)(ManageColumnView);
