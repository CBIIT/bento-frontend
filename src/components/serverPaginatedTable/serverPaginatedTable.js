/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */

import React from 'react';
import { connect } from 'react-redux';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

import { CircularProgress, Typography } from '@material-ui/core';
import { CustomDataTable } from 'bento-components';
import {
  GET_FILES_OVERVIEW_QUERY,
  GET_SAMPLES_OVERVIEW_QUERY,
  GET_CASES_OVERVIEW_QUERY,
} from '../../bento/dashboardTabData';
import client from '../../utils/graphqlClient';

class ServerPaginatedTableView extends React.Component {
  state = {
    count: 1,
    rowsPerPage: 10,
    sortOrder: {},
    data: [['Loading Data...']],
    isLoading: false,
  };

  componentDidMount() {
    this.getData('', 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.getData('', 0);
    }
  }

  // get data
  getData = (url, page) => {
    this.setState({ isLoading: true });
    this.xhrRequest(url, page).then((res) => {
      this.setState({ data: res.data, isLoading: false, count: this.props.count });
    });
  }

  getSrcData = () => this.props.data;

  sort = (page, sortOrder) => {
    this.setState({ isLoading: true });
    this.xhrRequest('', page, sortOrder).then((res) => {
      this.setState({
        data: res.data,
        sortOrder,
        isLoading: false,
      });
    });
  }

    // mock async function
    xhrRequest = (url, page, sortOrder = {}) => new Promise((resolve) => {
      // mock page data
      let fullData = this.getSrcData() !== {} ? this.getSrcData() : [{}];
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
      const srcData = fullData.slice(page * this.state.rowsPerPage, (page + 1) * this.state.rowsPerPage);
      const data = srcData;

      setTimeout(() => {
        resolve({
          data, total, page,
        });
      }, 500);
    })

  changePage = (page, sortOrder) => {
    this.setState({
      isLoading: true,
    });
    this.fetchData(page * this.state.rowsPerPage, this.state.rowsPerPage).then((res) => {
      this.setState({
        isLoading: false,
        sortOrder,
        data: res,
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

  async fetchData(offset, rowsRequired) {
    const QUERY = this.props.api === 'GET_SAMPLES_OVERVIEW_QUERY' ? GET_SAMPLES_OVERVIEW_QUERY : this.props.api === 'GET_FILES_OVERVIEW_QUERY' ? GET_FILES_OVERVIEW_QUERY : GET_CASES_OVERVIEW_QUERY;
    const result1 = await client
      .query({
        query: QUERY,
        variables: { subject_ids: this.props.filteredSubjectIds, offset, first: rowsRequired },
      })
      .then((result) => result.data[this.props.paginationAPIField]);
    return result1;
  }

  render() {
    const {
      data, count, isLoading, rowsPerPage, sortOrder,
    } = this.state;
    const options1 = {
      filterType: 'dropdown',
      responsive: 'stacked',
      serverSide: true,
      count,
      rowsPerPage,
      rowsPerPageOptions: [],
      sortOrder,
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
    };

    return (
      <div>
        <CustomDataTable
          title={(
            <Typography variant="h6">
              {isLoading && <CircularProgress size={24} style={{ marginLeft: 15, position: 'relative', top: 4 }} />}
            </Typography>
)}
          data={data}
          columns={this.props.columns}
          options={({ ...this.props.options, ...options1 })}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    filteredSubjectIds,
  } = state.dashboardTab;

  return {
    filteredSubjectIds,
  };
}

export default connect(mapStateToProps)(ServerPaginatedTableView);
