import React,
{
  useCallback,
  useEffect,
  useState
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

const CanvasController = ({
  dictionary,
  tabViewWidth,
  isSearchMode
}) => {

  if (!tabViewWidth || tabViewWidth === 0) {
    return <CircularProgress />;
  }

  const { context } = useModelContext();
  if (Object.keys(context || {}).length === 0) {
    return <CircularProgress />;
  };

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [categories, setCategories] = useState([]);
  /** node
    * 1. position (x, y)
    * 2. title
    * 3. highlight node based on matching search query to desc, properties and title
    */
  const getLayoutedElements = (nodes, edges) => {
    
    /**
     * assign node position
     * canvas configuration
     * 1. custom node tree
     * 2. xIntervel & yIntervel
     */
    const { nodeTree } = context;
    if (dictionary && nodeTree) {
      const nodePosition = getNodePosition({
        dictionary,
        nodeTree,
        tabViewWidth,
        // ...canvas?.fit,
      });
      nodes.forEach((node) => {
        const position = nodePosition[node.id];
        node.position = {
          x: position[0],
          y: position[1]
        }
      });
    }
    return { nodes, edges };
  };

  /**
  * update states
  * 1. nodes and edges
  * 2. toggle between on/off for serach mode
  */
  useEffect(() => {
    // console.log(provider);
    const flowData = createNodesAndEdges(dictionary);
    const {
      nodes: layoutedNodes,
      edges: layoutedEdges
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

  if (nodes.length === 0 && edges.length === 0) {
    return <CircularProgress />;
  }

  return (
    <CanvasView
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      canvasWidth={tabViewWidth}
    />
  );
};

export default CanvasController;
