import React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead,
  TableRow,
  withStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import HeaderCell from './CustomCell';
import { getClsName, tableCls } from '../util/ClassNames';
import defaultTheme from './DefaultThemConfig';
import { cellTypes } from '../util/Types';
import CheckboxView from './CheckBoxView';
import DeleteCellView from './DeleteCellView';

const CustomTableHeader = ({
  classes,
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
  const rootClsName = getClsName(table.title, tableCls.HEADER);
  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      <TableHead className={rootClsName}>
        <TableRow className={`${rootClsName}${tableCls.ROW}`}>
          {
            columns.map((column) => {
              const { cellType } = column;
              switch (cellType) {
                case cellTypes.CHECKBOX:
                  return (
                    <CheckboxView
                      classes={classes}
                      rootClsName={rootClsName}
                      includeSelectedIds={includeSelectedIds}
                      toggleSelectAll={toggleSelectAll}
                      Ids={Ids}
                    />
                  );
                case cellTypes.DELETE:
                  return (
                    <DeleteCellView
                      openDialogBox={() => console.log('delete')}
                    />
                  );
                default:
                  return (
                    <HeaderCell
                      rootClsName={rootClsName}
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

const styles = () => ({
  checkboxRoot: {
    marginLeft: '12px',
    height: 12,
    color: 'inherit',
    '&$checked': {
      color: '#8DCAFF',
    },
  },
});

export default withStyles(styles)(CustomTableHeader);
