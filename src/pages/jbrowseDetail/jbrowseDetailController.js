/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import JBrowseDetailView from './jbrowseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_JBROWSE_DETAIL_DATA_QUERY, caseIDField,
} from '../../bento/jbrowseDetailData';
import env from '../../utils/env';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const JbrowseDetailContainer = ({ match }) => {
  const { loading, error, data } = useQuery(GET_JBROWSE_DETAIL_DATA_QUERY, {
    variables: { [caseIDField]: match.params.id },
  });

  if (loading) return <CircularProgress />;
  if (error || !data) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }

  const bamFiles = data.subjectDetail.files.reduce((acc, file) => {
    if (file.file_type === 'bam' || file.file_type === 'bai') {
      fetch(`${FILE_SERVICE_API}${file.file_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf',
        },
      })
        .then((response) => {
          acc.push({
            file_location: response.url,
            file_type: file.file_type,
          });
        });
    }
    return acc;
  }, []);

  return <JBrowseDetailView bamFiles={bamFiles} />;
};

export default JbrowseDetailContainer;
