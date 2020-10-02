import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import { useDispatch, useSelector } from 'react-redux';
import { initCart } from './store/cartAction';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CART_DATA_QUERY } from '../../bento/fileCentricCartWorkflowData';
import CartView from './cartView';

const cartController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const cart = useSelector((state) => state.cart);
  const ids = cart.subjectIds ? cart.subjectIds : [];
  return (
    <Query query={GET_MY_CART_DATA_QUERY} variables={{ file_ids: ids }}>
      {({ data, loading, error }) => (
        loading ? <CartView isLoading data={[]} />
          : (
            error || !data
              ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
              : <CartView isLoading={false} data={data.filesInList === null || data.filesInList === '' ? [] : data.filesInList} />
          )
      )}
    </Query>
  );
};

export default cartController;
