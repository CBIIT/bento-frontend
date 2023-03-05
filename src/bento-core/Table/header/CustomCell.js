import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiTooltip from '@material-ui/core/Tooltip';
import { tableCls } from '../ClassNames';

const CustomHeaderCell = ({
  rootClsName,
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
      className={`${rootClsName}${tableCls.COL}_${dataField}_cell`}
    >
      <Tooltip
        title={tooltipText}
        className={`${rootClsName}${tableCls.TOOLTIP}_${dataField}`}
      >
        <TableSortLabel
          active={sortBy === dataField}
          direction={sortBy === dataField ? sortOrder : 'asc'}
          onClick={toggleSort}
          className={`${rootClsName}${tableCls.COL}_${dataField}`}
        >
          {header}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

export default CustomHeaderCell;
