import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import styles from './TabStyle';
import { tableViewConfig } from '../../../bento/dashboardTabData';
import { themeConfig } from './tableConfig/Theme';
import { configColumn } from './tableConfig/Column';
import { configWrapper, footerConfig, headerConfig } from './wrapperConfig/Wrapper';
import { customTheme } from './wrapperConfig/Theme';
import { TableContextProvider, TableView } from '../../../bento-core/PaginationTable';
import { Wrapper } from '../../../bento-core/Wrapper';

const TabView = (props) => {
  /**
  * initialize state for useReducer
  * @param {*} initailState
  * @returns reducer state
  */
  const {
    config,
    dashboardStats,
    activeFilters,
    classes,
    activeTab,
  } = props;
  /*
  * useReducer table state
  * paginated table update data when state change
  */
  /**
  * Server Pagination Table Configuration
  * 1. title - (Required) table name (Case, Sample, Files), required for class name
  * 2. api - (Required) GraphQL Query for paginated Table (e.g. GET_CASES_OVERVIEW_QUERY)
  * 3. dataKey - (Required) Tracking selected rows (case - dataKey: 'subject_id')
  * 4. sortBy - (Required) default sort column
  * 5. columns - (Required) columns defined by dashboardTabData (tabContainers)
  * (see configColumn method for customRedering)
  * 6. tableMsg - (Required) Display noMatch Msg
  * 7. theme - (Optional) override style with themeprovider use ClassName provided by
  * bento-core table to apply style (refer to class name table)
  * 8. paginationAPIField - (Required) Access http response data - defined by
  * dashboardTabData (tabContainers)
  * eg. case tab paginationAPIField: 'subjectOverview' - {subjectOverview: [data]}
  * 9. viewConfig - (Optional) table view config, set hide/diaply pagination above table header
  */
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
    rowsPerPage: 10,
    page: 0,
  });

  return (
    <TableContextProvider>
      <Wrapper
        wrapConfig={configWrapper(config, headerConfig)}
        customTheme={customTheme}
        classes={classes}
        section={config.name}
      />
      <Grid container>
        <Grid item xs={12} id={config.tableID}>
          <TableView
            initState={initTblState}
            viewConfig={tableViewConfig}
            themeConfig={themeConfig}
            queryVariables={activeFilters}
            totalRowCount={dashboardStats[config.count]}
            activeTab={activeTab}
          />
        </Grid>
      </Grid>
      <Wrapper
        wrapConfig={configWrapper(config, footerConfig)}
        customTheme={customTheme}
        classes={classes}
        section={config.name}
      />
    </TableContextProvider>
  );
};

export default withStyles(styles)(TabView);
