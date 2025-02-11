import { createHook, createStore } from 'react-sweet-state';

// Define the initial state
const initialState = {
  // Add other state properties as needed
}

const actions = {
  setSearchResults: (searchTerm = '', summary, matches) =>
    ({ setState, getState }) => {
      const currState = getState();
      if (!searchTerm) {
        setState({
          searchText: searchTerm,
          results: {}
        });
      } else {
        setState({
          searchText: searchTerm,
          results: {
            ...currState.results,
            [searchTerm]: {summary, matches}
          }
        });
      }
    },
};

const SearchResultHistory = createStore({
  // Initial state
  initialState: initialState,
  // Actions to modify the state
  actions: actions,
  // Optional, for debugging purposes
  name: 'searchResultHistory',
});

const useSearchHistory = createHook(SearchResultHistory);

export default useSearchHistory;
