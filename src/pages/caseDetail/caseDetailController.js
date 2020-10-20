import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import CaseDetailView from './caseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_CASE_DETAIL_DATA_QUERY, dataRoot, caseIDField, filesOfSamples,
} from '../../bento/caseDetailData';

const CaseDetailContainer = ({ match }) => (
  <Query query={GET_CASE_DETAIL_DATA_QUERY} variables={{ [caseIDField]: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (error || !data || data[dataRoot][caseIDField] !== match.params.id
          ? (
            <Typography variant="h5" color="error" size="sm">
              {error && `An error has occurred in loading stats component: ${error}`}
            </Typography>
          )
          : <CaseDetailView data={data[dataRoot]} filesOfSamples={data[filesOfSamples]} />
        )
    )}
  </Query>
);

export default CaseDetailContainer;
