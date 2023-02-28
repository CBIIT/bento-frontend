import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import TableView from './TableView';
import { getTableData } from './service/TableService';

const TableController = ((props) => {
  const { activeFilters, tab, table } = props;
  const { tableData } = getTableData(activeFilters, tab, table.selectedRows);
  if (!tableData) {
    return <CircularProgress />;
  }
  return (
    <TableView
      {...props}
      tableRows={tableData}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
});

export default connect(mapStateToProps, null)(TableController);
