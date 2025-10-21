import React, { useState } from 'react';
import {
  IconButton,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import SearchIcon from './assets/Search_Icon.svg';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const useStyles = makeStyles({
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      border: '0.75px solid #606060',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
      height: '36px',
      width: '300px',
      paddingLeft: '12px',
      paddingRight: '4px',
      marginTop: '8px',
      marginBottom: '8px',
      marginLeft: '-28px',
      float: 'left',
    },
    inputBase: {
      flex: 1,
      fontFamily: 'Poppins',
      fontSize: '14px',
      color: '#000000',
      '& input::placeholder': {
        color: '#9B9B9B',
        opacity: 1,
      },
    },
    searchButton: {
      padding: '6px',
      backgroundColor: 'transparent',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    searchIcon: {
      width: '15px',
      height: '15px',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <InputBase
        className={classes.inputBase}
        placeholder="Search..."
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton
        className={classes.searchButton}
        onClick={handleSearchClick}
        aria-label="search"
      >
        <img src={SearchIcon} alt="search" className={classes.searchIcon} />
      </IconButton>
    </div>
  );
};

export default SearchBar;
