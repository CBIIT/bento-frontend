import React, { useState } from 'react';
import {
  Accordion,
  List,
  withStyles,
} from '@material-ui/core';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import { InputTypes } from '../inputs/Types';
import styles from './FacetStyle';
import FilterItems from '../inputs/FilterItems';

const FacetView = ({
  children,
  classes,
  facet,
}) => {
  const [expand, setExpand] = useState(false);
  const onExpandFacet = () => setExpand(!expand);

  /**
   * display checked items on facet collapse
   */
  const { type, facetValues } = facet;
  const selectedItems = facetValues && facetValues.filter((item) => item.isChecked);
  const displayFacet = { ...facet };
  displayFacet.facetValues = selectedItems;

  return (
    <>
      <Accordion
        square
        expanded={expand}
        onChange={onExpandFacet}
        classes={{
          root: classes.expansionPanelsideBarItem,
        }}
      >
        <CustomAccordionSummary>
          <div
            id={`filterGroup_${facet.datafield}`}
            className={classes.subSectionSummaryText}
          >
            {facet.label}
          </div>
        </CustomAccordionSummary>
        {children}
      </Accordion>
      {
        (!expand && type === InputTypes.CHECKBOX) && (
          <>
            <List>
              <FilterItems
                facet={displayFacet}
              />
            </List>
          </>
        )
      }
    </>
  );
};

export default withStyles(styles)(FacetView);
