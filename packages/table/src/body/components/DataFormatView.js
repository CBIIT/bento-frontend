import React from 'react';
import { Typography } from '@material-ui/core';
import { dataFormatTypes } from '../../util/Types';
import { formatBytes } from '../../util/Dataformat';

/**
* dataformat view for file size (byte, MB, GB)
* or other data format column as required
*/
const CellView = ({
  column,
  row,
}) => {
  const { dataFormatType } = column;
  const value = row[column?.dataField];
  switch (dataFormatType) {
    case dataFormatTypes.FORMAT_BYTES:
      return (
        <Typography>
          {formatBytes(value)}
        </Typography>
      );
    default:
      return (
        <Typography>
          {value}
        </Typography>
      );
  }
};

const DataFormatView = ({
  column,
  row,
}) => (
  <>
    <CellView
      column={column}
      row={row}
    />
  </>
);

export default DataFormatView;
