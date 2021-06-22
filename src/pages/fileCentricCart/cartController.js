import React from 'react';
import { useQuery } from '@apollo/client';
import { getCart } from './store/cart';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC, table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const cart = getCart();
  const ids = cart.fileIds ? cart.fileIds : [];
  let sortColumnValue = cart.sortColumn ? cart.sortColumn : '';
  let sortDirectionValue = cart.sortDirection ? cart.sortDirection : '';
  if (ids.length === 0) {
    sortColumnValue = table.defaultSortField;
    sortDirectionValue = table.defaultSortDirection;
  }
  const defaultSortDirection = sortDirectionValue || table.defaultSortDirection || 'asc';
  const CART_QUERY = defaultSortDirection === 'desc' ? GET_MY_CART_DATA_QUERY_DESC : GET_MY_CART_DATA_QUERY;

  const { loading, error, data } = useQuery(CART_QUERY, {
    variables: { file_ids: ids, order_by: sortColumnValue || table.defaultSortField || '' },
  });

  if (loading) return <CartView isLoading data="undefined" />;
  if (error || !data) {
    return (
      <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
    );
  }

  return (
    <CartView
      isLoading={false}
      fileIDs={ids}
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
