import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import View from './trialsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { TRIALS_QUERY } from '../../utils/graphqlQueries';

const container = () => (
  <Query query={TRIALS_QUERY}>
    {({ data, loading, error }) => (loading ? <CircularProgress /> : (error ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
      : <View data={data} />
    ))}
  </Query>
);

export default container;
