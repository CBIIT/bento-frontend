import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { TableView } from '@bento-core/paginated-table';
import { configColumn } from './tableConfig/Column';
import { themeConfig } from './tableConfig/Theme';
import { Wrapper } from '../../bento-core/Wrapper';
import { footerConfig } from './wrapperConfig/Wrapper';
import { customTheme } from './wrapperConfig/Theme';
import styles from './cartView.style';
import Header from './cartHeader';
import client from '../../utils/graphqlClient';

const CartView = (props) => {
  const {
    classes,
    config,
    filesId = [],
  } = props;

  const Footer = () => (
    <>
      <Wrapper
        wrapConfig={footerConfig}
        customTheme={customTheme}
        classes={classes}
        section="myFiles"
      />
    </>
  );

  /**
  * configure table state
  */
  const initTblState = (initailState) => ({
    ...initailState,
    title: 'myFiles',
    query: config.api,
    dataKey: config.dataKey,
    columns: configColumn({ columns: config.columns, ...props }),
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
  return (
    <Grid>
      <Grid item xs={12}>
        <div className={classes.myFilesWrapper}>
          <Header
            classes={classes}
            queryVariables={variables}
          />
          <TableView
            client={client}
            initState={initTblState}
            themeConfig={themeConfig}
            queryVariables={variables}
            totalRowCount={filesId.length}
          />
          <Footer />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(CartView);
