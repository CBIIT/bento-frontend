import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
} from '@material-ui/core';
import HeaderCell from './CustomHeaderCell';
import { tableCls } from '../CustomClassNames';

const CustomTableHeader = ({
  classes,
  table,
  rows,
  toggleSelectAll,
  sortByColumn,
  columnOptions,
  themeConfig = {},
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
  * generate root id based on table info
  * uses themeprovider to customize style
  */
  const rootId = `${table.title}`
    .replace(' ', '_')
    .toLowerCase()
    .concat(`_${tableCls.HEADER}`);

  return (
    <ThemeProvider theme={createTheme(themeConfig)}>
      <TableHead id={rootId}>
        <TableRow id={`${rootId}${tableCls.ROW}`}>
          <TableCell padding="checkbox">
            <FormControlLabel
              control={(
                <Checkbox
                  className={clsx(`${rootId}${tableCls.CHECKBOX}`, {
                    [`${rootId}${tableCls.CHECKBOX_ACTIVE}`]: includeSelectedIds,
                    [`${rootId}${tableCls.CHECKBOX_INACTIVE}`]: !includeSelectedIds,
                  })}
                  classes={{
                    root: classes.checkboxRoot,
                    checked: classes.checked,
                    disabled: classes.disabled,
                  }}
                  color="primary"
                  indeterminate={includeSelectedIds}
                  checked={includeSelectedIds}
                  onChange={(event) => toggleSelectAll(event, Ids, includeSelectedIds)}
                />
              )}
            />
          </TableCell>
          {
            columns.map((column) => (
              <HeaderCell
                id={rootId}
                options={columnOptions}
                column={column}
                sortBy={sortBy}
                sortOrder={sortOrder}
                toggleSort={() => sortByColumn(column.dataField, sortOrder)}
              />
            ))
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
  fixedHeader: {
    position: 'relative',
  },
  headerCell: {
    borderTop: '3px solid #42779A',
    color: '#13344A',
    backgroundColor: '#ffffff',
  },
});

export default withStyles(styles)(CustomTableHeader);
