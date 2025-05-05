import React from 'react';
import GraphView from '../../Navigator/components/xyFlowGraph/GraphView';

const GraphPanelView = ({
  dictionary,
  tabViewWidth,
}) => (
  <>
    <GraphView
      dictionary={dictionary}
      tabViewWidth={tabViewWidth}
    />
  </>
);

export default GraphPanelView;
