import React, { useEffect, useReducer, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  withStyles,
} from '@material-ui/core';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import styles from './FacetSectionStyle';

const FacetSectionView = ({
  children,
  classes,
  section
}) => {

  const [expand, setExpand] = useState(true);
  const onExpandSection = () => setExpand(!expand);
  return (
    <>
      <Accordion
        expanded={expand}
        onChange={onExpandSection}
        classes={{
          root: classes.expansionPanelsideBarItem,
        }}
      >
        <CustomAccordionSummary>
          <div className={classes.sectionSummaryText}>
            {section.sectionName} 
          </div>
        </CustomAccordionSummary>
        <AccordionDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default withStyles(styles)(FacetSectionView);
