import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core';
import { TableContext, TableView, Wrapper } from '@bento-core/paginated-table';
import {
  displayPgn,
  hidePgn,
  themeConfig,
  wrapperThemConfig,
} from './Theme';
import { footerConfig } from './ThemeConfigWrapper';
import {
  filesTable,
} from '../../../bento/armDetailData';

const FilesTableView = ({
  classes,
  data,
}) => {
  const initTblState = (initailState) => ({
    ...initailState,
    title: filesTable.name,
    columns: filesTable.columns,
    selectedRows: [],
    tableMsg: filesTable.tableMsg,
    sortBy: filesTable.defaultSortField,
    sortOrder: filesTable.defaultSortDirection,
    rowsPerPage: 10,
    dataKey: filesTable.dataKey,
    page: 0,
  });

  const { context } = useContext(TableContext);
  const { selectedRows = [] } = context;
  const tblPgn = (data.length === 0) ? hidePgn : displayPgn;

  return (
    <>
      {selectedRows.length === 0 && (
        <div className={classes.tableTitle} id="arm_detail_table_title">
          <span className={classes.tableName}>
            {filesTable.title}
          </span>
        </div>
      )}
      <TableView
        initState={initTblState}
        themeConfig={{ ...themeConfig, tblPgn }}
        server={false}
        tblRows={data}
        totalRowCount={data.length}
      />
      <Wrapper
        wrapConfig={footerConfig}
        customTheme={wrapperThemConfig}
        classes={classes}
        section={filesTable.name}
      />
    </>
  );
};

const styles = () => ({
  customTooltip: {
    color: '#0D4659',
    width: '225px',
    border: '2px solid #03A383',
    padding: '10px 10px 10px 13px',
    fontsize: '12px',
    background: '#fff',
    minHeight: '50px',
    textAlign: 'left',
    borderRadius: '10px',
  },
  customArrow: {
    '&::before': {
      border: '#03A383 1px solid',
    },
  },
  container: {
    background: '#fff',
    height: '35px',
    maxWidth: '100%',
    lineHeight: '40px',
  },
  tableName: {
    color: '#3695a9',
    fontSize: '17px',
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    textTransform: 'uppercase',
  },
  tableTitle: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '18px',
    letterSpacing: '0.025em',
    color: '#3695A9',
    paddingBottom: '19px',
    marginLeft: '25px',
  },
});

export default withStyles(styles)(FilesTableView);
