import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArmDetailView from './armDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_ARM_DETAIL_DATA_QUERY, dataRoot, armIDField } from '../../bento/armDetailData';

const ArmDetailContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_ARM_DETAIL_DATA_QUERY, {
    variables: { [armIDField]: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (error || !data || data[dataRoot][armIDField] !== match.params.id) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  return <ArmDetailView data={data[dataRoot]} />;
};

export default ArmDetailContainer;
