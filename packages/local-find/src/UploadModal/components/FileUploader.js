import React from 'react';
import {
  Button, Typography, Divider, withStyles,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

/**
 * Creates a file upload component with CSV and TXT file
 * parsing capabilities.
 *
 * @param {object} props
 * @param {object} props.classes - The styles to be applied to the component.
 * @param {string} props.filename - The name of the file that was already uploaded.
 * @param {string} [props.accept] - The file types/extensions that can be uploaded.
 * @param {function} [props.onUploadRead] - File read success callback function.
 * @param {function} [props.onUploadError] - File read error callback function.
 * @param {function} props.onClear - Input clear callback function.
 * @returns {JSX.Element}
 */
const FileUploader = (props) => {
  const {
    classes, filename, accept,
    onUploadRead, onUploadError, onClear,
  } = props;

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileReaderObj = new FileReader();

    if (!file) {
      return;
    }
    if (onUploadRead) {
      fileReaderObj.onload = () => onUploadRead(file.name, fileReaderObj.result);
    }
    if (onUploadError) {
      fileReaderObj.onerror = (err) => onUploadError(err);
    }

    fileReaderObj.readAsText(file);
  };

  return (
    <div className={classes.fileUploader}>
      <div className={classes.uploaderComponent}>
        <input
          id="local_find_upload_input"
          type="file"
          accept={accept || '.csv,.txt'}
          onChange={handleChange}
          className={classes.uploadInput}
          value=""
        />
        <Button id="local_find_upload_browse" variant="contained" className={classes.uploadButton}>
          Browse
        </Button>
      </div>
      <div className={classes.filesection}>
        {
          filename ? (
            <div className={classes.fileNameContainer}>
              <Typography className={classes.fileName}>{filename}</Typography>
              <RefreshIcon className={classes.refresh} onClick={onClear} />
            </div>
          ) : null
        }
        <Divider className={classes.horizontal} />
      </div>
    </div>
  );
};

/**
 * Default styles for the component.
 */
const styles = () => ({
  fileUploader: {
    width: '100%',
    height: '35px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    marginBottom: '10px',
    alignItems: 'center',
  },
  uploaderComponent: {
    height: '38px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '22px',
  },
  uploadInput: {
    opacity: 0,
    zIndex: 4,
    width: '140px',
    height: '38px',
    position: 'absolute',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  uploadButton: {
    width: 143,
    borderRadius: '5px',
    boxSizing: 'border-box',
    boxShadow: 'none',
    backgroundColor: '#437BBE',
    height: 38,
    border: '1px solid #626262',
    fontSize: 11,
    marginBottom: '12px',
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
  },
  horizontal: {
    height: 1,
    width: 214,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
  filesection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '16px',
  },
  fileName: {
    margin: 'unset',
    color: '#0D4A94',
    fontSize: 14,
  },
  fileNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  refresh: {
    color: '#1F2F50',
    height: 14,
    cursor: 'pointer',
  },
});

export default withStyles(styles, { withTheme: true })(FileUploader);
