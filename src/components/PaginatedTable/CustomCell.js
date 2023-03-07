import React from 'react';
import DocumentDownloadView from '../DocumentDownload/DocumentDownloadView';

export const CustomCellView = (props) => {
  const { downloadDocument, documentDownloadProps } = props;
  if (downloadDocument) {
    return <DocumentDownloadView {...documentDownloadProps} />;
  }
  // other custom elem
  return (<></>);
};

export const otherCOmponents = '';
