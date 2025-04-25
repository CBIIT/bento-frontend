import React from 'react';
import { GraphView } from '../../dist';

const GraphPanelView = ({
  dictionary,
  tabViewWidth,
}) => {
  return (
    <>
      <GraphView
        dictionary={dictionary}
        tabViewWidth={tabViewWidth}
      />
    </>
  )
};

export default GraphPanelView;
