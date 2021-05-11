import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
// import { CustomIcon } from 'bento-components';

import CustomIcon from '../CustomIcon/CustomIconView';

const DocumentDownload = ({
  fileSize = 0,
  maxFileSize = 2000,
  toolTipTextFileDownload = 'Download a copy of this file',
  toolTipTextFilePreview = 'Because of its size and/or format, this file is unavailable for download and must be accessed via the My Files workflow',
  iconFileDownload = '',
  iconFilePreview = '',
  fileLocation = 'http://www.africau.edu/images/default/sample.pdf',
}) => (
  <>
    { fileSize < maxFileSize ? (
      <Tooltip title={toolTipTextFileDownload}>
        <Link to={fileLocation} target="_blank" download>
          <CustomIcon imgSrc={iconFileDownload} />
        </Link>
      </Tooltip>
    ) : (
      <Tooltip title={toolTipTextFilePreview}>
        <span>
          <CustomIcon imgSrc={iconFilePreview} />
        </span>
      </Tooltip>
    )}
  </>
);
export default DocumentDownload;
