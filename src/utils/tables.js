import React from 'react';
import CustomFooter from '../components/CustomFooter';
import formatBytes from './formatBytes';

//  Generate MuiTable's columns.
// @Param table example
// const table = {
//   columns: [
//     {
//       dataField: 'file_name',
//       header: 'File Name',
//     },
//     {
//       dataField: 'file_type',
//       header: 'File Type',
//     },
//     {
//       dataField: 'association',
//       header: 'Association',
//     },
//     {
//       dataField: 'file_description',
//       header: 'Description',
//     },
//     {
//       dataField: 'file_format',
//       header: 'Format',
//     },
//     {
//       dataField: 'file_size',
//       header: 'Size',
//       // set formatBytes to true to display file size (in bytes) in a more human readable format
//       formatBytes: true,
//     },
//   ],
// };

export function getColumns(table) {
  return table.columns.map((column) => (
    {
      name: column.dataField,
      label: column.header,
      options: {
        display: !(typeof (column.display) !== 'undefined' && column.display === false),
        customBodyRender: (value) => (
          <div>
            {' '}
            {column.formatBytes ? formatBytes(value) : value}
            {' '}
          </div>
        ),
      },
    }
  ));
}

export function getOptions(table, customFooter, onRowSelectionChange, dateTimeStamp) {
  return {
    selectableRows: table.selectableRows ? table.selectableRows : 'none',
    search: table.search ? table.search : false,
    filter: table.filter ? table.filter : false,
    searchable: table.searchable ? table.searchable : false,
    print: table.print ? table.print : false,
    download: table.download ? table.download : false,
    sortOrder: {
      name: table.defaultSortField,
      direction: table.defaultSortDirection,
    },
    downloadOptions: {
      filename:
        table.downloadOptions && table.downloadOptions.filename
          ? table.downloadOptions.filename.concat(dateTimeStamp()).concat('.csv') : 'Bento_files_download.csv',
      filterOptions: {
        useDisplayedColumnsOnly:
        table.downloadOptions
        && table.downloadOptions.filterOptions
        && table.downloadOptions.filterOptions.useDisplayedColumnsOnly
          ? table.downloadOptions.filterOptions.useDisplayedColumnsOnly : false,
      },
    },
    viewColumns: table.viewColumns ? table.viewColumns : false,
    pagination: table.pagination ? table.pagination : true,
    onRowSelectionChange: (curr, allRowsSelected) => onRowSelectionChange(curr, allRowsSelected),
    // eslint-disable-next-line no-unused-vars
    customToolbarSelect: (selectedRows, displayData) => '',
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => customFooter(
      count,
      page,
      rowsPerPage,
      changeRowsPerPage,
      changePage,
    ),
  };
}

export const getCustomFooter = (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
  <CustomFooter
    count={count}
    page={page}
    rowsPerPage={rowsPerPage}
    onChangeRowsPerPage={(event) => changeRowsPerPage(event.target.value)}
        // eslint-disable-next-line no-shadow
    onChangePage={(_, page) => changePage(page)}
  />
);
