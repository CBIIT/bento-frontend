import React from 'react';
import { btnTypes } from './AddFiles';
import AddFileButtonView from './ReduxAddFile';
import DownloadManifestView from './DownloadManifestBtn';

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

export default ButtonView;
