import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProgramView from './programDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { PROGRAM_DETAIL_QUERY } from '../../utils/graphqlQueries';

const ProgramDetailContainer = ({ match }) => (
  <Query query={PROGRAM_DETAIL_QUERY} variables={{ program_id: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || data.programDetail.program_id !== match.params.id ? <Typography variant="headline" color="error" size="sm">{error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}</Typography>
            : <ProgramView data={data} />
        )
    )}
  </Query>
);

export default ProgramDetailContainer;
