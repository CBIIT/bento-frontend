/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import HeaderCell from './CustomCell';
// import { getClsName, tableCls } from '../util/ClassNames';
import defaultTheme from './DefaultThemConfig';
import { actionCellTypes } from '../util/Types';
import ActionHeaderCell from './ActionHeaderCell';

const CustomTableHeader = ({
  table,
  rows = [],
  toggleSelectAll,
  sortByColumn,
  components = {},
  customTheme = {},
  count,
}) => {
  const {
    columns,
    selectedRows = [],
    sortBy,
    sortOrder,
  } = table;
  const Ids = rows.map((row) => row[table.dataKey]);
  const includeSelectedIds = Ids.some((id) => selectedRows.includes(id));
  const displayColunms = columns.filter((col) => col.display);
  /**
  * create root class name based on table info
  * themeprovider to customize style
  */
  // const rootClsName = getClsName(table.title, tableCls.HEADER);
  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });

  return (
    <ThemeProvider theme={themeConfig}>
      <TableHead>
        <TableRow>
          {
            displayColunms.map((column) => {
              const { cellType } = column;
              const isActionCell = actionCellTypes.includes(cellType) || false;

              if (isActionCell) {
                return (
                  <ActionHeaderCell
                    includeSelectedIds={includeSelectedIds}
                    toggleSelectAll={toggleSelectAll}
                    Ids={Ids}
                    rows={rows}
                    count={count}
                    column={column}
                  />
                );
              }

              return (
                <HeaderCell
                  components={components}
                  column={column}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  toggleSort={() => sortByColumn(column.dataField, sortOrder)}
                  style={{
                    minWidth: column.dataField === 'participant_id' ? '230px' : '',
                    width: column.dataField === 'study_name' ? '325px' : '',
                    textWrapMode: 'nowrap',
                  }}
                />
              );
            })
          }
        </TableRow>
      </TableHead>
    </ThemeProvider>
  );
};

CustomTableHeader.propTypes = {
  table: PropTypes.objectOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSelectAll: PropTypes.func.isRequired,
  sortByColumn: PropTypes.string.isRequired,
};

export default CustomTableHeader;
