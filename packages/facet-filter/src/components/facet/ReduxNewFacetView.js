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
    queryParams, onClearFacetSection, onClearSliderSection,
    localFindAutocomplete, localFindUpload, localFindMetadata,
    ...restProps
  } = props;

  // Helper function to sync participant IDs from Redux state to URL
  const syncParticipantIdsToUrl = (paramValue) => {
    /* eslint-disable no-param-reassign */
    // Sync autocomplete participant IDs
    if (localFindAutocomplete && localFindAutocomplete.length > 0) {
      paramValue.p_id = localFindAutocomplete.map((data) => data.title).join('|');
    } else {
      paramValue.p_id = '';
    }

    // Sync uploaded participant IDs
    if (localFindUpload && localFindUpload.length > 0) {
      paramValue.u = localFindUpload.map((data) => data.participant_id).join('|');

      // Sync upload metadata
      if (localFindMetadata && localFindMetadata.fileContent) {
        const fc = localFindMetadata.fileContent
          .split(/[,\n]/g)
          .map((e) => e.trim().replace(/\r/g, '').toUpperCase())
          .filter((e) => e && e.length > 1);
        paramValue.u_fc = fc.join('|');
      } else {
        paramValue.u_fc = '';
      }

      if (localFindMetadata
        && localFindMetadata.unmatched
        && localFindMetadata.unmatched.length > 0) {
        paramValue.u_um = localFindMetadata.unmatched.join('|');
      } else {
        paramValue.u_um = '';
      }
    } else {
      paramValue.u = '';
      paramValue.u_fc = '';
      paramValue.u_um = '';
    }
    /* eslint-enable no-param-reassign */
  };

  const handleClearFacetSection = (facet) => {
    // Only update URL if updateURL flag is explicitly set to true in facet config
    if (facet.updateURL === true && queryParams) {
      const paramValue = {};
      paramValue[facet.datafield] = '';

      // Sync participant IDs from Redux state to ensure URL reflects current state
      syncParticipantIdsToUrl(paramValue);

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

      // Sync participant IDs from Redux state to ensure URL reflects current state
      syncParticipantIdsToUrl(paramValue);

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
  localFindAutocomplete: state?.localFind?.autocomplete || [],
  localFindUpload: state?.localFind?.upload || [],
  localFindMetadata: state?.localFind?.uploadMetadata || {},
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
