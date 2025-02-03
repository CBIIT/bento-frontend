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
import * as Styled from './Property.styled';

const PropertyView = ({
  properties,
}) => {
    return (
      <TableContainer component={Paper} className="tableContainer">
        <Styled.MuiTable aria-label="property table">
          <Styled.TableHeader className="tableHeader">
            <TableRow className="headerRow">
              {columns.map(column => (
                <TableCell className={`headerColumn_${column.field}`}>
                  {column.name}
                </TableCell>
                )
              )}
            </TableRow>
          </Styled.TableHeader>
          <TableBody className="tableBody">
            {
              Object.keys(properties).map(
                (pName, index) => (
                  <Styled.MuiTableRow index={index} className="tableRow">
                    {columns.map(col => {
                      return (
                        <CellView
                          className={`column_${col.field}`}
                          column={col} row={properties[pName]}
                        />
                      )
                    })}
                  </Styled.MuiTableRow >
                )
              )
            }
          </TableBody>
        </Styled.MuiTable>
      </TableContainer>
    );
} 

export default PropertyView;
