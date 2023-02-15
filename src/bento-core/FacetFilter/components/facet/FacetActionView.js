import React from 'react';
import {
  Icon,
  Accordion,
  withStyles,
} from '@material-ui/core';
import { sortType } from '../../utils/Sort';
import styles from './FacetActionStyle';
import { sortSection } from '../../state/StateAction';
import clearIcon from './assets/clearIcon.svg'
import { InputTypes } from '../inputs/Types';

const FacetActionView = ({
  classes,
  facet,
  datafield,
  dispatchFacetAction,
  onClearFacetSection,
}) => {
  const onSortFacet = (sortType) => {
    dispatchFacetAction(sortSection(facet, sortType));
  }
  return (
    <div className={classes.sortGroup}>
      <span className={classes.sortGroupIcon}>
        <Icon
          style={{ fontSize: 10 }}
          onClick={() => onClearFacetSection(facet)}
        >
        <img
          src={clearIcon}
          height={12}
          width={12}
          alt='clear-con'
        />
        </Icon>
      </span>
      { facet.type === InputTypes.CHECKBOX 
        && (
        <>
        <span 
          className={classes.sortGroupItem}
          onClick={() => {
            onSortFacet(sortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </span>
        <span
          className={classes.sortGroupItemCounts}
          onClick={() => {
            onSortFacet(sortType.NUMERIC);
          }}
        >
          Sort by count
        </span>
        </>)
      }
    </div>
    );
}

export default withStyles(styles)(FacetActionView);
