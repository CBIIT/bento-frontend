import React, { useCallback } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MuiTooltip from '@material-ui/core/Tooltip';
import { headerTypes } from '../util/Types';
import './CustomHeaderCell.css';
import helpIcon from './help.svg';

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
    tooltipDefinition,
    tooltipLocation,
    header,
    headerType,
    customColHeaderRender,
  } = column;

  const Tooltip = useCallback(({ children }) => {
    // return custom tooltips
    if (components.Tooltip) {
      const CustomToolTip = components.Tooltip;
      return <CustomToolTip>{children}</CustomToolTip>;
    }
    // return default tooltip
    if (tooltipText) {
      return (
        <MuiTooltip id="header-tooltip" title={tooltipText}>
          {children}
        </MuiTooltip>
      );
    }
    // return default view
    return <>{children}</>;
  }, []);

  return (
    <TableCell
      scope="col"
      active={sortBy === dataField}
      direction={sortOrder}
      className={dataField}
    >
      <Tooltip>
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
      {
        tooltipDefinition
        && (
          <div className="tooltip-icon">
            <img src={helpIcon} alt="tooltipIcon" />
            <div
              className={`tooltip-text ${tooltipLocation === 'first' ? 'tooltip-text-first' : tooltipLocation === 'last' ? 'tooltip-text-last' : ''}`}
            >
              {tooltipDefinition}
            </div>
          </div>
        )
      }
    </TableCell>
  );
};

export default CustomHeaderCell;
