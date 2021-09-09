/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  TextField, CircularProgress, Backdrop, withStyles, List, ListItem, Divider,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import ClearFilters from './clearFilters';
import { getAllIds, localSearch, setSideBarToLoading } from '../../../pages/dashboardTab/store/dashboardReducer';
import {
  facetSectionVariables,
  defaultFacetSectionVariables,
} from '../../../bento/dashboardData';

function getSearchResultColor(index, currentSection) {
  return index % 2 ? facetSectionVariables[currentSection] ? facetSectionVariables[currentSection].checkBoxColorsTwo ? facetSectionVariables[currentSection].checkBoxColorsTwo : '' : defaultFacetSectionVariables.checkBoxColorsTwo
    : facetSectionVariables[currentSection] ? facetSectionVariables[currentSection].checkBoxColorsOne ? facetSectionVariables[currentSection].checkBoxColorsOne : '' : defaultFacetSectionVariables.checkBoxColorsOne;
}
function getSearchResultCrossColor(currentSection) {
  let crossColor = 'black';
  crossColor = facetSectionVariables[currentSection] ? facetSectionVariables[currentSection].color ? facetSectionVariables[currentSection].color : '' : defaultFacetSectionVariables.color;
  return crossColor;
}

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
    // make the value unique to avoid duplicate search result
    // const newValueUnique = [...new Set(newValue)];
    const newValueUnique = [...new Set(newValue.map(JSON.stringify))].map(JSON.parse);
    setSideBarToLoading();
    setValue(newValueUnique);
    localSearch(newValueUnique);
  }
  const onDelete = (title) => () => {
    const newValue = value.filter((v) => v.title !== title);
    onChange(newValue);
  };

  function resetFilter() {
    setValue([]);
    localSearch([]);
    return null;
  }

  return (
    <>
      {/* This is a temp solution for clear all need to find betetr solution
       why clear filter on click not working */}
      <div className={classes.clearFiltersBorder}>
        <a onClick={() => resetFilter()}>
          <ClearFilters
            disable={value.length === 0}
            onClick={() => {}}
            resetText="Clear all search selections"
          />
        </a>
      </div>
      <div>
        <div className={classes.searchBoxRoot}>
          <Autocomplete
            id="localSearch"
            classes={classes}
            onChange={(event, newValue) => onChange(newValue)}
            multiple
            value={value}
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
            renderTags={() => null}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search"
                variant="outlined"
                size="small"
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
        </div>
        <Divider
          style={{
            backgroundColor: '#B0CFE1',
            height: '1px',
          }}
        />
        <div>
          <List>
            {value.map((v, index) => (
              <>
                <ListItem
                  style={{
                    backgroundColor: getSearchResultColor(index, v.type),
                  }}
                  classes={{ gutters: classes.listItemGutters }}
                >
                  <IconButton
                    disableRipple
                    style={{ backgroundColor: 'transparent' }}
                    onClick={onDelete(v.title)}
                  >
                    <CloseIcon
                      classes={{ root: classes.closeRoot }}
                      style={{
                        color: getSearchResultCrossColor(v.type),
                      }}
                    />
                  </IconButton>
                  <div className={classes.searchResultDetailText}>
                    <span>
                      {`${v.title}`}
                    </span>
                  </div>
                </ListItem>
                <Divider
                  style={{
                    backgroundColor: '#FFFFFF',
                    height: '2px',
                  }}
                />
              </>
            ))}
          </List>
        </div>
      </div>
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
  clearFiltersBorder: {
    borderTop: '1px solid black',
    borderBottom: '1px solid #B0CFE1',
  },
  inputRoot: {
    borderRadius: 10,
    // maxHeight: 10,
    marginTop: '5px',
    marginBottom: '5px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F5B9C',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F5B9C',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0F5B9C',
    },
    '& .MuiInputBase-input': {
      height: '7px',
    },
  },
  closeRoot: {
    marginLeft: '3px',
    height: 18,
  },
  listItemGutters: {
    padding: '5px 0px 5px 0px',
  },
  searchResultDetailText: {
    marginTop: '1.5px',
    color: '#000000',
    lineHeight: '120%',
    fontFamily: 'Nunito',
    fontSize: '14px',
  },
  searchBoxRoot: {
    marginLeft: 'Auto',
    marginRight: 'Auto',
    width: '90%',
  },
});

export default withStyles(styles)(localSearchCOmponent);
