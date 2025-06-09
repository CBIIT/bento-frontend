/* eslint-disable import/no-unresolved */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable semi */

import React from 'react';
import { getStraightPath } from '@xyflow/react';
import { useModelContext } from '../../../state/NavContextProvider';

const EdgeView = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}) => {
  const { context = {} } = useModelContext();
  const {
    isSearchMode,
  } = context;

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const stroke = isSearchMode ? '#b1b1b7' : '#222';

  return (
    <>
      <path
        id={id}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        className="animated"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  )
}

export default EdgeView;
