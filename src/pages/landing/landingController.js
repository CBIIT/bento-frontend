import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import LandingView from './landingView';
import { GET_LANDING_PAGE_DATA_QUERY } from '../../bento/landingPageData';

const landingController = () => (
  <Query query={GET_LANDING_PAGE_DATA_QUERY}>
    {({ data, loading, error }) => (loading ? <CircularProgress /> : (error ? <div>{error && `An error has occurred in loading stats component: ${error}`}</div> : <LandingView statsData={data} />)
    )}
  </Query>
);

export default landingController;
