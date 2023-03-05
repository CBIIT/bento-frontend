import React from 'react';
import {
  TableCell,
  Link,
  Typography,
} from '@material-ui/core';
import { cellTypes } from '../CellTypes';

const CustomLink = ({
  children,
  linkAttr,
  row,
  rootClsName,
}) => {
  const { rootPath, pathParamAttrs } = linkAttr;
  const url = pathParamAttrs.map((attr) => `#${rootPath}/`.concat(row[attr]));
  return (
    <Link href={url} className={`${rootClsName}_${cellTypes.LINK}`}>
      {children}
    </Link>
  );
};

/**
*
* @param {*} column
* @param {*} data
* @returns default/Link/Custom view
*/
const ViewCustomCell = ({
  column,
  row,
  rootClsName,
}) => {
  const { type, linkAttr } = column;
  switch (type) {
    case cellTypes.LINK:
      return (
        <CustomLink
          linkAttr={linkAttr}
          row={row}
          rootClsName={rootClsName}
        >
          <Typography className={`${rootClsName}_${cellTypes.LINK}_label`}>
            {row[column.dataField]}
          </Typography>
        </CustomLink>
      );
    default:
      return (
        <Typography className={`${rootClsName}_${cellTypes.DEFAULT}`}>
          {row[column.dataField]}
        </Typography>
      );
  }
};

const CustomBodyCell = ({
  rootClsName,
  row,
  column,
}) => (
  <TableCell className={`${rootClsName}_${column.dataField}`}>
    <ViewCustomCell
      rootClsName={rootClsName}
      row={row}
      column={column}
    />
  </TableCell>
);

export default CustomBodyCell;
