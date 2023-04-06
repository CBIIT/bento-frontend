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
}) => {
  const { rootPath, pathParams } = column.linkAttr;
  const url = pathParams.map((attr) => `#${rootPath}/`.concat(row[attr]));
  return (
    <Link href={url} className={cellTypes.LINK}>
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
}) => {
  const { cellType } = column;
  switch (cellType) {
    case cellTypes.LINK:
      return (
        <CustomLink
          column={column}
          row={row}
        >
          <Typography>
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
        <Typography>
          {row[column.dataField]}
        </Typography>
      );
  }
};

const CustomBodyCell = ({
  row,
  column,
}) => (
  <TableCell className={column.dataField}>
    <ViewCell
      row={row}
      column={column}
    />
  </TableCell>
);

export default CustomBodyCell;
