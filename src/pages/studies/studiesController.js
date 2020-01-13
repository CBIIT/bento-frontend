import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import Studies from './studiesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDYTABLE_DATA_QUERY } from '../../utils/graphqlQueries';

const studiesContainer = () => (
  <Query query={GET_STUDYTABLE_DATA_QUERY}>
    {({ data, loading, error }) => (loading ? <CircularProgress /> : (error ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
      : <Studies data={data} />
    ))}
  </Query>
);

export default studiesContainer;
