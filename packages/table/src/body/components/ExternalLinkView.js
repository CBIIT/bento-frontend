import React from 'react';
import {
  Link, Typography,
} from '@material-ui/core';
import { cellTypes } from '../../util/Types';

/**
* External Link component
*/
const ExternalLinkView = ({
  column,
  row,
}) => {
  const { rootPath, pathParams } = column?.linkAttr;
  const url = pathParams.map((attr) => {
    if (!rootPath) {
      return row[attr];
    }
    return `${rootPath}/`.concat(row[attr]);
  });
  const externalLinkIcon = {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
    alt: 'External link icon',
  };
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer" className={cellTypes.LINK}>
      <Typography>
        {row[column?.dataField]}
        <img
          src={externalLinkIcon.src}
          alt={externalLinkIcon.alt}
          style={{ width: '16px', verticalAlign: 'sub', marginLeft: '4px' }}
        />
      </Typography>
    </Link>
  );
};

export default ExternalLinkView;