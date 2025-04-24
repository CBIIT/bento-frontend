import React from 'react';
import SidebarView from './SidebarView';
import { useModelContext } from '../../state/NavContextProvider';
import { onClearAllFilter } from '../../state/actions/Action';

const SidebarController = () => {
  const { context } = useModelContext();

  if (!context) {
    return <></>;
  }

  const handleClearFilter = () => {
    const { dispatch } = context;
    dispatch(onClearAllFilter());
  };

  return (
    <>
      <SidebarView
        handleClearFilter={handleClearFilter}
      />
    </>
  );
};

export default SidebarController;
