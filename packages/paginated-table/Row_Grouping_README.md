### Row Grouping Configure 
```
export const config = {
  title: 'program',
  dataField: 'studiesByProgram',
  // select column for row grouping 
  groupBy: 'arm',
  
  extendedViewConfig: {
    download: {
      customDownload: false,
      downloadFileName: 'ICDC_ARMS_AND_COHORTS_download',
      downloadCsv: 'Download Table Contents As CSV',
    },
    manageViewColumns: {
      title: 'View Columns',
    },
  },
  columns: [
    {
      dataField: 'arm',
      header: 'Arm',
      display: true,
      tooltipText: 'sort',
      cellType: cellTypes.CUSTOM_ELEM,
    },
    // other columns
  ]
}
```