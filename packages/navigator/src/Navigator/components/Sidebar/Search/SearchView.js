import React, { useEffect, useState } from 'react';
import {
  Box,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useModelContext } from '../../../state/NavContextProvider';
import { findMatchingText } from './Util';
import { onSearchTextClear, onTextSearch } from '../../../state/actions/Action';
import SuggestionListView from './Suggestion/SuggestionList';

import * as Styled from './Search.styled';
import useSearchHistory from './SearhResultStore';

const SearchTextView = () => {
  const { context } = useModelContext();
  const { dictionary, isSearchMode } = context;
  const [searchTerm, setSearchTerm] = useState('');
  const [displaySuggList, setDisplay] = useState(false);
  const [state, actions] = useSearchHistory();

  useEffect(() => {
    if (!isSearchMode) {
      setSearchTerm('');
    } else {
      const { searchText = '' } = state;
      const text = `${searchText}`.length > 0 ? `${searchText}` : '';
      setSearchTerm(text);
    }
  }, [isSearchMode]);

  const handleTextChange = (value) => {
    const text = `${value}`;
    setSearchTerm(text);
    setDisplay(true);
  };

  const searchTextQuery = (value) => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
    const { dispatch } = context;
    if (state && state[searchTerm]) {
      const result = state[searchTerm] || {};
      const { matches, summary } = result;
      dispatch(onTextSearch({ matches, summary }));
    } else {
      const { matches, summary } = findMatchingText(value, context);
      if (Object.keys(summary).length > 0) {
        actions.setSearchResults(searchTerm, summary, matches);
      }
      dispatch(onTextSearch({ matches, summary }));
    }
    setDisplay(false);
  };

  const onSearchEnter = (e) => {
    if (e.keyCode === 13) {
      searchTextQuery(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    const { dispatch } = context;
    dispatch(onSearchTextClear());
  };

  return (
    <>
      <Box>
        <Styled.SearchTextInput
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={onSearchEnter}
          placeholder="Search in Dictionary"
          slotProps={{
            input: {
              endAdornment: (
                <>
                  {
                    searchTerm && (
                      <>
                        <InputAdornment position="end">
                          <Styled.ClearButton onClick={handleClear} edge="end">
                            <Styled.MuiClearIcon />
                          </Styled.ClearButton>
                        </InputAdornment>
                        <Styled.Divider />
                      </>
                    )
                  }
                  <Styled.SearchButton position="start">
                    <SearchIcon />
                  </Styled.SearchButton>
                </>
              ),
            },
          }}
        />
        {
          (dictionary && displaySuggList) && (
            <SuggestionListView
              dictionary={dictionary}
              textSearch={searchTerm}
              searchTextQuery={searchTextQuery}
            />
          )
        }
      </Box>
    </>
  );
};

export default SearchTextView;
