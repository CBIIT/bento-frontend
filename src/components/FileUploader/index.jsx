import React, { useEffect, useState } from 'react';
import {
  withStyles,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import styles from './uploaderStyle';

const Uploader = ({
  classes,
  onFileUpload,
  isClear,
  clearData,
  uploadedFileName,
}) => {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    setFileName(uploadedFileName);
    if (isClear) {
      setFileName('');
    }
  }, [isClear]);
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileReaderObj = new FileReader();
    fileReaderObj.onload = () => {
      onFileUpload(fileReaderObj.result, file.name);
    };

    setFileName(file.name);
    if (file.type === 'text/csv') {
      fileReaderObj.readAsBinaryString(file);
    } else {
      fileReaderObj.readAsText(file);
    }
  };

  return (
    <div className={classes.fileUploader}>
      <div className={classes.uploaderComponent}>
        <input
          id="uploadFileInput"
          type="file"
          accept=".csv,.txt"
          onChange={handleChange}
          className={classes.uploadInput}
          value=""
        />
        <Button variant="contained" className={classes.uploadButton}>
          Browse
        </Button>
      </div>
      <div className={classes.filesection}>
        {
          fileName
            ? (
              <div className={classes.fileNameContainer}>
                <Typography className={classes.fileName}>{fileName}</Typography>
                <RefreshIcon className={classes.refresh} onClick={clearData} />
              </div>
            )
            : null
        }
        <Divider className={classes.horizontal} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Uploader);
