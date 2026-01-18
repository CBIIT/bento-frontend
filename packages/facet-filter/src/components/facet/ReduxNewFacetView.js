import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { generateQueryStr } from '@bento-core/util';
import {
  clearFacetSection,
  clearSliderSection,
  timeUnitChange,
  unknownAgesChange,
} from '../../store/actions/Actions';
import NewFacetView from './NewFacetView';

const ReduxNewFacetView = ((props) => {
  const query = new URLSearchParams(useLocation().search);
  const {
    queryParams, onClearFacetSection, onClearSliderSection, ...restProps
  } = props;

  const handleClearFacetSection = (facet) => {
    // Only update URL if updateURL flag is explicitly set to true in facet config
    if (facet.updateURL === true && queryParams) {
      const paramValue = {};
      paramValue[facet.datafield] = '';
      const queryStr = generateQueryStr(query, queryParams, paramValue);
      // Use replaceState to update URL without triggering navigation/re-render
      window.history.replaceState(null, '', `/explore${queryStr}`);
    }
    onClearFacetSection(facet);
  };

  const handleClearSliderSection = (facet) => {
    // Only update URL if updateURL flag is explicitly set to true in facet config
    if (facet.updateURL === true && queryParams) {
      const paramValue = {};
      paramValue[facet.datafield] = '';

      // Also clear the corresponding unknownAges parameter if it exists
      const unknownAgesField = `${facet.datafield}_unknownAges`;
      if (queryParams.includes(unknownAgesField)) {
        paramValue[unknownAgesField] = '';
      }

      const queryStr = generateQueryStr(query, queryParams, paramValue);
      // Use replaceState to update URL without triggering navigation/re-render
      window.history.replaceState(null, '', `/explore${queryStr}`);
    }
    onClearSliderSection(facet);
  };

  return (
    <NewFacetView
      {...restProps}
      queryParams={queryParams}
      onClearFacetSection={handleClearFacetSection}
      onClearSliderSection={handleClearSliderSection}
    />
  );
});

const mapStateToProps = (state) => ({
  timeUnitState: state?.statusReducer?.timeUnitState || {},
  unknownAgesState: state?.statusReducer?.unknownAgesState || {},
});

const mapDispatchToProps = (dispatch) => ({
  onClearFacetSection: (facet) => { dispatch(clearFacetSection(facet)); },
  onClearSliderSection: (facet) => { dispatch(clearSliderSection(facet)); },
  onTimeUnitChange: (datafield, timeUnit) => { dispatch(timeUnitChange(datafield, timeUnit)); },
  onUnknownAgesChange: (datafield, unknownAges) => {
    dispatch(unknownAgesChange(datafield, unknownAges));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNewFacetView);
