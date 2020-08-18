import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import View from './programsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAMS_DATA_QUERY } from '../../bento/programData';

const container = () => (
  <Query query={GET_PROGRAMS_DATA_QUERY}>
    {({ data, loading, error }) => (loading ? <CircularProgress /> : (error ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
      : <View data={data} />
    ))}
  </Query>
);

export default container;
