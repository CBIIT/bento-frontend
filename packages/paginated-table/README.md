# PAGINATED TABLE COMPONENT DESIGN

### Bento core paginated table design:

* Use of UseReducer to track table state and local state to display dialog component
* use of useContext to access table state
* Limit use of props drilling
* Core layout defined by Bento Core table component
* Build on top of Mui table (demo - https://mui.com/material-ui/react-table/#custom-pagination-actions)
* Apply SOLID principles in react (https://konstantinlebedev.com/solid-in-react/)

## 1 UseReducer configuration

### Generate and integrate redux dispatch actions
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
    {
      dataField: 'clinical_study_name',
      header: 'Study Name',
      display: true,
      tooltipText: 'sort',
      role: cellTypes.DISPLAY,
    },
    {
      dataField: 'numberOfStudyFiles',
      header: 'Study File(s)',
      display: true,
      columnDefaultValues: {
        '0': 'Not Applicable', // replaces 0 with other text value in a column
      },
      role: cellTypes.DISPLAY, 
    }
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
      customViewRender: () => <h2>'custom Text'</h2>, // customize element (takes priority over title)
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
**Paginated Table Init State TABLE-1**
| Table State | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| title | TRUE | table name (Case, Sample, Files), required for class name | |
| query | TRUE | GraphQL Query for paginated Table (e.g. GET_CASES_OVERVIEW_QUERY) | api |
| dataKey | TRUE | Tracking selected rows (case - dataKey: 'subject_id') | dashboardTabData/tabContainers | 
| columns | TRUE | columns defined by dashboardTabData (tabContainers) | add fucntion attribut customCellRender/customColHeaderRender to configure custom cell (see bento frontend) | 
| count | TRUE | Total row cound for (Cases, Samples, Files), update based on filter event | | 
| selectedRows | TRUE | Tracks selected Rows | |
| tableMsg | TRUE |  Display noMatch Msg | dashboardTabData/tabContainers/tableMsg |
| theme | FALSE |  override style with themeprovider use ClassName provided by bento-core table to apply style (refer to class name table) | |
| paginationAPIField | TRUE |  Access http response data - defined by dashboardTabData (tabContainers) | ```paginationAPIField: 'subjectOverview'```|
| sortBy | TRUE | default sort column | defaultSortField: 'subject_id',|
| sortOrder | FALSE | default sort column 'ASC' | ```defaultSortDirection: 'asc',```|
| rowsPerPage | FALSE | default 10 | |
| page | FALSE | 0 | |
| extendedViewConfig | FALSE | extended view of table header component | refer bento-frontend / bento-icdc-frontend tabContainers, dashboardTabData.js |
| ColumnGroups | FALSE | ColumnGrouping Component | refer bento-icdc-frontend tabContainers, StudiesData.js |



### 2 Importing Component and Configuration
```
import TableView from 'bento-core/PaginationTable/PaginatedTable';
// active filter json structure
<TableView
  initState={initTblState}
  themeConfig={themeConfig}
  activeFilters={activeFilters}
  totalRowCount={dashboardStats[config.count]}
  activeTab={activeTab}
/> 
```

**Paginated Table Props Config TABLE-2**
| Table | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| table state | TRUE | as describe on TABLE-1 | |
| viewConfig | FALSE | (Optional) table view config, set hide/diaply pagination above table header | |
| themeConfig | FALSE | override style with themeprovider use ClassName provided by bento-core table to apply style (refer to class name table) | |
| totalRowCount | TRUE | Total row cound for (Cases, Samples, Files), update based on filter event | |
| activeTab | TRUE | prevents http call for inactive tabs (dashboard) /set true to myFile cart | |

## 3 Table component themeConfig Configuration
```
export const tblHeader = {
  MuiTableSortLabel: {
    root: {
     ...define style
    },
  },
};

export const tblPgn = {
  MuiTablePagination: {
    root: {
      paddingRight: '50px',
      borderTop: '5px solid #e7e5e5',
      borderBottom: '3px solid #e7e5e5',
    },
    toolbar: {
      minHeight: '45px',
    },
  },
};
// define mui styles for table component
export const themeConfig = {
  tblHeader,
  tblTopPgn,
  tblPgn,
  tblBody,
};
```

## 3 Table state Context provider Configuration
```
Reference - TabPanel.js (bento-frontend)

import { 
  TableContextProvider,
  TableView,
  Wrapper,
} from '@bento-core/paginated-table';

const initTblState = (initailState) => ({
  ...initailState,
  title: config.name,
  query: config.api,
  paginationAPIField: config.paginationAPIField,
  dataKey: config.dataKey,
  columns: configColumn(config.columns),
  count: dashboardStats[config.count],
  selectedRows: [],
  enableRowSelection: config.enableRowSelection,
  tableMsg: config.tableMsg,
  sortBy: config.defaultSortField,
  sortOrder: config.defaultSortDirection,
  extendedViewConfig: config.extendedViewConfig,
  columnGroups: config.columnGroups,
  rowsPerPage: 10,
  page: 0,
});

<TableContextProvider>
  <Wrapper
    wrapConfig={configWrapper(tableLayout)} // tableLayout - refer to step #4
    customTheme={customTheme}
    classes={classes}
    section={config.name}
  >
    <Grid container>
      <Grid item xs={12} id={config.tableID}>
        <TableView
          initState={initTblState}
          themeConfig={themeConfig}
          queryVariables={activeFilters}
          totalRowCount={dashboardStats[config.count]}
          activeTab={activeTab}
        />
      </Grid>
    </Grid>
  </Wrapper>
</TableContextProvider>

//child component

import { TableContext } from 'bento-core';

const tableContext = useContext(TableContext);

```
TableContextProvider provides table state to Wrapper Component or it can be used in higher parent component as needed.

#### 

## 4 Wrapper Configuration:
Wrapper component around table compnent. 
1. ADD ALL FILES button
2. ADD SELECTED ROWS button
3. Go to My File link

```
/**
* Configuration display component based on index
* CAUTION: If table is in wrapper component provide position of table component
*/
 export const tableLayout = [{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_header',
  items: [
    {
      title: 'ADD ALL FILES',
      clsName: 'add_all_button',
      type: types.BUTTON,
      role: btnTypes.ADD_ALL_FILES,
      btnType: btnTypes.ADD_ALL_FILES,
      conditional: false,
      alertMessage,
    },
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
    }],
},
{
  container: 'paginatedTable',
  paginatedTable: true,
},
{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer',
  items: [
    {
      title: 'ADD SELECTED FILES',
      clsName: 'add_selected_button',
      type: types.BUTTON,
      role: btnTypes.ADD_SELECTED_FILES,
      btnType: btnTypes.ADD_SELECTED_FILES,
      tooltipCofig: tooltipContent,
      conditional: true,
    }],
},
{
  container: 'buttons',
  size: 'xl',
  clsName: 'container_footer_link',
  items: [
    {
      title: 'Go to Cart >',
      clsName: 'go_to_cart',
      url: '#/fileCentricCart',
      type: types.LINK,
    }],
},
];
```

Each item in headerConfig and footerConfig represent container
**container Config TABLE-3**
headerConfig - upper component on the table
footerConfig - button component on the table
| Attris | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| container | TRUE | describe container | |
| size | TRUE | container size | xl, md, sm |
| clsName | TRUE | class name to apply style using themeprovider | |
| item | TRUE | number of button component ***(refer to table 4)*** | |

**Button component Config TABLE-4**
headerConfig - upper component on the table
| Attris | Required | description   | Configuration |
| :---        |    :----:|    :----:     |     ----: |
| title | TRUE | button label | 'ADD SELECTED FILES' |
| clsName | TRUE | class name to apply style using themeprovider | |
| type | TRUE | add all files or add selected files| btnTypes.ADD_SELECTED_FILES |
| tooltipCofig | FALSE | appears on side of the refers button | dashboardTabData/ tooltipContent |

***More reference***
```
https://github.com/CBIIT/bento-icdc-frontend/tree/Bento-4.0/src/components/PaginatedTable
```

**Code for table view under bento-core/table - please refer to source code for more information**
