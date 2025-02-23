import React from 'react';
import { Alert } from '@mui/material';

const ValidatorView = ({
  propertiesYamlFilePath,
  nodesYamlFilePath,
}) => {
  if (!propertiesYamlFilePath || !nodesYamlFilePath) {
    return (
      <Alert severity="error">
        Error. Provide valide YMAL Url !!!
      </Alert>
    );
  }

  return (
    <>
    </>
  );
};

export default ValidatorView;
