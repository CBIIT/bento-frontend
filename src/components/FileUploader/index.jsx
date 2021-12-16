import React, { useEffect, useState } from 'react';
import { withStyles, Button, Typography } from '@material-ui/core';
import styles from './uploaderStyle';

const Uploader = ({ classes, onFileUpload, isClear }) => {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (isClear) {
      setFileName('');
    }
  }, [isClear]);
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const fileReaderObj = new FileReader();
    fileReaderObj.onload = () => {
      onFileUpload(fileReaderObj.result);
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
        />
        <Button variant="contained" className={classes.uploadButton}>
          Browse
        </Button>
      </div>
      <Typography className={classes.fileName}>{fileName}</Typography>
    </div>
  );
};

export default withStyles(styles)(Uploader);
