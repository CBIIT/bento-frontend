import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';
import LandingView from './landingView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_LANDING_PAGE_DATA_QUERY } from '../../bento/landingPageData';

const landingController = () => {
  const isSignedIn = useSelector((state) => state.login.isSignedIn);
  const { loading, error, data } = useQuery(GET_LANDING_PAGE_DATA_QUERY, {
    context: { clientName: isSignedIn ? '' : 'publicService' },
    fetchPolicy: 'no-cache',
  });

  if (loading) return <CircularProgress />;
  if (error) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error && `An error has occurred in loading stats component: ${error}`}
      </Typography>
    );
  }

  return <LandingView statsData={data} />;
};

export default landingController;
