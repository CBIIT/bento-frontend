import React from 'react';
import {
  TextField, CircularProgress, withStyles, Box, Popper,
} from '@material-ui/core';
import {
  Autocomplete,
} from '@material-ui/lab';
import { useHistory } from 'react-router-dom'; // version 5.2.0

import {
  getPublicSearchPageResults,
  getSearch,
  getSearchPageResults,
  getSearchPublic,
} from '../dashboardTab/store/dashboardReducer';

import PrivateTabView from './components/tabs/privateTabView';
import PublicTabView from './components/tabs/publicTabView';

function searchComponent({
  classes, searchparam = '', isSignedIn, isAuthorized, publicAccessEnabled,
}) {
  const [tab, setTab] = React.useState('1');
  const history = useHistory();
  const [open] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const loading = open;
  const [value] = React.useState([]);

  const authCheck = () => isAuthorized || publicAccessEnabled;

  const handleChange = (event, newValue) => {
    const activeVal = newValue.split('-')[0];

    if (activeVal === 'inactive') {
      if (isSignedIn && !isAuthorized) {
        history.push(`/request?redirect=/search/${searchText}`);
        return;
      }
      history.push(`/login?redirect=/search/${searchText}`);
      return;
    }
    setTab(activeVal);
  };

  const getAuthorizedResultQuery = (strValue) => {
    if (authCheck()) {
      return getSearchPageResults(strValue);
    }

    return getPublicSearchPageResults(strValue);
  };

  async function onChange(newValue = []) {
    const searchResp = await getAuthorizedResultQuery(newValue);
    setSearchResults(searchResp);
    setTab('1');
    setOptions([]);
    setSearchText(newValue);
    history.push(`/search/${newValue}`);
  }

  const CustomPopper = (props) => <Popper {...props} className={classes.root} placement="bottom" />;

  /**
   * Chooses the search method based on whether user is logged in,
   * returns function */
  function getSearchMethod() {
    if ((authCheck())) {
      return getSearch;
    }

    return getSearchPublic;
  }

  async function getAutoCompleteRes(newValue = []) {
    // For clear all functionality
    if (newValue === '') {
      onChange(newValue);
    }
    setInputValue(newValue);
    const searchResp = await getSearchMethod()(newValue);
    const keys = {
      public: [],
      private: ['programs', 'studies', 'subjects', 'samples', 'files', 'model'],
    };
    const datafields = {
      private: ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id', 'node_name'],
      public: [],
    };

    const mapOption = (authCheck() ? keys.private : keys.public).map(
      (key, index) => searchResp[key].map(
        (id) => (id[authCheck() ? datafields.private[index] : datafields.public[index]]),
      ),
    );
    const option = mapOption.length > 0
      ? mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]) : [];

    setOptions(newValue !== '' ? [...[newValue.toUpperCase()], ...option] : option);
  }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    getAutoCompleteRes(searchparam);
    onChange(searchparam);
  }, [open]);

  return (
    <>
      <div className={classes.heroArea}>
        <div>
          <Autocomplete
            className={classes.autocomplete}
            closeIcon={(
              <img
                className={classes.clearIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchDelete.svg"
                alt="clear icon"
              />
)}
            classes={{ root: classes.inputRoot }}
            freeSolo
            id="search"
            onChange={(event, newValue) => onChange(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              getAutoCompleteRes(newInputValue);
            }}
            PopperComponent={CustomPopper}
            value={value}
            style={{ width: 750 }}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                hiddenLabel
                InputProps={{
                  style: {
                    paddingLeft: '20px',
                    paddingTop: '2px',
                    paddingBottom: '3px',
                    color: '#1479D3',
                  },
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                      <span onClick={() => onChange(inputValue)} className={classes.searchIconSpan}>
                        <img
                          className={classes.searchIcon}
                          src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchSearch.svg"
                          alt="search icon"
                        />
                      </span>
                    </>
                  ),
                }}
              />
            )}
          />
        </div>
      </div>
      <div className={classes.bodyContainer}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          {authCheck()
            ? (
              <PrivateTabView
                tab={tab}
                options={{ handleChange, searchResults }}
                classes={classes}
                searchText={searchText}
              />
            ) : (
              <PublicTabView
                tab={tab}
                options={{ handleChange, searchResults }}
                classes={classes}
                searchText={searchText}
              />
            )}

        </Box>
      </div>
    </>
  );
}

const styles = () => ({
  allText: {
    marginLeft: '8px',
  },
  subjectTab: {
    color: '#142D64',
  },
  indicator: {
    backgroundColor: '#142D64',
  },
  tabContainter: {
    display: 'flex',
    maxWidth: '840px',
    margin: '0 auto',
  },
  sampleTab: { color: '#142D64' },
  fileTab: { color: '#142D64' },
  programTab: { color: '#142D64' },
  studyTab: { color: '#142D64' },
  dataTab: { color: '#142D64' },
  aboutTab: { color: '#142D64' },
  allTab: { color: '#142D64' },
  searchText: {
    color: '#1479D3',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  buttonRoot: {
    minWidth: '100px',
    padding: '6px, 28px',
    textTransform: 'none',
  },
  notchedOutline: {

  },
  input: {
    borderRadius: '8px',
    borderColor: '#616161',
    color: '#747474',
    fontFamily: 'Lato',
    fontSize: '25px',

  },
  heroArea: {
    width: '100%',
    height: '167px',
    background: '#D9E8F8',
    marginTop: '-47px',
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '57px',
  },
  chipSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px',
    },
  },
  button: {
    borderRadius: '30px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '16px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '32px',
    marginBottom: '32px',
    marginRight: '24px',
    borderWidth: '1px',
    borderColor: 'black',
  },
  bodyContainer: {
    background: '#FFFFFF',
    color: '#000000',
    fontSize: '15px',
    lineHeight: '22px',
  },
  width1100: {
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
  },
  searchItem: {
    minHeight: '100px',
    padding: '16px',
  },

  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },

  filterIcon: {
    height: '0.86rem',
    margin: '0px 16px 0px 6px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      '& fieldset': {
        border: '2px solid #747474',
      },
      '&:hover fieldset': {
        border: '2px solid #747474',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #747474',
      },
    },
  },

  root: {
    '& .MuiAutocomplete-listbox': {
      borderRadius: '8px',
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#142D64',
      fontWeight: 500,
      border: '2px solid #0088FF',
      padding: '0px',
      background: '#fff',
      '& li': {
        // list item specific styling
        border: '1px solid #D2D2D2',
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#0088FF',
      },
    },
  },
  searchIcon: {
    height: '22px',
    margin: '0px 6px 0px 6px',
  },
  searchIconSpan: {
    cursor: 'pointer',
    zIndex: 40,
  },
  clearIcon: {
    height: '18px',
    margin: '-8px 4px 0px 19px',
  },
});

export default withStyles(styles)(searchComponent);
