import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  InputBase,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CustomPagination from './pagination/CustomPagination';
import ManageColumnView from './toolbar/ManageColumnView';
import defaultTheme from './DefaultThemConfig';
import DownloadButton from './toolbar/DownloadButtonView';
import SearchBar from './toolbar/SearchBar';

const downloadAreaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px solid #8A7F7C',
  paddingRight: '48px',
  paddingTop: '5px',
  paddingBottom: '5px',
};

const searchBarContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginRight: 'auto',
  paddingLeft: '18px',
};

const getSearchBarWrapperStyle = (isFocused) => ({
  display: 'flex',
  alignItems: 'center',
  width: '337px',
  height: '30px',
  backgroundColor: '#EAF5F5',
  borderRadius: '8px',
  border: isFocused ? '2px solid #15968E' : '1px solid #CCCCCC',
  paddingLeft: '12px',
  paddingRight: '4px',
  opacity: 1,
});

const searchInputStyle = {
  flex: 1,
  fontSize: '14px',
  '&::placeholder': {
    color: '#757575',
    opacity: 1,
  },
};

const clearIconButtonStyle = {
  padding: '4px',
  cursor: 'pointer',
  color: '#15968E',
};

const noMatchTextStyle = {
  marginLeft: '16px',
  fontSize: '14px',
  color: '#000000',
  fontWeight: 400,
};

const ExtendedView = ({
  table,
  onColumnViewChange,
  onAllColumnViewChange,
  onRowsPerPageChange,
  onPageChange,
  customTheme,
  queryVariables,
  onSearch,
  initialSearchValue = '',
}) => {
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [isSearching, setIsSearching] = useState(!!initialSearchValue);
  const [hasResults, setHasResults] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  // Update searchValue when initialSearchValue changes
  React.useEffect(() => {
    setSearchValue(initialSearchValue);
    setIsSearching(!!initialSearchValue);
  }, [initialSearchValue]);

  const { extendedViewConfig } = table;
  if (!extendedViewConfig) {
    return null;
  }
  const {
    manageViewColumns = false,
    pagination = false,
    hasExport = true,
    searchBar = false,
  } = extendedViewConfig;

  // Check if this is the Files tab
  const isFilesTab = table.paginationAPIField === 'fileOverview' || table.paginationAPIField === 'getFilenames';

  // Handler for search functionality
  const handleSearch = () => {
    if (searchValue.trim()) {
      setIsSearching(true);
      if (onSearch) {
        onSearch(searchValue.trim());
      }
    } else {
      // Clear search
      setIsSearching(false);
      setHasResults(true);
      if (onSearch) {
        onSearch('');
      }
    }
  };

  // Handler for Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Handler for clearing search
  const handleClear = () => {
    setSearchValue('');
    setIsSearching(false);
    setHasResults(true);
    if (onSearch) {
      onSearch('');
    }
  };

  // Update hasResults based on table totalRowCount
  React.useEffect(() => {
    if (isSearching && table.totalRowCount !== undefined) {
      setHasResults(table.totalRowCount > 0);
    }
  }, [table.totalRowCount, isSearching]);

  const themeConfig = createTheme({ overrides: { ...defaultTheme(), ...customTheme } });
  return (
    <ThemeProvider theme={themeConfig}>
      {/* {(numSelected === 0 && (download || manageViewColumns)) && (
      <Toolbar className="downloadColumnView">
         <DownloadButton
          download={download}
        />
      </Toolbar>
      )} */}
      {
          (pagination) && (
            <div className="downloadArea" style={downloadAreaStyle}>
              {/* Search bar - only show for Files tab */}
              {isFilesTab && (
                <div style={searchBarContainerStyle}>
                  <div style={getSearchBarWrapperStyle(isFocused)}>
                    <InputBase
                      placeholder="Search Files"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      style={searchInputStyle}
                      inputProps={{ 'aria-label': 'search files' }}
                    />
                    {searchValue && (
                      <IconButton
                        onClick={handleClear}
                        style={clearIconButtonStyle}
                        size="small"
                        aria-label="clear search"
                      >
                        <CloseIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    )}
                  </div>
                  {isSearching && !hasResults && (
                    <span style={noMatchTextStyle}>No Matching Records Found</span>
                  )}
                </div>
              )}
              <CustomPagination
                customTheme={customTheme.tblTopPgn}
                rowsPerPageOptions={table.rowsPerPageOptions || [10, 25, 50, 100]}
                component="div"
                count={table.totalRowCount || 0}
                rowsPerPage={table.rowsPerPage || 10}
                page={table.page || 0}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                queryVariables={queryVariables}
                table={table}
              />
              <ManageColumnView
                table={table}
                manageViewColumns={manageViewColumns}
                onColumnViewChange={onColumnViewChange}
                onAllColumnViewChange={onAllColumnViewChange}
              />
              {hasExport && (
                <DownloadButton
                  count={table.totalRowCount || 0}
                  rowsPerPage={table.rowsPerPage || 10}
                  page={table.page || 0}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  queryVariables={queryVariables}
                  table={table}
                />
                <ManageColumnView
                  table={table}
                  manageViewColumns={manageViewColumns}
                  onColumnViewChange={onColumnViewChange}
                  onAllColumnViewChange={onAllColumnViewChange}
                />
                {hasExport && (
                  <DownloadButton
                    count={table.totalRowCount || 0}
                    queryVariables={queryVariables}
                    table={table}
                  />
                )}
              </div>
            </div>
          )
        }
    </ThemeProvider>
  );
};

export default ExtendedView;
