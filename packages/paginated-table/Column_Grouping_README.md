### Column Grouping Configure 
* startColIndex - endColIndex: range of the column group, should not be overlapping between the column groups. 
```
const config = {
  title: 'program',
  dataField: 'studiesByProgram',
  extendedViewConfig: { // display download button and manage view column
    download: {
      downloadFileName: 'ICDC_Studies_download',
      downloadCsv: 'Download Table Contents As CSV',
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  }
  columns: [
    {
      cellType: cellTypes.CHECKBOX,
      display: true,
      role: cellTypes.CHECKBOX,
    },
    {
      dataField: 'program_id',
      header: 'Program',
      cellType: cellTypes.LINK,
      linkAttr: {
        rootPath: '/program',
        pathParams: ['program_id'],
      },
      role: cellTypes.DISPLAY,
      display: true,
    },
  ],
  columnGroups: {
    {
      clsName: 'col_group_1',
      title: 'column group title',
      columnIndexes: [startColIndex, endColIndex],
    },
    {
      clsName: 'col_group_2',
      title: 'column group title',
      customViewRender: () => <h2>'custom Text'</h2>, // add custom element to title
      columnIndexes: [startColIndex, endColIndex],
    },
  }
}

const initTblState = (initailState) => ({
  ...initailState,
  title: config.name,
  query: config.api,
  dataKey: config.dataKey,
  columns: configColumn(config.columns),
  count: dashboardStats[config.count],
  selectedRows: [],
  tableMsg: config.tableMsg,
  paginationAPIField: config.paginationAPIField,
  sortBy: config.defaultSortField,
  sortOrder: config.defaultSortDirection,
  columnGroups: config.columnGroups
  rowsPerPage: 10,
  page: 0,
});
```