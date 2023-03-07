import React from 'react';
import PropTypes from 'prop-types';
import {
  TableBody,
  TableRow,
  Checkbox,
  ThemeProvider,
  createTheme,
  TableCell,
} from '@material-ui/core';
import clsx from 'clsx';
import CustomBodyCell from './CustomCell';
import { getClsName, tableCls } from '../ClassNames';
import defaultTheme from './DefaultThemConfig';

const CustomTableBody = ({
  rows,
  table,
  onRowSelectChange,
  customTheme = {},
}) => {
  const { columns } = table;
  const rootClsName = getClsName(table.title, `${tableCls.BODY}${tableCls.ROW}`);

  return (
    <ThemeProvider theme={createTheme({ overrides: { ...defaultTheme(), ...customTheme } })}>
      <TableBody>
        {rows
          .map((row) => (
            <TableRow className={rootClsName}>
              <TableCell padding="checkbox">
                <Checkbox
                  className={clsx({
                    [`${rootClsName}${tableCls.CHECKBOX_ACTIVE}`]: row.isChecked,
                  })}
                  disableRipple
                  onClick={(event) => onRowSelectChange(event, row)}
                  checked={row.isChecked}
                />
              </TableCell>
              {columns.map((column) => (
                <CustomBodyCell
                  column={column}
                  row={row}
                  rootClsName={rootClsName}
                />
              ))}
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
