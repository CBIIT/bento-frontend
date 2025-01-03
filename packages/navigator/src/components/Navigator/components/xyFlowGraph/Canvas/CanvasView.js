import React,
{ 
  useCallback, 
  useEffect, 
  useState
} from 'react';
import {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  OnConnect,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import * as Styled from './Canvas.styled';
import NodeView from '../Node/NodeView';
import EdgeView from '../Edge/EdgeView';
import { getMinZoom } from './util';
import resetIcon from './assets/Reset.svg';
import ZoomInIcon from './assets/ZoomIn.svg';
import ZoomOutIcon from './assets/ZoomOut.svg';

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
  graphViewConfig
}) => {
  const { setViewport, zoomIn, zoomOut } = useReactFlow();

  // const { fit, width } = graphViewConfig.canvas;
  const fit = 0.75;
  const width = 1200;
  const [minZoom,  setMinZoom] = useState(0.75);
  
  useEffect(() => {
    const zoom = getMinZoom({width, fit});
    setMinZoom(zoom);
  }, [width]);

  const handleTransform = useCallback(() => {
    setViewport({
      x: fit?.x,
      y: fit?.y,
      zoom: getMinZoom({width, fit}) }, { duration: 200 });
  }, [setViewport, width]);

  /**
   * collapse all property dialog box
   * @param {*} event 
   */
  const onPanelClick = (event) => {
    // onGraphPanelClick();
    console.log('graph click')
  };

  return (
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
      fitView
    >
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
        color="#aaa"
        gap={12}
      /> 
    </ReactFlow>
  );
}

const CanvasView = ({
  nodes,
  edges,
  onConnect,
  onNodesChange,
  onEdgesChange,
}) => {
  return (
    <Styled.CanvasContariner>
      <ReactFlowProvider>
        <CustomFlowView
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </ReactFlowProvider>
    </Styled.CanvasContariner>
  );
};

export default CanvasView;
