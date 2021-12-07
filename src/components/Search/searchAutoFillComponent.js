import React from 'react';
import {
  TextField, CircularProgress, withStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getSearch } from '../../pages/dashboardTab/store/dashboardReducer';

function searchComponent() {
  const history = useHistory();

  const [open] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loading = open;

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function onChange(newValue = []) {
    const path = `/search/${newValue[0]}`;
    history.push(path);
  }

  async function getAutoCompleteRes(newValue = []) {
    setInputValue(newValue);
    const searchResp = await getSearch(newValue);
    const keys = ['programs', 'studies', 'subjects', 'samples', 'files'];
    const datafields = ['program_id', 'study_id', 'subject_id', 'sample_id', 'file_id'];

    const mapOption = keys.map((key, ind) => searchResp[key].map((id) => (id[datafields[ind]])));
    const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);

    setOptions(option);
  }

  return (
    <>
      <Autocomplete
        freeSolo
        id="search"
        onChange={(event, newValue) => onChange(newValue)}
        multiple
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          getAutoCompleteRes(newInputValue);
        }}
        style={{ width: 300 }}
        filterOptions={(optionSlice) => optionSlice.slice(0, 5)}
        getOptionLabel={(option) => option}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="search"
            variant="filled"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value) {
                onChange([e.target.value]);
              }
            }}
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
