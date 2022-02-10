import React from 'react';
import {
  TextField, CircularProgress, withStyles, Box, Tab, Popper,
} from '@material-ui/core';
import {
  Autocomplete, TabContext, TabList, TabPanel,
} from '@material-ui/lab';
import { useHistory } from 'react-router-dom'; // version 5.2.0

// import { Clear as ClearIcon } from '@material-ui/icons';
import {
  SEARCH_PAGE_RESULT_PROGRAM,
  SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_SUBJECTS,
  SEARCH_PAGE_RESULT_SAMPLES,
  SEARCH_PAGE_RESULT_FILES,
  SEARCH_PAGE_RESULT_MODEL,
  SEARCH_PAGE_RESULT_ABOUT,
} from '../../bento/search';
import { getSearch, getSearchPageResults } from '../dashboardTab/store/dashboardReducer';
// import Pagination from './components/pagination';
import Subsection from './components/searchResultSection';

function searchComponent({ classes, searchparam = '' }) {
  const [tab, setTab] = React.useState('1');
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const [open] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [searchText, setSearchText] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const loading = open;
  const [value] = React.useState([]);

  async function onChange(newValue = []) {
    const searchResp = await getSearchPageResults(newValue);
    setSearchResults(searchResp);
    setTab('1');
    setOptions([]);
    setSearchText(newValue);
    history.push(`/search/${newValue}`);
  }

  const CustomPopper = (props) => <Popper {...props} className={classes.root} placement="bottom" />;
  const AllLabel = () => (
    <div>
      <img
        className={classes.filterIcon}
        src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/FunnelIcon.svg"
        alt="filter icon"
      />
      <span classes={classes.allText}>ALL</span>
    </div>
  );

  async function getAutoCompleteRes(newValue = []) {
    // For clear all functionality
    if (newValue === '') {
      onChange(newValue);
    }
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    const keys = ['programs', 'studies', 'subjects', 'samples', 'files', 'model'];
    const datafields = ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id', 'node_name'];

    const mapOption = keys.map(
      (key, index) => searchResp[key].map((id) => (id[datafields[index]])),
    );
    const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);
    setOptions(newValue !== '' ? [...[newValue.toUpperCase()], ...option] : option);
  }

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    getAutoCompleteRes(searchparam);
    onChange(searchparam);
  }, [open]);

  // eslint-disable-next-line max-len
  const allCount = () => (searchResults.subject_count + searchResults.sample_count + searchResults.program_count + searchResults.study_count + searchResults.file_count + searchResults.model_count + searchResults.about_count);

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
          <TabContext value={tab} fullWidth inkBarStyle={{ background: '#142D64' }}>
            <Box sx={{ borderBottom: '1px solid #828282' }}>
              <TabList onChange={handleChange} aria-label="tabs" classes={{ root: classes.tabContainter, indicator: classes.indicator }}>
                <Tab label={AllLabel()} classes={{ root: classes.buttonRoot, wrapper: classes.allTab }} value="1" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.subjectTab }} label={`Cases ${searchResults.subject_count || 0}`} value="2" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.sampleTab }} label={`Samples ${searchResults.sample_count || 0}`} value="3" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.fileTab }} label={`Files ${searchResults.file_count || 0}`} value="4" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.programTab }} label={`Programs ${searchResults.program_count || 0}`} value="5" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.studyTab }} label={`Studies ${searchResults.study_count || 0}`} value="6" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.dataTab }} label={`Data Model ${searchResults.model_count || 0}`} value="7" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.aboutTab }} label={`About ${searchResults.about_count || 0}`} value="8" />
              </TabList>
            </Box>
            <TabPanel value="1"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_SUBJECTS} count={allCount() || 0} datafield="all" /></TabPanel>
            <TabPanel value="2"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_SUBJECTS} count={searchResults.subject_count || 0} datafield="subjects" /></TabPanel>
            <TabPanel value="3"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_SAMPLES} count={searchResults.sample_count || 0} datafield="samples" /></TabPanel>
            <TabPanel value="4"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_FILES} count={searchResults.file_count || 0} datafield="files" /></TabPanel>
            <TabPanel value="5"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_PROGRAM} count={searchResults.program_count || 0} datafield="programs" /></TabPanel>
            <TabPanel value="6"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_STUDIES} count={searchResults.study_count || 0} datafield="studies" /></TabPanel>
            <TabPanel value="7"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_MODEL} count={searchResults.model_count || 0} datafield="model" /></TabPanel>
            <TabPanel value="8"><Subsection searchText={searchText} queryforAPI={SEARCH_PAGE_RESULT_ABOUT} count={searchResults.about_count || 0} datafield="about_page" /></TabPanel>
            {/* <Pagination count={10} shape="rounded" /> */}

          </TabContext>
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
