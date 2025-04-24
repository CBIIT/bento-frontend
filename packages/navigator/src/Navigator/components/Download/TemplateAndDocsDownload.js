import React from 'react';
import { ButtonGroup } from '@mui/material';
import { withStyles } from '@material-ui/core';
import TemplateButton from './Buttons/TemplateButton';
import { createFileName } from '../../utils/Utils';
import DictionaryButton from './Buttons/DictionaryButton';
import { useModelContext } from '../../state/NavContextProvider';

const TemplateAndDocsDownload = ({
  classes,
  node,
  isManifest,
}) => {
  const { context = {} } = useModelContext();
  if (Object.keys(context || {}).length === 0) {
    return null;
  }
  const {
    versionInfo,
    pdfDownloadConfig = {},
  } = context;
  const modelVersion = versionInfo?.version || 'unknown';
  const csvBtnDownloadConfig = {
    prefix: pdfDownloadConfig?.downloadPrefix || 'ICDC_Data_Loading_Template-',
  };
  return (
    <div style={{ paddingRight: '10px', minWidth: '264px' }}>
      <ButtonGroup className={classes.exportButtonGroup}>
        <TemplateButton
          documentData={node}
          isFileManifest={isManifest}
          fileName={createFileName(node.id, csvBtnDownloadConfig.prefix, modelVersion, true)}
        />
        <DictionaryButton
          config={{ pdfDownloadConfig }}
          documentData={node}
          modelVersion={modelVersion}
          pdfDownloadConfig={pdfDownloadConfig}
        />
      </ButtonGroup>
    </div>
  );
};

const styles = () => ({
  exportButtonGroup: {
    height: '32px',
  },
});

export default withStyles(styles)(TemplateAndDocsDownload);
