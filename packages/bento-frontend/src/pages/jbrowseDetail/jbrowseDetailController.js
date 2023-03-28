/* eslint-disable max-len */
// /* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import JBrowseDetailView from './jbrowseDetailView';
import { Typography } from '../../components/Wrappers/Wrappers';
import {
  GET_JBROWSE_DETAIL_DATA_QUERY, caseIDField, jBrowseOptions,
} from '../../bento/jbrowseDetailData';
import env from '../../utils/env';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const JbrowseDetailContainer = ({ match }) => {
  const [bamFiles, setBamFiles] = useState([]);

  const { loading, error, data } = useQuery(GET_JBROWSE_DETAIL_DATA_QUERY, {
    variables: { [caseIDField]: match.params.id },
  });

  const getAllFilesUri = async (file) => {
    const resp = await axios.get(
      `${FILE_SERVICE_API}${file.file_id}`,
      {
        headers: {
          'Content-Type': 'application/pdf',
        },
      },
    );
    return {
      file_location: resp.data,
      file_type: file.file_type,
    };
  };

  const getBamFiles = async () => {
    if (data) {
      const promiseArr = data.subjectDetail.files.filter(
        (file) => (file.file_type === 'bam' || file.file_type === 'bai'),
      ).map(getAllFilesUri);

      const responses = await Promise.all(promiseArr);
      setBamFiles(responses);
    }
  };

  useEffect(() => {
    if (data && !loading) {
      getBamFiles();
    }
  }, [data, loading]);

  if (loading) return <CircularProgress />;
  if (error || !data) {
    return (
      <Typography variant="h5" color="error" size="sm">
        {error ? `An error has occurred in loading stats component: ${error}` : 'Recieved wrong data'}
      </Typography>
    );
  }
  return (
    <JBrowseDetailView
      bamFiles={bamFiles}
      options={jBrowseOptions}
    />
  );
};

export default JbrowseDetailContainer;
