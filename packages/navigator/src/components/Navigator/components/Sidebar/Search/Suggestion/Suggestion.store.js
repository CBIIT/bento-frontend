import { createHook, createStore } from 'react-sweet-state';

const actions = {
  setSuggestionList: (searchTerm, suggestionList) =>
    ({ setState }) => {
      // mutate state synchronously
      setState({
        [searchTerm]: suggestionList,
      });
    },
};

const suggestionList = createStore({
  // Initial state
  initialState: {
  },
  // Actions to modify the state
  actions: actions,
  // Optional, for debugging purposes
  name: 'suggestionList',
});

const useSuggestionList = createHook(suggestionList);

export default useSuggestionList;
