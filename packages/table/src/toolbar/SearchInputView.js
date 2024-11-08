/* eslint-disable jsx-quotes */
import React, { useState } from 'react';
import {
  InputAdornment,
  TextField,
  Box,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const SearchInputView = ({
  onSearchQueryChange,
  table,
}) => {
  const [searchText, setSearchText] = useState('');
  const handleChange = (event) => {
    setSearchText(event.target.value);
    if (event.key === 'Enter') {
      onSearchQueryChange(event.target.value);
    }
  };

  const handleClick = () => {
    onSearchQueryChange('');
    setSearchText('');
  };

  return (
    <Box id='table_serach_input'>
      <TextField
        size='small'
        variant='outlined'
        onChange={handleChange}
        onKeyDown={handleChange}
        value={searchText || table?.searchQuery}
        InputProps={{
          endAdornment: (
            <>
              {
                (table?.searchQuery) && (
                  <InputAdornment
                    position='end'
                    onClick={handleClick}
                  >
                    <ClearIcon />
                  </InputAdornment>
                )
              }
              <InputAdornment position='start'>
                <SearchIcon onClick={handleChange} />
              </InputAdornment>
            </>
          ),
        }}
      />
    </Box>
  );
};

export default SearchInputView;
