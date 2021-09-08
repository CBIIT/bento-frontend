/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  TextField, CircularProgress, Divider, Backdrop, withStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClearFilters from './clearFilters';
import { getAllIds, localSearch, setSideBarToLoading } from '../../../pages/dashboardTab/store/dashboardReducer';

function localSearchCOmponent({ classes }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState([]);

  // data from store for sidebar laoding
  const isSidebarLoading = useSelector((state) => (
    state.dashboardTab
  && state.dashboardTab.setSideBarLoading
      ? state.dashboardTab.setSideBarLoading : false));
  const tabDataLoading = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.isDashboardTableLoading
    ? state.dashboardTab.isDashboardTableLoading
    : false));
  // redux use actions

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await getAllIds();
      const keys = ['fileIds', 'fileNames', 'sampleIds', 'subjectIds'];
      const mapOption = keys.map((key) => response[key].map((id) => ({ type: key, title: id })));
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

  function onChange(newValue = []) {
    setSideBarToLoading();
    setValue(newValue);
    localSearch(newValue);
  }

  function resetFilter() {
    setValue([]);
    localSearch([]);
    return null;
  }

  return (
    <>
      {/* This is a temp solution for clear all need to find betetr solution
       why clear filter on click not working */}
      <a onClick={() => resetFilter()}>
        <ClearFilters
          disable={value.length === 0}
          onClick={() => {}}
          resetText="Clear all search selections"
        />
      </a>
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
      <Backdrop className={classes.backdrop} open={isSidebarLoading || tabDataLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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

export default withStyles(styles)(localSearchCOmponent);
