import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { isEqual } from 'lodash';
import TextField from './components/CustomTextField';
import SearchList from './components/SearchList';
import { updateAutocompleteData } from '../store/actions/Actions';
import DEFAULT_STYLES from './styles';
import DEFAULT_CONFIG from './config';

/**
 * Generate a SearchBox component with the custom configuration
 * applied
 *
 * @param {object} [uiConfig]
 * @returns {object} { SearchBox }
 */
export const SearchBoxGenerator = (uiConfig = DEFAULT_CONFIG) => {
  const {
    config, functions, customStyles = {},
  } = uiConfig;

  const styles = () => (
    { ...DEFAULT_STYLES(), ...customStyles }
  );
  const onChange = functions && typeof functions.onChange === 'function'
    ? functions.onChange
    : DEFAULT_CONFIG.functions.onChange;

  const getSuggestions = functions && typeof functions.getSuggestions === 'function'
    ? functions.getSuggestions
    : DEFAULT_CONFIG.functions.getSuggestions;

  const inputPlaceholder = config && typeof config.inputPlaceholder === 'string'
    ? config.inputPlaceholder
    : DEFAULT_CONFIG.config.inputPlaceholder;

  const noOptionsText = config && typeof config.noOptionsText === 'string'
    ? config.noOptionsText
    : DEFAULT_CONFIG.config.noOptionsText;

  const searchType = config && typeof config.searchType === 'string'
    ? config.searchType
    : DEFAULT_CONFIG.config.searchType;

  const stateProps = (state) => ({
    autocomplete: state.localFind.autocomplete,
  });

  const dispatchProps = (dispatch) => ({
    applySearch: (data) => dispatch(updateAutocompleteData(data)),
  });

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    SearchBox: withStyles(styles, { withTheme: true })(connect(stateProps, dispatchProps)((props) => {
      const {
        classes, autocomplete, applySearch,
      } = props;

      const [open, setOpen] = useState(false);
      const [value, setValue] = useState(autocomplete || []);
      const [options, setOptions] = useState([]);

      const dataLoaded = useRef(false);
      const loading = open && (options.length === 0 || dataLoaded.current === false);

      useEffect(() => {
        // Check if the data has already been loaded
        if (!open || dataLoaded.current || (options && options.length > 0)) {
          return;
        }

        (async () => {
          const opts = await getSuggestions(searchType);

          setOptions(opts);
          dataLoaded.current = opts && opts.length > 0;
        })();
      }, [open]);

      /**
       * onChange callback for Autocomplete
       *
       * @param {array} newValue
       * @param {string} reason
       * @param {boolean} [deleted]
       */
      function onChangeWrapper(newValue = [], reason, deleted) {
        // Ignore input clear event
        if (reason === 'clear') {
          return;
        }

        // Remove duplicate values
        let newUniqueValue = [];
        if (newValue instanceof Array) {
          newUniqueValue = [...new Set(newValue.map(JSON.stringify))].map(JSON.parse);
        }

        // Call the onChange function if the selection has changed
        if (!isEqual(newUniqueValue, value)) {
          onChange(newUniqueValue, reason, deleted);
          applySearch(newUniqueValue);
          setValue(newUniqueValue);
        }
      }

      /**
       * Handles the deletion of a search item under SearchList
       *
       * @param {string} val
       */
      const onDelete = (val) => {
        const newValue = value.filter((v) => v.title !== val);
        onChangeWrapper(newValue, null, true);
      };

      return (
        <div>
          <div>
            <SearchList
              classes={classes}
              items={value.map((e) => e.title)}
              onDelete={onDelete}
            />
          </div>
          <div className={classes.searchBoxRoot}>
            <Autocomplete
              id="local_find_input"
              multiple
              disableClearable
              className={classes.autocomplete}
              classes={classes}
              value={value}
              open={open}
              freeSolo={false}
              noOptionsText={noOptionsText}
              options={options}
              loading={loading}
              filterOptions={createFilterOptions({ trim: true })}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              onChange={(event, newValue, reason) => onChangeWrapper(newValue, reason)}
              getOptionLabel={(option) => option.title}
              renderTags={() => null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  classes={classes}
                  placeholder={inputPlaceholder}
                />
              )}
            />
          </div>
        </div>
      );
    })),
  };
};

export default SearchBoxGenerator;
