import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import LandingView from './landingView';
import { landingPageQuery } from '../../bento/landingPageData';

const landingController = () => (
  <Query query={landingPageQuery}>
    {({ data, loading }) => (loading ? <CircularProgress /> : <LandingView statsData={data} />
    )}
  </Query>
);

export default landingController;
