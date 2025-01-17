import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { columns } from './tableConfig';
import CellView from './components/Cell/CellView';

const PropertyView = ({
  properties,
}) => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell>
                  {column.name}
                </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(properties).map(
                (pName) => (
                  <TableRow>
                    {columns.map(col => {
                      return (
                        <CellView
                          column={col} row={properties[pName]}
                        />
                      )
                    })}
                  </TableRow>
                )
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
} 

export default PropertyView;
