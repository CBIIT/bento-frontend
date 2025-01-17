import React, { useState } from "react";
import { TextField, Typography, Box } from '@mui/material';
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
      console.log(matches);
      dispatch(onTextSearch(matches));
    }
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
