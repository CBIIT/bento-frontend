/* eslint-disable */
import React from 'react';
import {
  TextField, CircularProgress, withStyles, List, ListItem, Divider, Chip
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSearch } from '../dashboardTab/store/dashboardReducer';

function searchComponent({ classes, searchparam = '' }) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open;
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
    getAutoCompleteRes(searchparam);
  }, [open]);

  function onChange(newValue = []) {
    setValue(newValue);
  }

  async function getAutoCompleteRes(newValue = []) {
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    const keys = ['program_ids', 'arm_ids', 'subject_ids', 'sample_ids', 'file_ids'];
    const mapOption = keys.map((key) => searchResp[key].map((id) => ({ type: key, title: id })));
    const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);
    setOptions(option);
    console.log(option);
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
            options={[]}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="search"
                hiddenLabel
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                      <SearchIcon />
                    </>
                  ),
                }}
              />
            )}
          />
          <div className={classes.chipSection}>
            <button type="button" className={classes.button}>
              All
            </button>
            <button type="button" className={classes.button}>
              Cases
            </button>
            <button type="button" className={classes.button}>
              Samples
            </button>
            <button type="button" className={classes.button}>
              files
            </button>
          </div>
        </div>
      </div>
      <div className={classes.bodyContainer}>
        <div className={classes.width800}>
          {options.map((v, index) => (
            <>
              <div
                className={classes.searchItem}
              >
                  <span>
                    {`${v.type}`}
                  </span>
                  <span>
                    {`${v.title}`}
                  </span>
              </div>
              <Divider
                style={{
                  backgroundColor: '#B6DCFC',
                  height: '2px',
                }}
              />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

const styles = () => ({
  heroArea: {
    width: '100%',
    height: '200px',
    background: '#B6DCFC',
    marginTop: '-47px',
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '50px',
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
  width800: {
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
