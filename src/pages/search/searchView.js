import React from 'react';
import {
  TextField, CircularProgress, withStyles, Box, Tab, Popper,
} from '@material-ui/core';
import {
  Autocomplete, TabContext, TabList, TabPanel,
} from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons';
import { getSearch, getSearchPageResults } from '../dashboardTab/store/dashboardReducer';
import Pagination from './components/pagination';
import Subsection from './components/searchCard';

function searchComponent({ classes, searchparam = '' }) {
  const [tab, setTab] = React.useState('2');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const [open] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const loading = open;
  const [value] = React.useState([]);

  async function onChange(newValue = []) {
    const searchResp = await getSearchPageResults(newValue);
    setSearchResults(searchResp);
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
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    const keys = ['programs', 'studies', 'subjects', 'samples', 'files', 'values', 'nodes', 'properties'];
    const datafields = ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id', 'value', 'node_name', 'property_name'];

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

  return (
    <>
      <div className={classes.heroArea}>
        <div>
          <Autocomplete
            className={classes.autocomplete}
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
            style={{ width: 600 }}
            getOptionLabel={(option) => option}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                hiddenLabel
                InputProps={{
                  classes: {
                    root: classes.input,
                    notchedOutline: classes.notchedOutline,
                  },
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                      <SearchIcon style={{ color: 'black', stroke: 'black', strokeWidth: '1.2px' }} />
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
          <TabContext value={tab} fullWidth inkBarStyle={{ background: '#000' }}>
            <Box sx={{ borderBottom: '1px solid #828282' }}>
              <TabList onChange={handleChange} variant="scrollable" aria-label="tabs" classes={{ root: classes.tabContainter, indicator: classes.indicator }}>
                <Tab label={AllLabel()} classes={{ root: classes.buttonRoot, wrapper: classes.allTab }} value="1" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.subjectTab }} label={`Cases ${searchResults.subject_count || 0}`} value="2" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.sampleTab }} label={`Samples ${searchResults.sample_count || 0}`} value="3" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.fileTab }} label={`Files ${searchResults.file_count || 0}`} value="4" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.programTab }} label={`Programs ${searchResults.program_count || 0}`} value="5" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.programTab }} label={`Studies ${searchResults.study_count || 0}`} value="6" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.dataTab }} label={`Data ${searchResults.value_count || 0}`} value="7" />
                <Tab classes={{ root: classes.buttonRoot, wrapper: classes.aboutTab }} label={`About ${searchResults.about_count || 0}`} value="8" />
              </TabList>
            </Box>
            <TabPanel value="1"><Subsection searchText={inputValue} data={searchResults.subjects} /></TabPanel>
            <TabPanel value="2"><Subsection searchText={inputValue} data={searchResults.subjects} /></TabPanel>
            <TabPanel value="3"><Subsection searchText={inputValue} data={searchResults.samples} /></TabPanel>
            <TabPanel value="4"><Subsection searchText={inputValue} data={searchResults.files} /></TabPanel>
            <TabPanel value="5"><Subsection searchText={inputValue} data={searchResults.programs} /></TabPanel>
            <TabPanel value="6"><Subsection searchText={inputValue} data={searchResults.studies} /></TabPanel>
            <TabPanel value="7"><Subsection searchText={inputValue} data={searchResults.values} /></TabPanel>
            <TabPanel value="8"><Subsection searchText={inputValue} data={searchResults.about_page} /></TabPanel>

          </TabContext>
        </Box>
        <Pagination />
      </div>
    </>
  );
}

const styles = () => ({
  allText: {
    marginLeft: '8px',
  },
  subjectTab: {
    color: '#379877',
  },
  indicator: {
    backgroundColor: 'black',
  },
  tabContainter: {
    display: 'flex',
    maxWidth: '1100px',
    margin: '0 auto',
  },
  sampleTab: { color: '#1EA7FB' },
  fileTab: { color: '#AC32AB' },
  programTab: { color: '#C09500' },
  studyTab: { color: '' },
  dataTab: { color: '#9433F7' },
  aboutTab: { color: '#AC6632' },
  allTab: { borderRight: '1px solid black' },
  searchText: {
    color: '#1479D3',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  buttonRoot: {
    minWidth: '128px',
    padding: '6px, 28px',
    textTransform: 'none',
  },
  notchedOutline: {

  },
  input: {
    borderRadius: '8px',
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
    height: '15px',
    margin: '0px 18px 0px 6px',
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      '& fieldset': {
        border: '1px solid #616161',
      },
      '&:hover fieldset': {
        border: '1px solid #616161',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #616161',
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

});

export default withStyles(styles)(searchComponent);
