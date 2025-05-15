import React from 'react';
import {
  Link, Typography,
} from '@material-ui/core';
import { cellTypes } from '../../util/Types';

/**
* Custom Link component
*/
const CustomLinkView = ({
  column,
  row,
}) => {
  const { rootPath, pathParams } = column?.linkAttr;
  const url = pathParams.map((attr) => `${rootPath}/`.concat(row[attr]));
  return (
    <Link href={url} className={cellTypes.LINK}>
      <Typography>
        {row[column?.dataField]}
      </Typography>
    </Link>
  );
};

export default CustomLinkView;
