import React,
{
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ReactFlowProvider,
  ReactFlow,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import * as Styled from './Canvas.styled';
import NodeView from '../Node/NodeView';
import EdgeView from '../Edge/EdgeView';
import { getMinZoom } from './util';
import resetIcon from './assets/Reset.svg';
import ZoomInIcon from './assets/ZoomIn.svg';
import ZoomOutIcon from './assets/ZoomOut.svg';
import OverlayPropertyTable from '../Overlay/OverlayTableView';
import ClearSearchBtn from '../Action/ClearSearchBtn';
import LegendView from '../Legend/LegendView';

const nodeTypes = {
  custom: NodeView,
};

const edgeTypes = {
  custom: EdgeView,
};

/**
 *
 * @param {*} param0
 * @returns
 * reactflow requires to create child component
 *  to add customize control buttons
 */
const CustomFlowView = ({
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
  highlightedNodes,
  onGraphPanelClick,
  handleNodeDragStop,
  canvasWidth,
  graphConfig = {}
}) => {
  const { setViewport, zoomIn, zoomOut } = useReactFlow();

  const { canvas = {} } = graphConfig;
  const { fit = 0.75 } = canvas;
  const width = canvasWidth / 2 || 1200;
  const [minZoom, setMinZoom] = useState(0.75);

  useEffect(() => {
    const zoom = getMinZoom({ width, fit });
    setMinZoom(zoom);
  }, [width]);

  const handleTransform = useCallback(() => {
    setViewport({
      x: 0,
      y: 0,
      zoom: getMinZoom({ width, fit }),
    }, { duration: 200 });
  }, [setViewport, width]);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={minZoom}
        maxZoom={fit?.maxZoom ? fit.maxZoom : 3}
        onPaneClick={onGraphPanelClick}
        onNodeDragStop={handleNodeDragStop}
        fitView
      >
        <OverlayPropertyTable />
        <LegendView />
        <Styled.Controls>
          <Styled.ControlBtn onClick={handleTransform} title="reset">
            <Styled.ControlBtnIcon src={resetIcon} alt="reset_icon" />
          </Styled.ControlBtn>
          <Styled.ControlBtn
            title="zoom in"
            onClick={() => zoomIn({ duration: 200 })}
          >
            <Styled.ControlBtnIcon src={ZoomInIcon} alt="ZoomInIcon" />
          </Styled.ControlBtn>
          <Styled.ControlBtn
            title="zoom out"
            onClick={() => zoomOut({ duration: 200 })}
          >
            <Styled.ControlBtnIcon src={ZoomOutIcon} alt="ZoomOutIcon" />
          </Styled.ControlBtn>
        </Styled.Controls>
        <Styled.CanvasBackground
          highlightedNodes={highlightedNodes}
          gap={12}
        />
      </ReactFlow>
    </>
  );
};

const CanvasView = ({
  nodes,
  edges,
  focusedNodeId,
  onConnect,
  onNodesChange,
  onEdgesChange,
  onGraphPanelClick,
  handleNodeDragStop,
  canvasWidth,
  graphConfig
}) => (
  <Styled.CanvasContariner
    className="canvasContariner"
    focusedNodeId={focusedNodeId}
  >
    <ClearSearchBtn />
    <ReactFlowProvider>
      <CustomFlowView
        canvasWidth={canvasWidth}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onGraphPanelClick={onGraphPanelClick}
        handleNodeDragStop={handleNodeDragStop}
        graphConfig={graphConfig}
      />
    </ReactFlowProvider>
  </Styled.CanvasContariner>
);

export default CanvasView;
