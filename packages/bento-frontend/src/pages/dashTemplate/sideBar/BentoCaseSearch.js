import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import {
  resetUploadData, SearchBoxGenerator, SearchList,
  UploadModalGenerator,
} from '@bento-core/local-find';
import store from '../../../store';
import {
  getAllSubjectIds, getAllIds,
} from '../../dashboardTab/store/dashboardReducer';

// Generate SearchBox Component
const { SearchBox } = SearchBoxGenerator({
  functions: {
    getSuggestions: async (searchType) => {
      try {
        const response = await getAllIds(searchType).catch(() => []);
        return response && response[searchType] instanceof Array
          ? response[searchType].map((id) => ({ type: searchType, title: id }))
          : [];
      } catch (e) {
        return [];
      }
    },
  },
});

// Generate UploadModal Component
const { UploadModal } = UploadModalGenerator({
  functions: {
    searchMatches: async (inputArray) => {
      try {
        const matched = await getAllSubjectIds(inputArray).catch(() => []);
        const unmatched = new Set(inputArray);
        matched.forEach((obj) => unmatched.delete(obj.subject_id));
        return { matched, unmatched: [...unmatched] };
      } catch (e) {
        return { matched: [], unmatched: [] };
      }
    },
  },
});

/**
 * Generates the Bento File Upload Modal and SearchBox components
 *
 * @param {object} props
 * @param {object} props.classes - styles
 * @param {boolean} props.hidden - whether to hide the component
 * @returns {JSX.Element}
 */
const BentoCaseSearch = (props) => {
  const {
    classes, hidden,
  } = props;

  const [showCasesModal, setShowCasesModal] = useState(false);
  const matchedFiles = useSelector((state) => (
    state.localFind && state.localFind.upload
      ? state.localFind.upload
      : []
  ));

  const eventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={classes.searchContainer}
      onFocus={eventHandler}
      onClick={eventHandler}
      hidden={hidden}
    >
      {matchedFiles.length !== 0 ? (
        <SearchList
          classes={{ divider: classes.customDivider, listPadding: classes.customListPadding }}
          items={['INPUT SET']}
          id="localFindCaseUploadSet"
          onDelete={() => store.dispatch(resetUploadData())}
        />
      ) : null}
      <SearchBox classes={classes} />
      <Button
        variant="contained"
        disableElevation
        onClick={() => setShowCasesModal(true)}
        className={classes.uploadButton}
        id="local_find_upload_open"
      >
        { matchedFiles.length !== 0 ? 'View Case Set' : 'Upload Case Set' }
        <span className={classes.iconSpan}>
          <img
            className={classes.uploadIcon}
            src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/localfindUplwardArrow.svg"
            alt="upload icon"
          />
        </span>
      </Button>
      <UploadModal
        open={showCasesModal}
        onCloseModal={() => setShowCasesModal(false)}
      />
    </div>
  );
};

export default BentoCaseSearch;
