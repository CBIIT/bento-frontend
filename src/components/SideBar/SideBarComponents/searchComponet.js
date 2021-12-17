/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  TextField, CircularProgress, Backdrop, withStyles, List, ListItem, Divider,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import CloseIcon from '@material-ui/icons/Close';
import {
  getAllIds,
  localSearch,
  addAutoComplete,
  setSideBarToLoading,
} from '../../../pages/dashboardTab/store/dashboardReducer';
import {
  search,
  defaultSearch,
} from '../../../bento/dashboardData';
import styles from './styles/searchComponentStyles';

function getSearchResultCrossColor(currentSection) {
  let crossColor = 'black';
  crossColor = search[currentSection] ? search[currentSection].color ? search[currentSection].color : '' : defaultSearch.color;
  return crossColor;
}

const LocalSearchComponent = ({ classes, type }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const isSidebarLoading = useSelector((state) => (
    state.dashboardTab
      && state.dashboardTab.setSideBarLoading
      ? state.dashboardTab.setSideBarLoading : false));

  const tabDataLoading = useSelector((state) => (state.dashboardTab
    && state.dashboardTab.isDashboardTableLoading
    ? state.dashboardTab.isDashboardTableLoading
    : false));
  // redux use actions

  React.useImperativeHandle(ref, () => ({
    clear() {
      setValue([]);
      localSearch([]);
      return null;
    },
  }));

  React.useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      const response = await getAllIds(type);
      const opts = response[type].map((id) => ({ type, title: id }));
      if (active) {
        setOptions(opts);
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
    const newValueUnique = [...new Set(newValue.map(JSON.stringify))].map(JSON.parse);
    setSideBarToLoading();
    setValue(newValueUnique);
    localSearch(newValueUnique);
  }

  React.useEffect(() => {
    addAutoComplete({
      type: type.replace('Ids', ''),
      value,
    });
    setSideBarToLoading();
    localSearch(value);
  }, [value]);

  const onDelete = (title) => () => {
    const newValue = value.filter((v) => v.title !== title);
    onChange(newValue);
  };

  return (
    <>
      <div>
        <div>
          <List>
            {value.slice().reverse().map((v, index) => (
              <>
                <Divider
                  style={{
                    backgroundColor: '#B1B1B1',
                    height: '2px',
                  }}
                />
                <ListItem
                  classes={{ gutters: classes.listItemGutters }}
                  key={index}
                >
                  <div className={classes.searchResultDetailText}>
                    <span>
                      {`${v.title}`}
                    </span>
                  </div>
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

                </ListItem>
              </>
            ))}
          </List>
        </div>
        <div className={classes.searchBoxRoot}>
          <Autocomplete
            id="localSearch"
            freeSolo={false}
            popupIcon=""
            classes={classes}
            onChange={(event, newValue) => onChange(newValue)}
            multiple
            filterOptions={createFilterOptions({ trim: true })}
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
                placeholder="e.g. BENTO-CASE-06, BENTO-CASE-22"
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
      </div>
      <Backdrop className={classes.backdrop} open={isSidebarLoading || tabDataLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const localSearchComponent = React.forwardRef(LocalSearchComponent);

export default withStyles(styles)(localSearchComponent);
