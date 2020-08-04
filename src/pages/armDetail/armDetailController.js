import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArmDetailView from './armDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_ARM_DETAIL_DATA_QUERY, dataRoot, armIDField } from '../../bento/armDetailData';

const ArmDetailContainer = ({ match }) => (
  <Query query={GET_ARM_DETAIL_DATA_QUERY} variables={{ [armIDField]: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (error || !data || data[dataRoot][armIDField] !== match.params.id
          ? (
            <Typography variant="h5" color="error" size="sm">
              {error && `An error has occurred in loading stats component: ${error}`}
            </Typography>
          )
          : <ArmDetailView data={data[dataRoot]} />
        )
    )}
  </Query>
);

export default ArmDetailContainer;
