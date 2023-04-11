import React from 'react';
import {
  AccordionSummary,
  withStyles,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import style from './AccordionSummaryStyle';

const Summary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 6,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '4px 0px 15px 0px',
    },
  },
  expanded: {},
})(AccordionSummary);

const CustomAccordionSummary = ({
  children,
  classes,
}) => (
  <Summary
    expandIcon={(
      <ExpandMoreIcon
        classes={{ root: classes.dropDownIconSubSection }}
        style={{ fontSize: 26 }}
      />
    )}
    classes={{
      expandIcon: classes.ExpansionPaneldropDownIcon,
    }}
  >
    {children}
  </Summary>
);

export default withStyles(style)(CustomAccordionSummary);
