import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button, Typography,
  TextareaAutosize, IconButton, withStyles,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import { ToolTip } from 'bento-components';
import FileUploader from './components/FileUploader';
import SummaryTable from './components/SummaryTable';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';
import { updateUploadData, updateUploadMetadata } from '../store/actions/Actions';

/**
 * Generator function to create UploadModal component with custom configuration
 * applied.
 *
 * @param {object} [uiConfig] component configuration object
 * @returns {object} { UploadModal }
 */
export const UploadModalGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const {
    config, functions,
  } = uiConfig;

  const modalClosed = functions && typeof functions.modalClosed === 'function'
    ? functions.modalClosed
    : DEFAULT_CONFIG.functions.modalClosed;

  const searchMatches = functions && typeof functions.searchMatches === 'function'
    ? functions.searchMatches
    : DEFAULT_CONFIG.functions.searchMatches;

  const modalTitle = config && config.title && typeof config.title === 'string'
    ? config.title
    : DEFAULT_CONFIG.config.title;

  const inputPlaceholder = config && config.inputPlaceholder && typeof config.inputPlaceholder === 'string'
    ? config.inputPlaceholder
    : DEFAULT_CONFIG.config.inputPlaceholder;

  const inputTooltip = config && typeof config.inputTooltip === 'string'
    ? config.inputTooltip
    : DEFAULT_CONFIG.config.inputTooltip;

  const uploadTooltip = config && typeof config.uploadTooltip === 'string'
    ? config.uploadTooltip
    : DEFAULT_CONFIG.config.uploadTooltip;

  const fileAccept = config && typeof config.accept === 'string'
    ? config.accept
    : DEFAULT_CONFIG.config.accept;

  const maxTerms = config && typeof config.maxSearchTerms === 'number'
    ? config.maxSearchTerms
    : DEFAULT_CONFIG.config.maxSearchTerms;

  const stateProps = (state) => ({
    metadata: state.localFind.uploadMetadata,
  });

  const dispatchProps = (dispatch) => ({
    onApplySearch: (data) => dispatch(updateUploadData(data)),
    updateMetadata: (data) => dispatch(updateUploadMetadata(data)),
  });

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    UploadModal: withStyles(DEFAULT_STYLES, { withTheme: true })(connect(stateProps, dispatchProps)((props) => {
      const {
        classes, open, metadata = {},
        onApplySearch, updateMetadata,
      } = props;

      const {
        FileUploader: uploaderClasses,
        SummaryTable: summaryClasses,
      } = classes;

      const [filename, setUploadedFileName] = useState(metadata.filename || '');
      const [fileContent, setFileContent] = useState(metadata.fileContent || '');
      const [matchIds, setMatchIds] = useState(metadata.matched || []);
      const [unmatchedIds, setUnmatchedIds] = useState(metadata.unmatched || []);

      const overMaxTerms = matchIds.length > maxTerms;
      const errorText = `Total number of cases exceeds the maximum of ${maxTerms} cases.`;

      const clearData = () => {
        setFileContent('');
        setMatchIds([]);
        setUnmatchedIds([]);
        setUploadedFileName('');
        updateMetadata({});
      };

      const closeModalWrapper = () => {
        modalClosed();
        if (props.onCloseModal) {
          props.onCloseModal();
        }
      };

      const applySearchWrapper = () => {
        onApplySearch(matchIds);
        updateMetadata({
          filename,
          fileContent,
          matched: matchIds,
          unmatched: unmatchedIds,
        });
        closeModalWrapper();
      };

      const generateToolTip = (message) => (
        <ToolTip className={classes.customTooltip} classes={{ arrow: classes.customArrow }} title={message} arrow placement="bottom">
          <IconButton aria-label="help" className={classes.helpIconButton}>
            <HelpIcon className={classes.helpIcon} fontSize="small" />
          </IconButton>
        </ToolTip>
      );

      const handleContent = async (content) => {
        // Skip lookup if content is empty
        if (!content || typeof content !== 'string' || !content.trim()) {
          setMatchIds([]);
          setUnmatchedIds([]);
          return;
        }

        // Split content by lines and commas
        const searchTokens = content
          .split(/[,\n]/g)
          .map((e) => e.trim().replace('\r', ''))
          .filter((e) => e && e.length > 1);

        const { matched, unmatched } = await searchMatches(searchTokens);
        setMatchIds(matched);
        setUnmatchedIds(unmatched);
      };

      const handleChange = ({ target: { value } }) => {
        setFileContent(value);
        handleContent(value);
      };

      const handleFileUpload = (fileName, content) => {
        setFileContent(content);
        setUploadedFileName(fileName);
        handleContent(content);
      };

      return (
        <Modal
          {...props}
          open={open}
          className={classes.modal}
          onClose={closeModalWrapper}
        >
          <div className={classes.paper}>
            <h1 className={classes.modalTitle}>
              <span>{modalTitle}</span>
              <span className={classes.closeIcon} onClick={closeModalWrapper}>
                <img
                  src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/LocalFindCaseDeleteIcon.svg"
                  alt="close icon"
                  className={classes.closeRoot}
                />
              </span>
            </h1>
            <div className={classes.modalContainer}>
              <div className={classes.textSection}>
                <div className={classes.inputLabel}>
                  <Typography>
                    <p className={classes.listTitle}>Add a list of Case IDs:</p>
                  </Typography>
                  {inputTooltip ? generateToolTip(inputTooltip) : null}
                </div>
                <TextareaAutosize
                  value={fileContent}
                  name="caseDescription"
                  onChange={handleChange}
                  placeholder={inputPlaceholder}
                  className={classes.textArea}
                  id="local_find_upload_textarea"
                />
              </div>
              <div className={classes.uploadFile}>
                <div className={classes.orTitle}>or</div>
                <div className={classes.inputLabel}>
                  <Typography>
                    <p className={classes.listTitle}>Choose a file to upload:</p>
                  </Typography>
                  {uploadTooltip ? generateToolTip(uploadTooltip) : null}
                </div>
                <FileUploader
                  classes={uploaderClasses}
                  filename={filename}
                  onClear={clearData}
                  onUploadRead={handleFileUpload}
                  accept={fileAccept}
                />
              </div>
            </div>
            {fileContent && (
              <SummaryTable
                classes={summaryClasses}
                matched={matchIds}
                unmatched={unmatchedIds}
                error={overMaxTerms ? errorText : null}
              />
            )}
            <div className={classes.modalFooter}>
              <Button
                variant="contained"
                color="primary"
                onClick={closeModalWrapper}
                style={{ backgroundColor: '#566672' }}
                className={classes.button}
                id="local_find_upload_cancel"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="blueGrey"
                onClick={clearData}
                style={{ backgroundColor: '#437BBE' }}
                className={classes.button}
                id="local_find_upload_clear"
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="blueGrey"
                onClick={applySearchWrapper}
                style={overMaxTerms ? undefined : { backgroundColor: '#03A383' }}
                className={classes.button}
                disabled={overMaxTerms}
                id="local_find_upload_submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      );
    })),
  };
};

export default UploadModalGenerator;
