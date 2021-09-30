/* eslint-disable */
import React from 'react';
import {
  TextField, CircularProgress, withStyles,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSearch } from '../../pages/dashboardTab/store/dashboardReducer';

function searchComponent() {
  const [open, setOpen] = React.useState(false);
  const [sendToSearchPage, setSendToSearchPage] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open;
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function onChange(newValue = []) {
    setValue(newValue);
    setSendToSearchPage(true);
  }

  async function getAutoCompleteRes(newValue = []) {
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    const keys = ['program_ids', 'arm_ids', 'subject_ids', 'sample_ids', 'file_ids'];
    const mapOption = keys.map((key) => searchResp[key].map((id) => ({ type: key, title: id })));
    const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);
    setOptions(option);
  }

  return (
    <>
      {sendToSearchPage ? <Redirect to={`/search/${value[0].title}`} />
        : (
          <Autocomplete
            freeSolo
            id="search"
            onChange={(event, newValue) => onChange(newValue)}
            multiple
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              getAutoCompleteRes(newInputValue);
            }}
            value={value}
            style={{ width: 300 }}
            filterOptions={(optionSlice) => optionSlice.slice(0, 5)}
            getOptionLabel={(option) => option.title}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="search"
                variant="filled"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        )}
    </>
  );
}

const styles = () => ({

  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },
});

export default withStyles(styles)(searchComponent);
