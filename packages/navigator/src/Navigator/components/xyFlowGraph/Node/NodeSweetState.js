import { createHook, createStore } from 'react-sweet-state';

export const NodeStore = createStore({
  initialState: {
    nodeId: 'node Id',
  },
  actions: {
    onFocusNode: () => ({ setState, getState }) => {
      const { nodeId } = getState();
      setState({ nodeId });
    },
  },
  name: 'NodeStore',
});

const useNodeStore = createHook(NodeStore);

export default useNodeStore;
