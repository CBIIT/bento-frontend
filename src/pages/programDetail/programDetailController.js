import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramDetailView from './components/programDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_PROGRAM_DETAIL_DATA_QUERY } from '../../utils/graphqlQueries';


const ProgramDetailContainer = ({ match }) => (
  <Query query={GET_PROGRAM_DETAIL_DATA_QUERY} variables={{ programTitle: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.program[0] ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <ProgramDetailView data={data} />
        )
    )}
  </Query>
);

export default ProgramDetailContainer;
