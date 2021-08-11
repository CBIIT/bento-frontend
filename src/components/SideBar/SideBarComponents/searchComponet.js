import React from 'react';
import { TextField, CircularProgress, Divider } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClearFilters from './clearFilters';
import { getAllIds, localSearch } from '../../../pages/dashboardTab/store/dashboardReducer';

export default function localSearchCOmponent() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await getAllIds();
      const keys = ['fileIds', 'fileNames', 'sampleIds', 'subjectIds'];
      const mapOption = keys.map((key) => response[0][key].map((id) => ({ type: key, title: id })));
      const option = mapOption.reduce((acc = [], iterator) => [...acc, ...iterator]);

      if (active) {
        setOptions(option);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function onChange(newValue) {
    setValue(newValue);
    localSearch(newValue);
  }

  function resetFilter() {
    setValue([]);
    localSearch([]);
  }

  return (
    <>
      <ClearFilters
        disable={options.length === 0}
        onClick={() => resetFilter()}
      />
      <Divider
        variant="middle"
        style={{
          backgroundColor: 'rgb(16, 160, 117)',
          margin: '0px',
          height: '5px',
        }}
      />
      <Autocomplete
        id="localSearch"
        onChange={(event, newValue) => onChange(newValue)}
        multiple
        value={value}
        style={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
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
    </>
  );
}
