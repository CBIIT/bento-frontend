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
    onUrlUpdate,
    ...restProps
  } = props;

  // Helper function to sync participant IDs from Redux state to URL
  const syncParticipantIdsToUrl = () => {
    const participantParams = {};

    // Sync autocomplete participant IDs
    if (localFindAutocomplete && localFindAutocomplete.length > 0) {
      participantParams.p_id = localFindAutocomplete.map((data) => data.title).join('|');
    } else {
      participantParams.p_id = '';
    }

    // Sync uploaded participant IDs
    if (localFindUpload && localFindUpload.length > 0) {
      participantParams.u = localFindUpload.map((data) => data.participant_id).join('|');

      // Sync upload metadata
      if (localFindMetadata && localFindMetadata.fileContent) {
        const fc = localFindMetadata.fileContent
          .split(/[,\n]/g)
          .map((e) => e.trim().replace(/\r/g, '').toUpperCase())
          .filter((e) => e && e.length > 1);
        participantParams.u_fc = fc.join('|');
      } else {
        participantParams.u_fc = '';
      }

      if (localFindMetadata
        && localFindMetadata.unmatched
        && localFindMetadata.unmatched.length > 0) {
        participantParams.u_um = localFindMetadata.unmatched.join('|');
      } else {
        participantParams.u_um = '';
      }
    } else {
      participantParams.u = '';
      participantParams.u_fc = '';
      participantParams.u_um = '';
    }

    return participantParams;
  };

  const handleClearFacetSection = (facet) => {
    // Only update URL if updateURL flag is explicitly set to true in facet config
    if (facet.updateURL === true && queryParams) {
      // Sync participant IDs from Redux state to ensure URL reflects current state
      const paramValue = {
        [facet.datafield]: '',
        ...syncParticipantIdsToUrl(),
      };

      if (onUrlUpdate) {
        // Use the provided URL manager with debounce and character limit handling
        onUrlUpdate(paramValue);
      } else {
        // Fallback to direct update for backwards compatibility
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        // Use replaceState to update URL without triggering navigation/re-render
        window.history.replaceState(null, '', `/explore${queryStr}`);
      }
    }
    onClearFacetSection(facet);
  };

  const handleClearSliderSection = (facet) => {
    // Only update URL if updateURL flag is explicitly set to true in facet config
    if (facet.updateURL === true && queryParams) {
      // Also clear the corresponding unknownAges parameter if it exists
      const unknownAgesField = `${facet.datafield}_unknownAges`;
      const unknownAgesParam = queryParams.includes(unknownAgesField)
        ? { [unknownAgesField]: '' }
        : {};

      // Sync participant IDs from Redux state to ensure URL reflects current state
      const paramValue = {
        [facet.datafield]: '',
        ...unknownAgesParam,
        ...syncParticipantIdsToUrl(),
      };

      if (onUrlUpdate) {
        // Use the provided URL manager with debounce and character limit handling
        onUrlUpdate(paramValue);
      } else {
        // Fallback to direct update for backwards compatibility
        const queryStr = generateQueryStr(query, queryParams, paramValue);
        // Use replaceState to update URL without triggering navigation/re-render
        window.history.replaceState(null, '', `/explore${queryStr}`);
      }
    }
    onClearSliderSection(facet);
  };

  return (
    <NewFacetView
      {...restProps}
      queryParams={queryParams}
      onClearFacetSection={handleClearFacetSection}
      onClearSliderSection={handleClearSliderSection}
      onUrlUpdate={onUrlUpdate}
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
