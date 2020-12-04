import React from 'react';
import { Query } from 'react-apollo';
import { getCart } from './store/cart';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CART_DATA_QUERY, GET_MY_CART_DATA_QUERY_DESC, table } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const cart = getCart();
  const ids = cart.fileIds ? cart.fileIds : [];
  const defaultSortDirection = table.defaultSortDirection || 'asc';
  const CART_QUERY = defaultSortDirection === 'desc' ? GET_MY_CART_DATA_QUERY_DESC : GET_MY_CART_DATA_QUERY;
  return (
    <Query query={CART_QUERY} variables={{ file_ids: ids, order_by: table.defaultSortField || '' }}>
      {({ data, loading, error }) => (
        loading ? <CartView isLoading data="undefined" />
          : (
            error || !data
              ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
              : (
                <CartView
                  isLoading={false}
                  fileIDs={ids}
                  data={
                defaultSortDirection === 'desc'
                  ? data.filesInListDesc === null || data.filesInListDesc === '' ? [] : data.filesInListDesc
                  : data.filesInList === null || data.filesInList === '' ? [] : data.filesInList
              }
                />
              )
          )
      )}
    </Query>
  );
};

export default cartController;
