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
import { onTextSearch } from "../../../state/actions/Action";
import SuggestionListView from "./SuggestionList";

const SearchTextView = () => {
  const { context } = useModelContext();
  const { dictionary } = context;

  const [searchTerm, setSearchTerm] = useState('');

  const handleTextChange = (value) => {
    const text = `${value}`;
    setSearchTerm(text);
  };

  const searchTextQuery = (e) => {
    if (e.keyCode === 13) {
      const { dispatch } = context;
      const matches = findMatchingText(searchTerm, context);
      // console.log(matches);
      dispatch(onTextSearch(matches));
    }
  }

  const handleClear = () => {
    setSearchTerm('');
  }

  return (
    <>
      <Box>
        <TextField
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => handleTextChange(e.target.value)}
          sx={{ marginBottom: 2 }}
          onKeyDown={searchTextQuery}
          slotProps={{
            input : {
              endAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                  {
                    searchTerm && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClear} edge="end">
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                </>
              )
            }
          }}
        />
        {
          (dictionary) && (
            <SuggestionListView
              dictionary={dictionary}
              textSearch={searchTerm}
            />
          )
        }
      </Box>
    </>
  );
}

export default SearchTextView;
