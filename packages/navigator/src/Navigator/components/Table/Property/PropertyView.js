import React from 'react';
import { CircularProgress } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { defaultColumnsConfig } from './tableConfig';
import CellView from './components/Cell/CellView';
import * as Styled from './Property.styled';
import { useModelContext } from '../../../state/NavContextProvider';

const PropertyView = ({
  properties,
}) => {
  /**
  * use context access data model state
  */
  const { context } = useModelContext();
  if (Object.keys(context || {}).length === 0) {
    return <CircularProgress />;
  }

  const { tableConfig } = context;
  const columns = tableConfig?.columns || defaultColumnsConfig;

  return (
    <TableContainer component={Paper} className="tableContainer">
      <Styled.MuiTable aria-label="property table">
        <Styled.TableHeader className="tableHeader">
          <Styled.HeaderRow className="headerRow">
            {columns.map((column) => (
              <TableCell className={`headerColumn_${column.field}`}>
                {column.name}
              </TableCell>
            ))}
          </Styled.HeaderRow>
        </Styled.TableHeader>
        <TableBody className="tableBody">
          {
            Object.keys(properties).map(
              (pName, index) => (
                <Styled.MuiTableRow index={index} className="tableRow">
                  {columns.map((col) => (
                    <CellView
                      className={`column_${col.field}`}
                      column={col}
                      row={properties[pName]}
                    />
                  ))}
                </Styled.MuiTableRow>
              ),
            )
          }
        </TableBody>
      </Styled.MuiTable>
    </TableContainer>
  );
};

export default PropertyView;
