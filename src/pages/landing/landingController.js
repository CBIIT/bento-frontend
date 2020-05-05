import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import LandingView from './landingView';
import { LANDING_QUERY } from '../../utils/graphqlQueries';

const landingController = () => (
  <Query query={LANDING_QUERY}>
    {({ data, loading }) => (loading ? <CircularProgress /> : <LandingView heroData={data} />
    )}
  </Query>
);

export default landingController;
