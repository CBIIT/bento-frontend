import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import TrialView from './trialDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { TRIAL_BY_ID_QUERY } from '../../utils/graphqlQueries';

const TrialDetailContainer = ({ match }) => (
  <Query query={TRIAL_BY_ID_QUERY} variables={{ id: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.clinicalTrialByTrialId[0] ? <Typography variant="headline" color="error" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <TrialView data={data} />
        )
    )}
  </Query>
);

export default TrialDetailContainer;
