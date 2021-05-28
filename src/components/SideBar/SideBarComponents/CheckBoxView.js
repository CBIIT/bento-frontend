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
    padding: '8px 0px 0px 0px',
  },
  checkboxRoot: {
    color: '#344B5A',
    marginLeft: '5px',
    height: 12,
  },
  panelDetailText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
  panelSubjectText: {
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '14px',
    marginRight: '12px',
  },
};
const alignment = 'flex-start';

function CheckBoxView(props) {
  const {
    classes, checkboxItem, handleToggle, sideBarItem, facetSectionVariables,
    defaultFacetSectionVariables, backgroundColor,
  } = props;

  return (
    <>
      <ListItem
        width={1}
        button
        alignItems={alignment}
        selected={checkboxItem.isChecked}
        onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
        className={classes.nested}
        style={{
          backgroundColor: checkboxItem.isChecked ? backgroundColor : null,
        }}
        classes={{ selected: classes.selected, gutters: classes.listItemGutters }}
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
        variant="middle"
        style={{
          backgroundColor: '#FFFFFF',
          margin: '0px',
          height: '2px',
        }}
      />
    </>
  );
}

export default withStyles(styles)(CheckBoxView);
