import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { clearAllFilters, clearFacetSection, clearSliderSection, toggleCheckBox } from '@bento-core/facet-filter';
import { resetAllData, resetUploadData, updateAutocompleteData } from '@bento-core/local-find';
import ActiveFiltersQuery from '@bento-core/query-bar';
import { facetsConfig } from '../../../bento/dashTemplate';

/**
 * Generate the Explore Tab Query Bar
 *
 * @param {object} props
 * @param {object} props.statusReducer Facet Filter State
 * @param {object} props.localFind Local Find State
 * @returns {JSX.Element}
 */
const QueryBarView = ({ statusReducer, localFind }) => {
  const dispatch = useDispatch();

  const sectionOrder = facetsConfig.map((v) => v.datafield);
  const mappedFilterState = Object.keys(statusReducer || {}).map((facet) => {
    return {
      ...facetsConfig.find((config) => config.datafield === facet),
      items: statusReducer[facet],
    }
  });
  mappedFilterState.sort((a, b) => sectionOrder.indexOf(a.datafield) - sectionOrder.indexOf(b.datafield));

  const clearAll = () => {
    dispatch(resetAllData());
    dispatch(clearAllFilters());
  };

  const clearFileUpload = () => {
    dispatch(resetUploadData());
  };

  const clearAutocomplete = () => {
    dispatch(updateAutocompleteData([]));
  };

  const onDeleteAutocomplete = (title) => {
    const { autocomplete } = localFind;
    const newdata = [...autocomplete];
    const index = newdata.findIndex((v) => v.title === title);

    if (index > -1) {
      newdata.splice(index, 1);
      dispatch(updateAutocompleteData(newdata));
    }
  };

  const onResetFacetSection = (section) => {
    dispatch(clearFacetSection(section));
  };

  const onResetSlider = (section) => {
    dispatch(clearSliderSection(section));
  };

  const onResetFacetCheckbox = (section, checkbox) => {
    dispatch(toggleCheckBox({
      datafield: section.datafield,
      isChecked: false,
      name: checkbox
    }));
  };

  return (
    <ActiveFiltersQuery
      statusReducer={mappedFilterState}
      localFind={localFind}
      onClearAll={clearAll}
      onClearUpload={clearFileUpload}
      onClearAutocomplete={clearAutocomplete}
      onDeleteAutocomplete={onDeleteAutocomplete}
      onResetFacetSection={onResetFacetSection}
      onResetFacetCheckbox={onResetFacetCheckbox}
      onResetSlider={onResetSlider}
    />
  );
};

const mapStateToProps = (state) => ({
  statusReducer: state.statusReducer.filterState,
  localFind: state.localFind,
});

export default connect(mapStateToProps, null)(QueryBarView);
