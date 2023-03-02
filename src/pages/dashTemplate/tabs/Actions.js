import React from 'react';
import { Button } from '@material-ui/core';

const Actions = ({
  selectedRows,
}) => {
  const addSelecetedFiles = () => {
    console.log(selectedRows);
  };

  const addAllFiles = () => {
    console.log('add all files');
  };

  return (
    <>
      <Button onClick={addAllFiles}>ADD ALL FILES</Button>
      <Button onClick={addSelecetedFiles}> ADD SELECTED FILES </Button>
    </>
  );
};

export default Actions;
