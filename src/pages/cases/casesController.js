import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CasesView from './casesView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_CASES_QUERY } from '../../utils/graphqlQueries';


const studyCaseContainer = ({ match }) => (
  <Query query={GET_CASES_QUERY} variables={{ study_id: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.caseOverview ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <CasesView study={match.params.id} data={({ ...data, title: `${match.params.id}'s Cases` })} />
        )
    )}
  </Query>
);
export default studyCaseContainer;
