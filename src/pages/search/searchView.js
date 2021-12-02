/* eslint-disable */
import React from 'react';
import {
  TextField, CircularProgress, withStyles, Box, ListItem, Divider, Chip, Tabs, Tab
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import { getSearch, getSearchPageResults } from '../dashboardTab/store/dashboardReducer';
import Pagination from './components/pagination';
import Subsection from './components/searchCard';


function searchComponent({ classes, searchparam = '' }) {
  const [tab, setTab] = React.useState('2');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const loading = open;
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    getAutoCompleteRes(searchparam)
    onChange(searchparam);
  }, [open]);

  async function onChange(newValue = []) {
    const searchResp = await getSearchPageResults(newValue);
    setSearchResults(searchResp);
  }

  async function getAutoCompleteRes(newValue = []) {
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    const keys = ['programs', 'studies', 'subjects', 'samples', 'files'];
    const datafields = ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id'];

    const mapOption = keys.map((key, index) => searchResp[key].map((id) => (id[datafields[index]])));
    const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);
    setOptions(newValue !== '' ? [...[newValue],...option]:option);
  }

  return (
    <>
      <div className={classes.heroArea}>
        <div>
          <Autocomplete
            className={classes.autocomplete}
            freeSolo
            id="search"
            onChange={(event, newValue) => onChange(newValue)}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              getAutoCompleteRes(newInputValue);
            }}
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
                    notchedOutline: classes.notchedOutline
                  },
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                      <SearchIcon style={{ color: 'black' }} />
                    </>
                  ),
                }}
              />
            )}
          />
        </div>
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.width1100}>
          <Box  sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tab} fullWidth={true}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="scrollable" aria-label="tabs">
                  <Tab label="All" value="1" />
                  <Tab label={`Cases (${searchResults.subject_count || 0})`} value="2" />
                  <Tab label={`Samples (${searchResults.sample_count || 0})`} value="3" />
                  <Tab label={`Files (${searchResults.file_count || 0})`} value="4" />
                  <Tab label={`Programs (${searchResults.program_count || 0})`} value="5" />
                  <Tab label={`Studies (${searchResults.study_count || 0})`} value="6" />
                  <Tab label={`Data (${searchResults.value_count || 0})`} value="7" />
                  <Tab label={`About (${searchResults.about_count || 0})`} value="8" />
                </TabList>
              </Box>
              <TabPanel value="1"><Subsection data={searchResults.subjects} /></TabPanel>
              <TabPanel value="2"><Subsection data={searchResults.subjects} /></TabPanel>
              <TabPanel value="3"><Subsection data={searchResults.samples} /></TabPanel>
              <TabPanel value="4"><Subsection data={searchResults.files} /></TabPanel>
              <TabPanel value="5"><Subsection data={searchResults.programs} /></TabPanel>
              <TabPanel value="6"><Subsection data={searchResults.studies} /></TabPanel>
              <TabPanel value="7"><Subsection data={searchResults.values} /></TabPanel>
              <TabPanel value="8"><Subsection data={searchResults.about_page} /></TabPanel>

            </TabContext>
          </Box>
        </div>
        <Pagination />
      </div>
    </>
  );
}

const styles = () => ({
  searchText: {
    color: '#1479D3',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  notchedOutline: {

  },
  input: {
    borderRadius: '8px',
    color: '#1479D3',
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
});

export default withStyles(styles)(searchComponent);
