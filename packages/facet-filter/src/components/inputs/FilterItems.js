/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { withStyles } from '@material-ui/core';
import ReduxCheckbox from './checkbox/ReduxCheckbox';
import ReduxSlider from './slider/ReduxSlider';
import { InputTypes } from './Types';
import { sortBySection } from '../../utils/Sort';
import styles from './FilterItemStyle';

const FilterItems = ({
  facet,
  queryParams,
  sortBy,
  timeUnit,
  classes,
}) => {
  const {
    type, datafield, section,
  } = facet;
  const sortFilters = sortBySection({ ...facet, sortBy });

  if (type === InputTypes.SLIDER) {
    return (
      <ReduxSlider facet={facet} queryParams={queryParams} timeUnit={timeUnit} />
    );
  }

  if (type !== InputTypes.CHECKBOX) {
    return (<></>);
  }

  const checkedItems = sortFilters.filter((item) => item.isChecked)
    .map((item, index) => (
      <ReduxCheckbox
        checkboxItem={{ ...item, index, section }}
        datafield={datafield}
        facet={facet}
        queryParams={queryParams}
      />
    ));

  const uncheckedItems = sortFilters.filter((item) => !item.isChecked)
    .map((item, index) => (
      <ReduxCheckbox
        checkboxItem={{ ...item, index, section }}
        datafield={datafield}
        facet={facet}
        queryParams={queryParams}
      />
    ));

  return (
    <div>
      <div>
        {checkedItems}
      </div>
      {uncheckedItems.length > 0 && (
        <div className={classes.itemsContainer}>
          {uncheckedItems}
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(FilterItems);
