import React from 'react';
import ChangelogComponent from './Changelog.component';
import { useModelContext } from '../../state/NavContextProvider';

const ChangelogController = () => {
  const { context } = useModelContext();

  if (!context) {
    return <></>;
  }

  return (
    <>
      <ChangelogComponent />
    </>
  );
};

export default ChangelogController;
