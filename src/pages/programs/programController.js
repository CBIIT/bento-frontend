import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from 'react-apollo-hooks';
import { Typography } from '../../components/Wrappers/Wrappers';
import Programs from './programs';
import { GET_PROGRAM_DATA_QUERY } from '../../utils/graphqlQueries';


const ProgramCardController = () => {
  const { data, loading, error } = useQuery(GET_PROGRAM_DATA_QUERY);
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return (
      <Typography variant="headline" color="warning" size="sm">
        {error && `An error has occurred in loading program cards components: ${error}`}
      </Typography>
    );
  }
  return <Programs data={data} />;
};

export default ProgramCardController;
