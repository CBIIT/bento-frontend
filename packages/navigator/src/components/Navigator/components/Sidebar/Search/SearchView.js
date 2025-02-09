import React, { useState } from "react";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useModelContext } from "../../../state/NavContextProvider";
import { findMatchingText } from "./Util";
import { onSearchTextClear, onTextSearch } from "../../../state/actions/Action";
import SuggestionListView from "./SuggestionList";

import * as Styled from './Search.styled';

const SearchTextView = () => {
  const { context } = useModelContext();
  const { dictionary } = context;

  const [searchTerm, setSearchTerm] = useState('');
  const [displaySuggList, setDisplay] = useState(false);

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
    const matches = findMatchingText(value, context);
    // console.log(matches);
    dispatch(onTextSearch(matches));
    setDisplay(false);
  }

  const onSearchEnter = (e) => {
    if (e.keyCode === 13) {
      searchTextQuery(searchTerm);
    }
  }

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
          slotProps={{
            input : {
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
              )
            }
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
}

export default SearchTextView;
