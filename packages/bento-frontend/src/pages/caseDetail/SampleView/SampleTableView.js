import React, { useContext } from 'react';
import { Container, withStyles } from '@material-ui/core';
import { TableContext, TableView, Wrapper } from '@bento-core/paginated-table';
import {
  sampleTable,
} from '../../../bento/caseDetailData';
import { themeConfig, wrapperThemConfig } from './Theme';
import { footerConfig } from './Wrapper';

const SampleTableView = ({
  classes,
  data,
}) => {
  const initTblState = (initailState) => ({
    ...initailState,
    title: sampleTable.name,
    columns: sampleTable.columns,
    selectedRows: [],
    tableMsg: sampleTable.tableMsg,
    sortBy: sampleTable.defaultSortField,
    sortOrder: sampleTable.defaultSortDirection,
    rowsPerPage: 10,
    dataKey: sampleTable.dataKey,
    page: 0,
  });

  const { context } = useContext(TableContext);
  const { selectedRows = [] } = context;

  return (
    <>
      {selectedRows.length === 0 && (
        <Container className={classes.container}>
          <span className={classes.tableName}>
            {sampleTable.tableTitle}
          </span>
        </Container>
      )}
      <TableView
        initState={initTblState}
        themeConfig={themeConfig}
        server={false}
        tblRows={data}
        totalRowCount={data.length}
      />
      <Wrapper
        wrapConfig={footerConfig}
        customTheme={wrapperThemConfig}
        classes={classes}
        section={sampleTable.name}
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
});

export default withStyles(styles)(SampleTableView);
