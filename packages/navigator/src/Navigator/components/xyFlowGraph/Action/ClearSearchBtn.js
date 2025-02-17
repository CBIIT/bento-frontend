import React from 'react';

import * as Styled from './Clear.styled';
import { useModelContext } from '../../../state/NavContextProvider';
import { onSearchTextClear } from '../../../state/actions/Action';

const ClearSearchBtn = () => {
  const { context = {} } = useModelContext();
  const { isSearchMode, overlayNodeId } = context;

  const handleClear = () => {
    const { dispatch } = context;
    dispatch(onSearchTextClear());
  };

  return (
    <>
      {isSearchMode && (
        <Styled.ActionLayer overlayNodeId={overlayNodeId}>
          <Styled.ClearButton onClick={handleClear}>
            Clear Search Result
          </Styled.ClearButton>
        </Styled.ActionLayer>
      )}
    </>
  );
};

export default ClearSearchBtn;
