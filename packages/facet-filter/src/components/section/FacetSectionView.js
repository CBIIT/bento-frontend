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
  const { expandSection } = section;
  const [expand, setExpand] = useState(expandSection);
  const onExpandSection = () => {
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
        <AccordionDetails
          classes={{ root: classes.expansionPanelDetailsRoot }}
          id={section.sectionName}
        >
          {children}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default withStyles(styles)(FacetSectionView);
