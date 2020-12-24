import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import View from './programsView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAMS_DATA_QUERY } from '../../bento/programData';

const container = () => {
  const { loading, error, data } = useQuery(GET_PROGRAMS_DATA_QUERY);
  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="headline" color="error" size="sm">{error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}</Typography>;
  return <View data={data} />;
};

export default container;
