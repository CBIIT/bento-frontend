import React from 'react';
import { useQuery } from '@apollo/client';
import { getCart, updateSortOrder } from './store/cart';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC, table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const cart = getCart();
  const ids = cart.fileIds ? cart.fileIds : [];
  const defaultSortDirection = cart.sortDirection === '' ? table.defaultSortDirection || 'asc' : cart.sortDirection;
  const CART_QUERY = defaultSortDirection === 'desc' ? GET_MY_CART_DATA_QUERY_DESC : GET_MY_CART_DATA_QUERY;

  const { loading, error, data } = useQuery(CART_QUERY, {
    variables: { file_ids: ids, order_by: cart.sortColumn === '' ? table.defaultSortField || '' : cart.sortColumn },
  });

  if (loading) {
    return (
      <CartView isLoading data="undefined" />
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
      defaultSortCoulmn={table.defaultSortField || ''}
      defaultSortDirection={defaultSortDirection}
      tableDownloadCSV={table.tableDownloadCSV}
      data={
        defaultSortDirection === 'desc'
          ? data.filesInListDesc === null || data.filesInListDesc === '' ? [] : data.filesInListDesc
          : data.filesInList === null || data.filesInList === '' ? [] : data.filesInList
        }
    />
  );
};

export default cartController;
