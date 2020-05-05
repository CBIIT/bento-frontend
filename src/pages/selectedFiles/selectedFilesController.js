import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import SelectedFilesView from './selectedFilesView';
import { initCart } from '../selectedCases/selectedCasesState';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_MY_CASES_DATA_QUERY } from '../../utils/graphqlQueries';

const selectedFilesController = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  const cart = useSelector((state) => state.cart);

  return (
    <Query query={GET_MY_CASES_DATA_QUERY} variables={{ caseIds: cart.cases }}>
      {({ data, loading, error }) => (
        loading ? <CircularProgress />
          : (
            error || !data
              ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading CART : ${error}`}</Typography>
              : <SelectedFilesView data={data.filesOfCases === null || data.filesOfCases === '' ? [] : data.filesOfCases} />
          )
      )}
    </Query>
  );
};


export default selectedFilesController;
