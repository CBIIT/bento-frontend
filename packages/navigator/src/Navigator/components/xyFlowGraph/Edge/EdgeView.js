/* eslint-disable import/no-unresolved */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable semi */

import React from 'react';
import { getStraightPath } from '@xyflow/react';

const EdgeView = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  isSearchMode,
  expandNodeView,
  highlightParentNodes = [],
}) => {

  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const highlightEdge = highlightParentNodes.includes(source)
        && highlightParentNodes.includes(target);
  const stroke = isSearchMode ? '#b1b1b7' : (!expandNodeView)
    ? "#222" : (expandNodeView && highlightEdge) ? "#222" : '#b1b1b7';

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
