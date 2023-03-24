import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import TableView from '../../bento-core/PaginationTable/PaginatedTable';
import { configColumn } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';
import Wrapper from '../../bento-core/Wrapper/Wrapper';
import { headerConfig, outerLayoutConfig } from './wrapperConfig/Wrapper';
import { customTheme } from './wrapperConfig/Theme';
import styles from './cartView.style';

const CartView = ({
  classes,
  config,
  deleteAllFiles,
  deleteCartFile,
  filesId = [],
}) => {
  /**
  * configure table state
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: configColumn(config.columns, deleteAllFiles, deleteCartFile),
    selectedRows: [],
    tableMsg: config.tableMsg,
    paginationAPIField: config.paginationAPIField,
    sortBy: config.defaultSortField,
    sortOrder: config.defaultSortDirection,
    rowsPerPage: 10,
    page: 0,
  });

  const variables = {};
  variables.file_ids = filesId;

  const Header = () => (
    <>
      <Wrapper
        wrapConfig={outerLayoutConfig}
        customTheme={customTheme}
        classes={classes}
      />
      <Wrapper
        wrapConfig={headerConfig}
        customTheme={customTheme}
        classes={classes}
        section="myFiles"
      />
    </>
  );

  return (
    <Grid>
      <Grid item xs={12}>
        <div className={classes.myFilesWrapper}>
          <Header />
          <TableView
            initState={initTblState}
            themeConfig={themeConfig}
            queryVariables={variables}
            totalRowCount={filesId.length}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CartView);
