/* eslint-disable import/no-unresolved */
/* eslint-disable comma-dangle */
import styled from '@emotion/styled';
import { Background } from '@xyflow/react';

export const CanvasContariner = styled('div')(
  ({ focusedNodeId }) => {
    const targetId = `& div [data-id=${focusedNodeId}]`;
    return {
      height: '100%',
      display: 'block',
      [targetId]: {
        zIndex: '95 !important',
      },
    };
  },
);

export const CanvasBackground = styled(Background)(
  (highlightedNodes) => {
    if (highlightedNodes && !!highlightedNodes.length) {
      return {
        backgroundColor: '#C5DEEA'
      };
    }
    return {
      backgroundColor: '#E7F3F7'
    };
  }
);

export const Controls = styled('div')({
  position: 'absolute',
  left: '0px',
  top: '5px',
  zIndex: '10',
  fontSize: '12px',
  width: '32px',
  marginLeft: '20px',
  marginTop: '15px',
});

export const ControlBtn = styled('div')({
  backgroundColor: '#545555',
  padding: '5px 5px 2px 5px',
  borderRadius: '5px',
  marginBottom: '10px',
  '&:hover': {
    cursor: 'pointer',
  },
});

export const ControlBtnIcon = styled('img')({
  width: '22px',
  height: '22px',
});
