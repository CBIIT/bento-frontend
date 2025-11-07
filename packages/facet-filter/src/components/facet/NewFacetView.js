import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { generateQueryStr } from '@bento-core/util';
import {
  Accordion,
  List,
  withStyles,
  Icon,
} from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import clsx from 'clsx';
import CustomAccordionSummary from '../summary/AccordionSummaryView';
import { InputTypes } from '../inputs/Types';
import styles from './NewFacetStyle';
import FilterItems from '../inputs/FilterItems';
import { sortType } from '../../utils/Sort';
import clearIcon from './assets/clearIcon.svg';

const NewFacetView = ({
  classes,
  facet,
  onClearFacetSection,
  onClearSliderSection,
  onUnknownAgesChange,
  CustomView,
  queryParams,
  timeUnitState,
  onTimeUnitChange,
  unknownAgesState,
}) => {
  const [expand, setExpand] = useState(facet.expanded !== undefined && typeof facet.expanded === 'boolean' ? facet.expanded : false);
  const onExpandFacet = () => setExpand(!expand);
  const query = new URLSearchParams(useLocation().search);
  const navigate = useNavigate();

  /**
  * expand section incase of active local search
  */
  // useEffect(() => {
  //   if ((autoComplete && autoComplete.length > 0)
  //     || (upload && upload.length > 0)) {
  //     setExpand(true);
  //   }
  // }, [autoComplete, upload]);

  const [sortBy, setSortBy] = useState(null);
  const timeUnit = timeUnitState[facet.datafield] || 'days';
  const unknownAges = unknownAgesState?.[facet.datafield] || 'include';
  const isOnlyUnknownAges = unknownAges === 'only';
  const onSortFacet = (type) => {
    setSortBy(type);
  };

  const handleTimeUnitChange = (event, newUnit) => {
    if (newUnit !== null) {
      onTimeUnitChange(facet.datafield, newUnit);
    }
  };

  const onClearSection = () => {
    const field = facet.datafield;
    const paramValue = {};
    paramValue[field] = '';

    // Also clear the corresponding unknownAges parameter if it exists
    const unknownAgesField = `${field}_unknownAges`;
    if (queryParams.includes(unknownAgesField)) {
      paramValue[unknownAgesField] = '';
    }

    const queryStr = generateQueryStr(query, queryParams, paramValue);
    navigate(`/explore${queryStr}`, { replace: true });
    setSortBy(null);

    // Reset the corresponding unknownAges parameter in Redux state
    if (queryParams.includes(unknownAgesField) && onUnknownAgesChange) {
      onUnknownAgesChange(field, 'include');
    }
    if (facet.type === InputTypes.SLIDER) {
      onClearSliderSection(facet);
    } else {
      onClearFacetSection(facet);
    }
  };
  /**
   * display checked items on facet collapse
   */
  const { type, facetValues } = facet;
  const selectedItems = facetValues && facetValues.filter((item) => item.isChecked);
  const displayFacet = { ...facet };
  displayFacet.facetValues = selectedItems;

  // Check if facet is active based on selected items or unknown ages selection
  const hasSelectedItems = [...selectedItems].length > 0;
  const hasUnknownAgesSelection = unknownAges !== 'include';
  const isActiveFacet = hasSelectedItems || (type === InputTypes.SLIDER && hasUnknownAgesSelection);

  const limitCheckBoxCount = facet?.showCheckboxCount || 5;
  return (
    <>
      <Accordion
        square
        expanded={expand}
        onChange={onExpandFacet}
        classes={{
          root: classes.expansionPanelsideBarItem,
        }}
        id={facet.section}
      >
        { CustomView ? (
          <CustomView
            facet={facet}
            facetClasses={
            isActiveFacet ? `activeFacet${facet.section}`
              : `inactiveFacet${facet.section}`
            }
          />
        ) : (
          <CustomAccordionSummary>
            <div
              id={
                `filterGroup_ ${facet.datafield}
                ${facet.label}`
              }
              className={clsx(classes.subSectionSummaryText, {
                [`activeFacet${facet.section}`]: isActiveFacet,
              })}
            >
              {facet.label}
            </div>
          </CustomAccordionSummary>
        )}
        {
          (facetValues.length === 0)
          && (
          <div className={classes.NonSortGroup}>
            <span
              className={classes.NonSortGroupItem}
            >
              No data for this field
            </span>
          </div>
          )
        }
        {
          (facet.type === InputTypes.SLIDER || facetValues.length > 0)
          && (
          <div className={classes.sortGroup}>
            <span className={classes.sortGroupIcon}>
              <Icon
                style={{ fontSize: 10 }}
                onClick={onClearSection}
              >
                <img
                  src={clearIcon}
                  height={12}
                  width={12}
                  alt="clear-icon"
                />
              </Icon>
            </span>
            { facet.type === InputTypes.SLIDER && (
              <ToggleButtonGroup
                value={timeUnit}
                exclusive
                disabled={isOnlyUnknownAges}
                onChange={handleTimeUnitChange}
                aria-label="time unit"
                className={classes.timeUnitToggle}
              >
                <ToggleButton
                  value="days"
                  aria-label="days"
                  disabled={isOnlyUnknownAges}
                  classes={{
                    root: classes.toggleButton,
                    selected: classes.toggleButtonSelected,
                  }}
                >
                  DAYS
                </ToggleButton>
                <ToggleButton
                  value="years"
                  aria-label="years"
                  disabled={isOnlyUnknownAges}
                  classes={{
                    root: classes.toggleButton,
                    selected: classes.toggleButtonSelected,
                  }}
                >
                  YEARS
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            { (facet.type === InputTypes.CHECKBOX && facetValues.length > 0)
          && (
          <>
            <span
              className={
                    clsx(classes.sortGroupItem, {
                      [classes.highlight]: sortBy === sortType.ALPHABET,
                    })
                  }
              onClick={() => {
                onSortFacet(sortType.ALPHABET);
              }}
            >
              Sort Alphabetically
            </span>
            <span
              className={
                    clsx(classes.sortGroupItemCounts, {
                      [classes.highlight]: sortBy === sortType.NUMERIC,
                    })
                  }
              onClick={() => {
                onSortFacet(sortType.NUMERIC);
              }}
            >
              Sort by Count
            </span>
          </>
          )}
          </div>
          )
}
        <FilterItems
          facet={facet}
          queryParams={queryParams}
          sortBy={sortBy}
          timeUnit={timeUnit}
        />
      </Accordion>
      {
        (!expand && type === InputTypes.CHECKBOX) && (
          <>
            <List id="filter_Items">
              <FilterItems
                facet={displayFacet}
                queryParams={queryParams}
              />
            </List>
          </>
        )
      }
      {
        (!expand && selectedItems.length > limitCheckBoxCount) && (
          <div
            className={classes.showMore}
            onClick={onExpandFacet}
          >
            ...expand to see all selections
          </div>
        )
      }
    </>
  );
};

export default withStyles(styles)(NewFacetView);
