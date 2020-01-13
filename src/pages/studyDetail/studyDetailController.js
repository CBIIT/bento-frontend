import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudyDetailView from './components/studyDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import { GET_STUDY_DETAIL_DATA_QUERY } from '../../utils/graphqlQueries';

const StudyDetailContainer = ({ match }) => (
  <Query query={GET_STUDY_DETAIL_DATA_QUERY} variables={{ csd: match.params.id }}>
    {({ data, loading, error }) => (
      loading ? <CircularProgress />
        : (
          error || !data || !data.study[0] ? <Typography variant="headline" color="warning" size="sm">{error && `An error has occurred in loading stats component: ${error}`}</Typography>
            : <StudyDetailView data={data} />
        )
    )}
  </Query>
);

export default StudyDetailContainer;
