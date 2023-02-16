import React from 'react';
import { sortBySection } from '../../utils/Sort';
import ReduxCheckbox from './checkbox/ReduxCheckbox';
import ReduxSlider from './slider/ReduxSlider';
import { InputTypes } from './Types';

const FilterItems = ({
  facet,
}) => {
  const { type, datafield } = facet;
  const sortFilters = sortBySection(facet);

  const filterItems = () => {
    switch (type) {
      case InputTypes.CHECKBOX:
        return sortFilters.map((item) => (
          <ReduxCheckbox
            checkboxItem={item}
            datafield={datafield}
          />
        ));
      case InputTypes.SLIDER:
        return (<ReduxSlider facet={facet} />);
      default:
        return (<></>);
    }
  };

  return (
    <>
      {filterItems()}
    </>
  );
};

export default FilterItems;
