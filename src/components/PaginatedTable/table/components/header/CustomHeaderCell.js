import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiTooltip from '@material-ui/core/Tooltip';
import { tableCls } from '../CustomClassNames';

const CustomHeaderCell = ({
  id,
  sortOrder,
  sortBy,
  column,
  components = {},
  toggleSort,
}) => {
  const {
    dataField,
    tooltipText,
    header,
  } = column;

  const Tooltip = components.Tooltip || MuiTooltip;
  return (
    <TableCell
      scope="col"
      active={sortBy === dataField}
      direction={sortOrder}
      className={`${id}${tableCls.COL}_${dataField}`}
    >
      <Tooltip
        title={tooltipText}
        className={`${id}${tableCls.TOOLTIP}`}
      >
        <TableSortLabel
          active={sortBy === dataField}
          direction={sortBy === dataField ? sortOrder : 'asc'}
          onClick={toggleSort}
          className={`${id}${tableCls.TOOLTIP}_${dataField}`}
        >
          {header}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

export default CustomHeaderCell;
