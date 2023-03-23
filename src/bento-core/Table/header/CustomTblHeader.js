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
import { cellTypes } from '../util/Types';
import CheckboxView from './components/CheckBoxView';
import DeleteCellView from './components/DeleteCellView';

const CustomTableHeader = ({
  table,
  rows,
  toggleSelectAll,
  sortByColumn,
  components = {},
  customTheme = {},
}) => {
  const {
    columns,
    selectedRows,
    sortBy,
    sortOrder,
  } = table;
  const Ids = rows.map((row) => row[table.dataKey]);
  const includeSelectedIds = Ids.some((id) => selectedRows.includes(id));
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
            columns.map((column) => {
              const { cellType } = column;
              switch (cellType) {
                case cellTypes.CHECKBOX:
                  return (
                    <CheckboxView
                      includeSelectedIds={includeSelectedIds}
                      toggleSelectAll={toggleSelectAll}
                      Ids={Ids}
                    />
                  );
                case cellTypes.DELETE:
                  return (
                    <DeleteCellView
                      column={column}
                      openDialogBox={() => console.log('delete')}
                    />
                  );
                default:
                  return (
                    <HeaderCell
                      components={components}
                      column={column}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      toggleSort={() => sortByColumn(column.dataField, sortOrder)}
                    />
                  );
              }
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
