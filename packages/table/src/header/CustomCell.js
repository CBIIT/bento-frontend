import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiTooltip from '@material-ui/core/Tooltip';
import { headerTypes } from '../util/Types';

/**
*
* @returns default/Link/Custom view
*/
const CustomHeaderCell = ({
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
    headerType,
    customColHeaderRender,
  } = column;

  const Tooltip = components.Tooltip || MuiTooltip;

  return (
    <TableCell
      scope="col"
      active={sortBy === dataField}
      direction={sortOrder}
    >
      <Tooltip
        title={tooltipText}
      >
        <TableSortLabel
          active={sortBy === dataField}
          hideSortIcon={sortBy !== dataField}
          direction={sortBy === dataField ? sortOrder : 'asc'}
          onClick={toggleSort}
        >
          {(headerType === headerTypes.CUSTOM_ELEM && customColHeaderRender)
            ? customColHeaderRender(column) : header}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

export default CustomHeaderCell;
