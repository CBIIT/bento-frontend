import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_CASE_DETAIL_DATA_QUERY } from '../../utils/graphqlQueries';


const CaseDetailContainer = ({ match }) => (
  <Query query={GET_CASE_DETAIL_DATA_QUERY} variables={{ case_id: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || data.case[0].case_id !== match.params.id ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <CaseDetailView data={data} />
        )
    )}
  </Query>
);

export default CaseDetailContainer;
