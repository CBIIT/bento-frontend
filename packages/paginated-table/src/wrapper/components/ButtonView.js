import React from 'react';
import { withStyles } from '@material-ui/core';
import { btnTypes } from './AddFiles';
import AddFileButtonView from './ReduxAddFile';
import DownloadManifestView from './DownloadManifestBtn';
import styles from './ButtonStyle';

const ButtonView = (props) => {
  const {
    btnType,
  } = props;

  if (btnTypes.DOWNLOAD_MANIFEST === btnType) {
    return (
      <DownloadManifestView {...props} />
    );
  }

  return (
    <>
      <AddFileButtonView {...props} />
    </>
  );
};

export default withStyles(styles)(ButtonView);
