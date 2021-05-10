import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  ListItem,
} from '@material-ui/core';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';

const styles = {};

function CheckBoxView(props) {
  const {
    classes, checkboxItem, handleToggle, sideBarItem, facetSectionVariables, backgroundColor,
  } = props;

  return (
    <ListItem
      button
      selected={checkboxItem.isChecked}
      onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
      className={classes.nested}
      style={{ backgroundColor: checkboxItem.isChecked ? backgroundColor : null }}
      classes={{
        // root: ,
        selected: classes.selected,
        gutters: classes.listItemGutters,
      }}
    >
      <Checkbox
        id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
        icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
        checkedIcon={<CheckBoxIcon style={{ fontSize: 18 }} />}
        checked={checkboxItem.isChecked}
        tabIndex={-1}
        disableRipple
        color="secondary"
        classes={{ root: classes.checkboxRoot }}
      />
      <div className={classes.panelDetailText}>
        {`${checkboxItem.name}`}
        <span style={{ color: facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '#137fbe' }}>
          &nbsp;
          {`(${checkboxItem.subjects})`}
        </span>
      </div>
    </ListItem>
  );
}

export default withStyles(styles)(CheckBoxView);
