import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiTooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { tableCls } from '../util/ClassNames';
import { headerTypes } from '../util/Types';

/**
*
* @returns default/Link/Custom view
*/
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
    headerType,
    customColHeaderRender,
  } = column;

  const Tooltip = components.Tooltip || MuiTooltip;

  return (
    <TableCell
      scope="col"
      active={sortBy === dataField}
      direction={sortOrder}
      className={clsx(
        `${rootClsName}${tableCls.COL}_${dataField}_cell`,
      )}
    >
      <Tooltip
        title={tooltipText}
        className={`${rootClsName}${tableCls.TOOLTIP}_${dataField}`}
      >
        <TableSortLabel
          active={sortBy === dataField}
          direction={sortBy === dataField ? sortOrder : 'asc'}
          onClick={toggleSort}
          className={clsx(
            `${rootClsName}${tableCls.COL}_${dataField}`,
          )}
        >
          {(headerType === headerTypes.CUSTOM_ELEM && customColHeaderRender)
            ? customColHeaderRender(column) : header}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );
};

export default CustomHeaderCell;
