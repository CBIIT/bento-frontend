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

const styles = {
  listItemGutters: {
    padding: '10px 0px 5px 0px',
  },
  checkboxRoot: {
    marginLeft: '3px',
    height: 12,
  },
  panelDetailText: {
    marginTop: '1.5px',
    color: '#000000',
    lineHeight: '120%',
    fontFamily: 'Nunito',
    fontSize: '14px',
  },
  panelSubjectText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    marginRight: '12px',
  },
};
const alignment = 'flex-start';

function CheckBoxView(props) {
  const {
    classes,
    lineColor,
    checkColor,
    sideBarItem,
    checkboxItem,
    handleToggle,
    backgroundColor,
    facetSectionVariables,
    defaultFacetSectionVariables,
  } = props;

  return (
    <>
      <ListItem
        button
        width={1}
        alignItems={alignment}
        className={classes.nested}
        selected={checkboxItem.isChecked}
        classes={{ selected: classes.selected, gutters: classes.listItemGutters }}
        onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
        style={{
          backgroundColor: checkboxItem.isChecked ? backgroundColor : null,
        }}
      >
        <Checkbox
          id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
          icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
          checkedIcon={(
            <CheckBoxIcon
              style={{
                fontSize: 18,
                color: checkColor,
              }}
            />
          )}
          tabIndex={-1}
          disableRipple
          color="secondary"
          checked={checkboxItem.isChecked}
          classes={{ root: classes.checkboxRoot }}
        />
        <div className={classes.panelDetailText}>
          <span>
            {`${checkboxItem.name}`}
          </span>
        </div>
        <ListItemText />
        <div className={classes.panelSubjectText}>
          <span
            style={{ color: facetSectionVariables[sideBarItem.section] ? facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '' : defaultFacetSectionVariables.color }}
            edge="end"
          >
            &nbsp;
            {`(${checkboxItem.subjects})`}
          </span>
        </div>
      </ListItem>
      <Divider
        style={{
          backgroundColor: checkboxItem.isChecked ? '#FFFFFF' : lineColor,
          height: checkboxItem.isChecked ? '2px' : '1px',
        }}
      />
    </>
  );
}

export default withStyles(styles)(CheckBoxView);
