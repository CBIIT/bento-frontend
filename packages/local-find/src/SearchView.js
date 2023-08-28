import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import SearchList from './SearchBox/components/SearchList';
import { resetUploadData } from './store/actions/Actions';

/**
 * This provides a generic Search View implementation for the
 * Bento Case Search sidebar.
 *
 * @param {object} props
 * @param {object} props.classes - styles
 * @param {boolean} props.hidden - whether to hide the component
 * @param {object} props.state - redux state
 * @param {function} props.resetUpload - redux action to reset upload data
 * @param {object} props.SearchBox - Generated SearchBox component
 * @param {object} props.UploadModal - Generated UploadModal component
 * @returns {JSX.Element}
 */
const SearchView = (props) => {
  const {
    classes, hidden, state, resetUpload,
    UploadModal, SearchBox, viewTitle = 'View Case Set', uploadTitle = 'Upload Case Set',
  } = props;

  const [showCasesModal, setShowCasesModal] = useState(false);
  const matchedFiles = state && state.upload ? state.upload : [];

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
          onDelete={resetUpload}
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
        { matchedFiles.length !== 0 ? viewTitle : uploadTitle }
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

const stateProps = (state) => ({
  state: state.localFind,
});

const dispatchProps = (dispatch) => ({
  resetUpload: () => dispatch(resetUploadData()),
});

export default connect(stateProps, dispatchProps)(SearchView);
