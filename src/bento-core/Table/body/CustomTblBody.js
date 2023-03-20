import React from 'react';
import PropTypes from 'prop-types';
import {
  TableBody,
  TableRow,
  ThemeProvider,
  createTheme,
} from '@material-ui/core';
import CustomBodyCell from './CustomCell';
import { getClsName, tableCls } from '../util/ClassNames';
import defaultTheme from './DefaultThemConfig';
import { cellTypes } from '../util/Types';
import CheckboxView from './CheckBoxView';
import DeleteCellView from './DeleteCellView';

const CustomTableBody = ({
  rows = [],
  table,
  onRowSelectChange,
  customTheme = {},
}) => {
  const { columns } = table;
  const rootClsName = getClsName(table.title, `${tableCls.BODY}${tableCls.ROW}`);
  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });

  return (
    <ThemeProvider theme={themeConfig}>
      <TableBody>
        {rows
          .map((row) => (
            <TableRow className={rootClsName}>
              {
                columns.map((column) => {
                  const { cellType } = column;
                  switch (cellType) {
                    case cellTypes.CHECKBOX:
                      return (
                        <CheckboxView
                          rootClsName={rootClsName}
                          row={row}
                          onRowSelectChange={onRowSelectChange}
                        />
                      );
                    case cellTypes.DELETE:
                      return (
                        <DeleteCellView
                          row={row}
                          column={column}
                        />
                      );
                    default:
                      return (
                        <CustomBodyCell
                          column={column}
                          row={row}
                          rootClsName={rootClsName}
                        />
                      );
                  }
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
