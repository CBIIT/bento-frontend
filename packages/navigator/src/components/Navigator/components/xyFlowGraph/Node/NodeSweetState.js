import { createHook, createStore } from 'react-sweet-state';

export const NodeStore = createStore({
    initialState: {
        nodeId: 'node Id',
    },
    actions: {
        onFocusNode: (nodeId) => ({ setState, getState }) => {
          const { nodeId } = getState();
          setState({ nodeId: nodeId });
        }
    },
    name: 'NodeStore',
});

const useNodeStore = createHook(NodeStore);

export default useNodeStore;
