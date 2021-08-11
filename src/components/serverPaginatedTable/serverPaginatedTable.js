/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React from 'react';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { CircularProgress, Backdrop, withStyles } from '@material-ui/core';
import { CustomDataTable } from 'bento-components';
import client from '../../utils/graphqlClient';
import CSVDownloadToolbar from './components/CSVDownloadCustomToolbar';

class ServerPaginatedTableView extends React.Component {
  state = {
    count: 1,
    page: 0,
    rowsPerPage: 10,
    sortOrder: {},
    data: 'undefined',
    isLoading: false,
    // Init an array updatedColumns - helps in tracking onViewColumnsChange
    updatedColumns: [],
  };

  componentDidMount() {
    this.getData('', 0);
    this.setState({
      sortOrder: {
        name: this.props.defaultSortCoulmn,
        direction: this.props.defaultSortDirection,
      },
    });
    if (this.props.updateSortOrder) {
      if (this.props.localRowsPerPage !== null) {
        const localRowsPerPage = parseInt(this.props.localRowsPerPage, 10);
        const localPage = parseInt(this.props.localPage, 10);
        this.setState({
          rowsPerPage: localRowsPerPage,
          page: localPage,
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data && this.props.data !== 'undefined') {
      this.getData('', 0);
    }
    if (this.props.data !== prevProps.data && this.props.data === 'undefined' && prevProps.data !== 'undefined' && this.props.updateSortOrder) {
      this.changeToPrevDataState(prevProps);
    }
  }

  // get data
  getData = (url, page) => {
    this.xhrRequest(url, page).then((res) => {
      this.setState({ data: res.data, count: this.props.count });
      if (this.props.updateSortOrder) {
        if (this.props.localRowsPerPage !== null) {
          const localRowsPerPage = parseInt(this.props.localRowsPerPage, 10);
          const localPage = parseInt(this.props.localPage, 10);
          if (localRowsPerPage !== this.state.rowsPerPage) {
            this.setState({
              rowsPerPage: localRowsPerPage,
            });
          }
          if (localPage !== this.state.page) {
            this.setState({
              page: localPage,
            });
          }
        }
      }
    });
  }

  changeToPrevDataState = (prevProps) => {
    this.setState({ data: prevProps.data, count: prevProps.count });
  }

  getSrcData = () => this.props.data;

  rowsSelectedTrigger = (displayedData) => {
    if (this.props.options.rowsSelectedTrigger) {
      this.props.options.rowsSelectedTrigger(
        displayedData.map((d) => d[this.props.options.dataKey]),
      );
    }
  }

  sort = (page, sortOrder) => {
    this.setState({ isLoading: true });
    const rowsPerPageSort = this.state.rowsPerPage;
    if (this.props.updateSortOrder) {
      const sortDirection = sortOrder.direction;
      const sortColumn = sortOrder.name;
      this.props.updateSortOrder({ sortColumn, sortDirection });
    }
    this.fetchData(page * rowsPerPageSort, rowsPerPageSort, sortOrder).then((res) => {
      this.rowsSelectedTrigger(res);
      // call setUpdatedColumnsDisplay to update columns display true/false after changePage
      if (this.props.options.viewColumns && this.state.updatedColumns.length) {
        this.setUpdatedColumnsDisplay(this.state.updatedColumns);
      }
      this.setState({
        isLoading: false,
        sortOrder,
        data: res,
        rowsPerPage: rowsPerPageSort,
      });
    });
  }

    // mock async function
    xhrRequest = (url, page, sortOrder = {}) => new Promise((resolve) => {
      // mock page data
      let fullData = this.getSrcData() !== {} ? this.getSrcData() : [{}];
      // console.log(fullData);
      // mock record count from server - normally this would be a number attached to the return data
      const total = 60;
      const sortField = sortOrder.name;
      const sortDir = sortOrder.direction;

      if (sortField) {
        fullData = fullData.sort((a, b) => {
          if (a[sortField] < b[sortField]) {
            return 1 * (sortDir === 'asc' ? -1 : 1);
          } if (a[sortField] > b[sortField]) {
            return -1 * (sortDir === 'asc' ? -1 : 1);
          }
          return 0;
        });
      }

      // eslint-disable-next-line max-len
      const localPage = page;
      /* const srcData = fullData.slice(
        page * this.state.rowsPerPage,
        (page + 1) * this.state.rowsPerPage,
      ); */
      const srcData = fullData;
      if (srcData !== 'undefined' && srcData.length !== this.state.rowsPerPage && this.props.count > this.state.rowsPerPage && this.props.localRowsPerPage === null) {
        this.changePage(0, {});
      } else {
        if (this.props.count < 10) {
          this.setState({
            rowsPerPage: 10,
          });
        }
        const data = srcData;
        if (this.props.updateSortOrder) {
          localStorage.setItem('dataLength', String(srcData.length));
        }
        setTimeout(() => {
          resolve({
            data, total, localPage,
          });
        }, 500);
      }
    })

    // set this.props.columns display true/false depending on updatedColumns from
    // onViewColumnsChange
    setUpdatedColumnsDisplay = (stateUpdatedColumns) => {
      stateUpdatedColumns.map((updatedColumns) => {
        const index = this.props.columns.map((e) => e.name)
          .indexOf(updatedColumns.label);
        if (updatedColumns.status === 'remove') {
          this.props.columns[index].options.display = false;
        } else {
          this.props.columns[index].options.display = true;
        }
        return '';
      });
    }

  changePage = (page, sortOrder) => {
    this.setState({
      isLoading: true,
    });
    this.fetchData(
      page * this.state.rowsPerPage,
      this.state.rowsPerPage,
      this.state.sortOrder,
    ).then((res) => {
      this.rowsSelectedTrigger(res);
      // call setUpdatedColumnsDisplay to update columns display true/false after changePage
      if (this.props.options.viewColumns && this.state.updatedColumns.length) {
        this.setUpdatedColumnsDisplay(this.state.updatedColumns);
      }
      this.setState({
        isLoading: false,
        sortOrder,
        data: res,
        page,
      });
    });
  };

  updateData = () => {
    this.setState({
      isLoading: true,
    });
    this.setState({
      isLoading: false,
      data: this.getSrcData(),
    });
  };

  onTableInit = (data) => {
    this.rowsSelectedTrigger(data);
  };

  async fetchData(offset, rowsRequired, sortOrder = {}) {
    let sortDirection = 'asc';
    let sortColumn = 'arm';
    let offsetReal = offset;
    let page = offset / rowsRequired;
    // if the offset value is bigger that the count, then change offset value
    if (offset >= this.props.count) {
      page = this.props.count % rowsRequired !== 0 ? Math.floor(this.props.count / rowsRequired)
        : Math.floor(this.props.count / rowsRequired) - 1;
      offsetReal = page * rowsRequired;
      localStorage.setItem('page', String(page));
      this.setState({
        page,
      });
    }
    sortDirection = Object.keys(sortOrder).length === 0 ? this.props.defaultSortDirection || 'asc' : sortOrder.direction;
    sortColumn = Object.keys(sortOrder).length === 0 ? this.props.defaultSortCoulmn || '' : sortOrder.name;
    if (this.props.updateSortOrder) {
      localStorage.setItem('page', String(page));
      localStorage.setItem('rowsPerPage', String(rowsRequired));
      this.setState({
        page,
      });
    }
    const fetchResult = await client
      .query({
        query: sortDirection !== 'asc' ? this.props.overviewDesc : this.props.overview,
        variables: {
          offset: offsetReal,
          first: this.props.count < rowsRequired ? this.props.count : rowsRequired,
          order_by: sortColumn,
          ...this.props.queryCustomVaribles,
        },
      })
      .then((result) => (sortDirection !== 'asc' ? result.data[this.props.paginationAPIFieldDesc] : result.data[this.props.paginationAPIField]));
    if (this.props.updateSortOrder) {
      localStorage.setItem('dataLength', String(fetchResult.length));
    }
    return fetchResult;
  }

  render() {
    const {
      data, count, isLoading, sortOrder, className, rowsPerPage, page,
    } = this.state;
    const options1 = {
      filterType: 'dropdown',
      responsive: 'stacked',
      serverSide: true,
      count,
      rowsPerPage,
      rowsPerPageOptions: [],
      customToolbar: this.props.tableDownloadCSV.defaultFullTableDownload ? () => (
        this.props.tableDownloadCSV && (
          <CSVDownloadToolbar
            tableDownloadCSV={this.props.tableDownloadCSV}
            queryCustomVaribles={this.props.queryCustomVaribles}
          />
        )
      ) : '',
      sortOrder,
      onRowSelectionChange: (
        curr,
        allRowsSelected,
        rowsSelected,
        displayData,
      ) => this.props.options.onRowSelectionChange(
        curr,
        allRowsSelected,
        rowsSelected,
        displayData,
        data,
      ),
      // eslint-disable-next-line no-shadow
      customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              page={page}
              rowsPerPage={rowsPerPage}
              // eslint-disable-next-line max-len
              onChangeRowsPerPage={(event) => { this.setState({ rowsPerPage: event.target.value }); changePage(page); changeRowsPerPage(event.target.value); }}
              // eslint-disable-next-line no-shadow
              onChangePage={(_, page) => changePage(page)}
            />
          </TableRow>
        </TableFooter>
      ),

      onTableInit: () => this.onTableInit(data),
      // rowsSelected: data.map((item, idx) => idx),
      onTableChange: (action, tableState) => {
        // console.log(action, tableState);

        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page, tableState.sortOrder);
            break;
          case 'sort':
            this.sort(tableState.page, tableState.sortOrder);
            break;
          default:
            break;
        }
      },
      onViewColumnsChange: (changedColumn, action) => {
        // Track user interaction with ViewColumns and build an array updatedColumns
        // updatedColumns shall Save label, status for every interaction
        const index = this.state.updatedColumns.findIndex((x) => x.label === changedColumn);
        if (index === -1) {
          this.state.updatedColumns.push({
            label: changedColumn,
            status: action,
          });
        } else if (changedColumn[index].status !== action) {
          this.state.updatedColumns.splice(index, 1);
          this.state.updatedColumns.push({
            label: changedColumn,
            status: action,
          });
        }
        return '';
      },
    };
    if (this.props.updateSortOrder) {
      options1.page = page;
    }
    return (
      <div>
        <Backdrop
          open={(isLoading || this.props.isLoading) && data !== 'undefined'}
          className={this.props.classes.backdrop}
        >
          <CircularProgress />
        </Backdrop>
        {data === 'undefined' ? <CircularProgress /> : (
          <CustomDataTable
            data={data}
            columns={this.props.columns}
            options={({ ...this.props.options, ...options1 })}
            className={className}
          />
        )}
      </div>
    );
  }
}

const styles = () => ({
  backdrop: {
    position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
});
export default withStyles(styles)(ServerPaginatedTableView);
