import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import TableView from './components/TableView';
import { getTableData, setSelectedRows } from './service/TableService';

const TableController = ((props) => {
  const { tableData } = getTableData(props);
  if (!tableData) {
    return <CircularProgress />;
  }
  /**
  * set selected row
  */
  const { table } = props;
  const updateRows = setSelectedRows(tableData, table);
  return (
    <>
      <TableView
        {...props}
        tableRows={updateRows}
      />
    </>
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

export default connect(mapStateToProps, null)(TableController);
