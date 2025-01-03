import React from 'react';
import CanvasView from './Canvas/CanvasController';

const GraphView = ({
  dictionary,
  tabViewWidth
}) => {
    return (
      <>
        <CanvasView
          dictionary={dictionary}
          tabViewWidth={tabViewWidth}
        />
      </>
    );
} 

export default GraphView;
