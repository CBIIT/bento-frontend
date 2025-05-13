/* eslint-disable jsx-quotes */
import React, { useEffect, useState } from 'react';
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

  // update input search query
  useEffect(() => {
    if (table?.searchQuery) {
      setSearchText(table?.searchQuery);
    }
  }, [table?.searchQuery]);

  return (
    <Box id='table_serach_input'>
      <TextField
        size='small'
        variant='outlined'
        onChange={handleChange}
        onKeyDown={handleChange}
        value={searchText}
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
