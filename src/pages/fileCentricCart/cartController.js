import React from 'react';
// import { CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { getCart, updateSortOrder } from './store/cart';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC, table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const cart = getCart();
  const ids = cart.fileIds ? cart.fileIds : [];
  const defaultSortDirection = cart.sortDirection === '' || !cart.sortDirection || cart.sortDirection === null ? table.defaultSortDirection || 'asc' : cart.sortDirection;
  const CART_QUERY = defaultSortDirection === 'desc' ? GET_MY_CART_DATA_QUERY_DESC : GET_MY_CART_DATA_QUERY;
  const defaultSortColumnValue = cart.sortColumn === '' || !cart.sortColumn || cart.sortColumn === null ? table.defaultSortField || '' : cart.sortColumn;
  if (!localStorage.getItem('sortColumn')) {
    localStorage.setItem('sortColumn', defaultSortColumnValue);
  }
  if (localStorage.getItem('page') === null) {
    localStorage.setItem('page', '0');
    localStorage.setItem('rowsPerPage', '10');
  }
  const localPage = Number.isNaN(localStorage.getItem('page')) ? '0' : localStorage.getItem('page');
  const localRowsPerPage = Number.isNaN(localStorage.getItem('rowsPerPage')) ? '10' : localStorage.getItem('rowsPerPage');
  const page = parseInt(localPage, 10);
  const rowsPerPage = parseInt(localRowsPerPage, 10);
  const offset = page * rowsPerPage;
  const count = ids.length || 0;
  const { loading, error, data } = useQuery(CART_QUERY, {
    variables: {
      offset,
      first: count < rowsPerPage ? count : rowsPerPage,
      order_by: cart.sortColumn === '' ? table.defaultSortField || '' : cart.sortColumn,
      file_ids: ids,
    },
  });

  if (loading) {
    return (
      <CartView
        isLoading
        data="undefined"
        defaultSortCoulmn={cart.sortColumn === '' ? table.defaultSortField || '' : cart.sortColumn}
        defaultSortDirection={defaultSortDirection || table.defaultSortDirection}
      />
    );
  }

  if (error || !data) {
    return (
      <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
    );
  }

  return (
    <CartView
      isLoading={false}
      fileIDs={ids}
      updateSortOrder={updateSortOrder}
      defaultSortCoulmn={defaultSortColumnValue}
      defaultSortDirection={defaultSortDirection || table.defaultSortDirection}
      paginationAPIField={table.paginationAPIField}
      paginationAPIFieldDesc={table.paginationAPIFieldDesc}
      tableDownloadCSV={table.tableDownloadCSV}
      localPage={localPage}
      localRowsPerPage={localRowsPerPage}
      data={
        defaultSortDirection === 'desc'
          ? data.filesInListDesc === null || data.filesInListDesc === '' ? [] : data.filesInListDesc
          : data.filesInList === null || data.filesInList === '' ? [] : data.filesInList
        }
    />
  );
};

export default cartController;
