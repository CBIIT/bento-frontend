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

// Height threshold to trigger scrolling behavior
const SCROLL_THRESHOLD_HEIGHT = 400;
// Maximum height of scrollable content area when scroll is needed
const SCROLLABLE_MAX_HEIGHT = '253px';

const ManageColumnView = ({
  table,
  onColumnViewChange,
  onAllColumnViewChange,
  manageViewColumns,
  classes,
}) => {
  if (!manageViewColumns) {
    return null;
  }
  const { columns } = table;
  const [listDisplay, setListDisplay] = useState('none');
  const [selectAll, setSelectAll] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(false);

  const viewColumns = columns.filter((col) => col.role === cellTypes.DISPLAY
    && col.disableInManageView !== true);

  const dropdownSelection = useRef(null);
  const formGroupRef = useRef(null);

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
        if (ref.current && !ref.current.contains(event.target)) {
          setListDisplay('none');
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  };
  useOutsideAlerter(dropdownSelection);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    onAllColumnViewChange(!selectAll);
  };

  useEffect(() => {
    if (formGroupRef.current && listDisplay === 'block') {
      const contentHeight = formGroupRef.current.scrollHeight;
      setNeedsScroll(contentHeight > SCROLL_THRESHOLD_HEIGHT);
    }
  }, [viewColumns, listDisplay]);

  return (
    <div ref={dropdownSelection} className={listDisplay === 'none' ? classes.columnDropdown : classes.columnDropdownActive}>
      <Tooltip title="Columns may be hidden">
        <img src={hiddenColumnsIcon} alt="hiddenColumnsIcon" className={classes.displayColumnIcon} />
      </Tooltip>
      <Tooltip title={manageViewColumns.title}>
        <IconButton variant="contained" onClick={handleClickButton} className={classes.viewColumnsButton}>
          <img src={viewColumnsIcon} alt="viewColumnsIcon" />
          <KeyboardArrowDownOutlinedIcon className={classes.arrowDownIcon} />
        </IconButton>
      </Tooltip>
      <div className={listDisplay === 'none' ? classes.dropdownListHidden : classes.dropdownListVisible}>
        <div className={classes.dropdownHeader}>
          <Typography variant="caption" className={classes.titleText}>
            {manageViewColumns.title}
          </Typography>
          <IconButton
            onClick={handleClose}
            className={classes.closeIconButton}
          >
            <Close />
          </IconButton>
        </div>

        <List className="viewColumnList" id="dropdownListItemTitle">
          <div
            ref={formGroupRef}
            className={classes.formGroup}
            style={needsScroll ? { maxHeight: SCROLLABLE_MAX_HEIGHT } : {}}
          >
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
                            color: column.hideable ? 'rgba(109, 95, 91, 1)' : 'rgba(109, 95, 91, 0.38)',
                          }}
                          className="checkBoxIcon"
                        />
                      )}
                      disableRipple
                      color="secondary"
                      className="checkBox"
                      disabled={!column.hideable}
                      style={{ paddingTop: 0 }}
                    />
                  )}
                  disabled={!column.hideable}
                  label={<Typography id={`dropdownListItemLabel-${index}`} className={classes.textStyle}>{column.header}</Typography>}
                  id={`dropdownListItem-${index}-label`}
                  className={classes.checkboxItemLabel}
                />
              </ListItem>
            ))}
          </div>
          <Divider className={classes.dividerStyle} />
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
                        color: 'rgba(109, 95, 91, 1)',
                      }}
                      className="checkBoxIcon"
                    />
                  )}
                  disableRipple
                  color="secondary"
                  className="checkBox"
                  style={{ paddingTop: 0 }}
                />
              )}
              label={(
                <Typography id="dropdownListItem-all-label" className={classes.textStyle}>
                  {selectAll ? 'Deselect All' : 'Select All'}
                </Typography>
              )}
              id="dropdownListItem-all-label"
              className={classes.checkboxItemLabel}
              style={{ padding: '2px 0px' }}
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
  displayColumnIcon: {
    position: 'absolute',
    right: '35px',
    bottom: '23px',
  },
  columnDropdown: {
    width: '48px',
    height: '36px',
    paddingLeft: '5px',
    border: '0.5px solid #606060',
    borderRadius: '5px',
    display: 'inline-flex',
    position: 'relative',
    padding: '0px 0px 0px 5px',
    margin: '5px 11px 5px 1px',
  },
  columnDropdownActive: {
    width: '48px',
    height: '36px',
    border: '1.5px solid #5666BD',
    borderRadius: '5px',
    display: 'inline-flex',
    position: 'relative',
    padding: '0px 0px 0px 5px',
    margin: '5px 10px 5px 0px',
  },
  viewColumnsButton: {
    marginTop: '6px',
    height: '24px',
    backgroundColor: 'transparent',
  },
  arrowDownIcon: {
    fill: '#606060',
    width: '20px',
    height: '20px',
  },
  dropdownListHidden: {
    position: 'absolute',
    width: '230px',
    marginTop: '38px',
    marginLeft: '-188px',
    zIndex: '11',
    border: '1.5px solid #5666BD',
    borderRadius: '5px',
    background: '#ffffff',
    display: 'none',
  },
  dropdownListVisible: {
    position: 'absolute',
    width: '230px',
    marginTop: '38px',
    marginLeft: '-188px',
    zIndex: '11',
    border: '1.5px solid #5666BD',
    borderRadius: '5px',
    background: '#ffffff',
    display: 'block',
    maxHeight: '473px',
  },
  dropdownHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 15px 0px 21px',
  },
  titleText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '100%',
    color: '#000000',
  },
  closeIconButton: {
    scale: '0.75',
    bottom: '14.5px',
    left: '12.5px',
  },
  checkboxItemLabel: {
    marginLeft: '0px !important',
  },
  textStyle: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    fontWeight: '400',
    marginBottom: '3px',
    lineHeight: '15px',
  },
  dividerStyle: {
    backgroundColor: '#375F9A',
    marginTop: '5px',
    marginBottom: '5px',
    width: 'calc(100% + 20px)',
    position: 'relative',
    left: '-10px',
    height: '0.5px',
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
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#707070',
      borderRadius: '5px',
    },
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
  viewColumnListItem: {
    height: '18px',
  },
  formControlLabel: {
    marginLeft: '13px',
    position: 'relative',
  },
});

export default withStyles(styles)(ManageColumnView);
