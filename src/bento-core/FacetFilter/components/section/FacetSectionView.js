import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  withStyles,
} from '@material-ui/core';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import styles from './FacetSectionStyle';

const FacetSectionView = ({
  children,
  classes,
  section,
  CustomSection,
}) => {
  const [expand, setExpand] = useState(true);
  const onExpandSection = () => {
    console.log('expand on click');
    setExpand(!expand);
  };
  return (
    <>
      <Accordion
        expanded={expand}
        onChange={onExpandSection}
        classes={{
          root: classes.expansionPanelsideBarItem,
        }}
        id="test_expansion"
      >
        {CustomSection ? (
          <>
            <CustomSection section={section} />
          </>
        ) : (
          <CustomAccordionSummary>
            <div className={classes.sectionSummaryText}>
              {section && section.sectionName}
            </div>
          </CustomAccordionSummary>
        )}
        <AccordionDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default withStyles(styles)(FacetSectionView);
