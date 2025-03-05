/* eslint-disable react/forbid-prop-types */
// TODO: Need to fix Es
import React from 'react';
import PropTypes from 'prop-types';
import {
  TableBody,
  TableRow,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import DisplayCell from './DisplayBodyCell';
import defaultTheme from './DefaultThemConfig';
import { actionCellTypes } from '../util/Types';
import ActionCell from './ActionBodyCell';

/**
* 1. Returns cell associated with action (checkbox / delete view)
* 2. Returns cell associated with display data (DisplayBodyCell)
*/
const CustomTableBody = ({
  rows = [],
  table,
  onRowSelectChange,
  customTheme = {},
}) => {
  const { columns } = table;
  const displayColunms = columns.filter((col) => col.display);
  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });

  return (
    <ThemeProvider theme={themeConfig}>
      <TableBody>
        {rows
          .map((row) => (
            <TableRow>
              {
                displayColunms.map((column) => {
                  const { cellType } = column;
                  const isActionCell = actionCellTypes.includes(cellType) || false;
                  if (isActionCell) {
                    return (
                      <ActionCell
                        row={row}
                        column={column}
                        onRowSelectChange={onRowSelectChange}
                      />
                    );
                  }
                  return (
                    <DisplayCell
                      column={column}
                      row={row}
                      themeConfig={themeConfig}
                    />
                  );
                })
              }
            </TableRow>
          ))}
      </TableBody>
    </ThemeProvider>
  );
};

CustomTableBody.propTypes = {
  table: PropTypes.objectOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowSelectChange: PropTypes.func.isRequired,
};

export default CustomTableBody;
