import React,
{
  useCallback,
  useEffect,
} from 'react';
import { CircularProgress } from '@mui/material';
import {
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CanvasView from './CanvasView';
import { getNodePosition } from './CanvasHelper';
import { createNodesAndEdges } from '../Util/utils';
import { useModelContext } from '../../../state/NavContextProvider';
import { onCanvasClick } from '../../../state/actions/Action';

const CanvasController = ({
  dictionary,
  tabViewWidth,
}) => {
  if (!tabViewWidth || tabViewWidth === 0) {
    return <CircularProgress />;
  }

  const { context } = useModelContext();
  if (Object.keys(context || {}).length === 0) {
    return <CircularProgress />;
  }

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  /** node
    * 1. position (x, y)
    * 2. title
    * 3. highlight node based on matching search query to desc, properties and title
    */
  const getLayoutedElements = (nodeItems, edgeItems) => {
    /**
     * assign node position
     * canvas configuration
     * 1. custom node tree
     * 2. xIntervel & yIntervel
     */
    let updateNodeItems = {};
    const { nodeTree, graphConfig } = context;

    if (dictionary && nodeTree) {
      const nodePosition = getNodePosition({
        dictionary,
        nodeTree,
        tabViewWidth,
        ...graphConfig?.canvas?.fit,
      });
      // set node position
      updateNodeItems = nodeItems.map((node) => {
        const position = nodePosition[node.id];
        if (position
          && typeof position[0] === 'number'
          && typeof position[1] === 'number') {
          return {
            ...node,
            position: {
              x: position[0],
              y: position[1],
            },
          };
        }
        return {
          ...node,
          position: {
            x: 0,
            y: 0,
          },
        };
      });
    }
    return { nodes: updateNodeItems, edges: edgeItems };
  };

  /**
  * update states
  * 1. nodes and edges
  * 2. toggle between on/off for serach mode
  */
  useEffect(() => {
    const flowData = createNodesAndEdges(dictionary);
    const {
      nodes: layoutedNodes,
      edges: layoutedEdges,
    } = getLayoutedElements(
      flowData.nodes,
      flowData.edges,
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [dictionary]);

  const onConnect = useCallback(
    (connection) => {
      setEdges((prevEdges) => addEdge(connection, prevEdges));
    },
    [setEdges],
  );

  if (!nodes || !edges) {
    return <CircularProgress />;
  }

  const onGraphPanelClick = () => {
    const { dispatch } = context;
    dispatch(onCanvasClick());
  };

  // handle node drag
  const handleNodeDragStop = (event, node) => {
    const updatedNodes = nodes.map((n) => {
      if (n.id === node.id) {
        return { ...n, position: node.position };
      }
      return n;
    });
    setNodes(updatedNodes);
  };

  const { focusedNodeId = '', graphConfig } = context;
  if (!nodes || nodes.length < 1) {
    return <CircularProgress />;
  }

  return (
    <CanvasView
      nodes={nodes}
      edges={edges}
      focusedNodeId={focusedNodeId}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      graphConfig={graphConfig}
      canvasWidth={tabViewWidth}
      onGraphPanelClick={onGraphPanelClick}
      handleNodeDragStop={handleNodeDragStop}
    />
  );
};

export default CanvasController;
