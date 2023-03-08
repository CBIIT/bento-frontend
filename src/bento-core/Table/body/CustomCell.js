import React from 'react';
import {
  TableCell,
  Link,
  Typography,
} from '@material-ui/core';
import { cellTypes } from '../util/Types';

/**
* Custom Column reneder
*/
const CustomComponent = ({
  row,
  column,
}) => {
  const { dataField, customCellRender } = column;
  return (
    <>
      {customCellRender({ ...row, ...column, label: row[dataField] })}
    </>
  );
};

/**
* Custom Link component
*/
const CustomLink = ({
  children,
  column,
  row,
  rootClsName,
}) => {
  const { rootPath, pathParams } = column.linkAttr;
  const url = pathParams.map((attr) => `#${rootPath}/`.concat(row[attr]));
  return (
    <Link href={url} className={`${rootClsName}_${cellTypes.LINK}`}>
      {children}
    </Link>
  );
};

/**
*
* @returns default/Link/Custom view
*/
const ViewCell = ({
  column,
  row,
  rootClsName,
}) => {
  const { cellType } = column;
  switch (cellType) {
    case cellTypes.LINK:
      return (
        <CustomLink
          column={column}
          row={row}
          rootClsName={rootClsName}
        >
          <Typography className={`${rootClsName}_${cellTypes.LINK}_label`}>
            {row[column.dataField]}
          </Typography>
        </CustomLink>
      );
    case cellTypes.CUSTOM_ELEM:
      return (
        <CustomComponent
          row={row}
          column={column}
        />
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
    <ViewCell
      rootClsName={rootClsName}
      row={row}
      column={column}
    />
  </TableCell>
);

export default CustomBodyCell;
