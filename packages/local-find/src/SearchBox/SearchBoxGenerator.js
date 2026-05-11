import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { connect } from 'react-redux';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    config, functions,
  } = uiConfig;

  const onChange = functions && typeof functions.onChange === 'function'
    ? functions.onChange
    : DEFAULT_CONFIG.functions.onChange;

  const updateBrowserUrl = functions && typeof functions.updateBrowserUrl === 'function'
    ? functions.updateBrowserUrl
    : DEFAULT_CONFIG.functions.updateBrowserUrl;

  const getSuggestions = functions && typeof functions.getSuggestions === 'function'
    ? functions.getSuggestions
    : DEFAULT_CONFIG.functions.getSuggestions;

  const inputPlaceholder = config && typeof config.inputPlaceholder === 'string'
    ? config.inputPlaceholder
    : DEFAULT_CONFIG.config.inputPlaceholder;

  const noOptionsText = config && typeof config.noOptionsText === 'string'
    ? config.noOptionsText
    : DEFAULT_CONFIG.config.noOptionsText;

  // Accept either a string (legacy) or an array of search-types so a consumer
  // can pull suggestions from multiple sources (e.g. participants + synonyms).
  const searchType = config
    && (typeof config.searchType === 'string' || Array.isArray(config.searchType))
    ? config.searchType
    : DEFAULT_CONFIG.config.searchType;

  const ariaLabel = config && typeof config.ariaLabel === 'string'
    ? config.ariaLabel
    : DEFAULT_CONFIG.config.ariaLabel;

  const stateProps = (state) => ({
    autocomplete: state.localFind.autocomplete,
  });

  const dispatchProps = (dispatch) => ({
    applySearch: (data) => dispatch(updateAutocompleteData(data)),
  });

  return {
    // @ts-ignore
    // eslint-disable-next-line max-len
    SearchBox: withStyles(DEFAULT_STYLES, { withTheme: true })(connect(stateProps, dispatchProps)((props) => {
      const {
        classes, autocomplete, applySearch,
      } = props;

      const query = new URLSearchParams(useLocation().search);
      const navigate = useNavigate();

      const [open, setOpen] = useState(false);
      const [value, setValue] = useState(autocomplete || []);
      const [options, setOptions] = useState([]);
      const [inputValue, setInputValue] = useState('');

      const dataLoaded = useRef(false);
      const loading = open && (options.length === 0 || dataLoaded.current === false);

      // Custom client-side filter that matches against title OR synonym, so
      // typing a synonym surfaces its associated-IDs option.
      const filteredOptions = useMemo(() => {
        if (!inputValue) return options;
        const q = inputValue.toLowerCase();
        return options.filter((option) => {
          const titleMatch = option.title?.toString().toLowerCase().includes(q);
          const synonymMatch = option.synonym?.toString().toLowerCase().includes(q);
          return titleMatch || synonymMatch;
        });
      }, [inputValue, options]);

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
          updateBrowserUrl(query, navigate, newUniqueValue);
          applySearch(newUniqueValue);
          setValue(newUniqueValue);
        }
      }

      /**
       * Handles the deletion of a search item under SearchList. The full
       * (title, type, synonym) tuple is required because participant IDs
       * and synonym/associated IDs may share a title.
       *
       * @param {string} val
       * @param {string} [type]
       * @param {string} [synonym]
       */
      const onDelete = (val, type, synonym) => {
        const newValue = value.filter(
          (v) => !(v.title === val && v.type === type && v.synonym === synonym),
        );
        onChangeWrapper(newValue, null, true);
      };

      return (
        <div>
          <div>
            <SearchList
              classes={classes}
              items={value}
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
              options={filteredOptions}
              loading={loading}
              // We do our own client-side filtering above (title OR synonym),
              // so disable MUI's built-in label-only filter.
              filterOptions={(x) => x}
              onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              onChange={(event, newValue, reason) => onChangeWrapper(newValue, reason)}
              getOptionLabel={(option) => option.title}
              renderTags={() => null}
              renderOption={(option) => {
                const { type, title, synonym } = option;
                return (
                  <div>
                    {type === 'associatedIds' ? (
                      <>
                        <span className={classes.filterName}>Synonym</span>
                        {' '}
                        {synonym}
                      </>
                    ) : (
                      title
                    )}
                  </div>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  classes={classes}
                  placeholder={inputPlaceholder}
                  InputProps={{
                    ...params.InputProps,
                    inputProps: {
                      ...params.inputProps,
                      'aria-label': ariaLabel,
                    },
                  }}
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
