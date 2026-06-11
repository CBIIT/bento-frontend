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

      // Index where synonym (associated) rows start — list is [...participants, ...associated].
      const associatedStartIndex = useMemo(() => {
        for (let si = 0; si < options.length; si += 1) {
          if (options[si].type === 'associatedIds') return si;
        }
        return options.length;
      }, [options]);

      // Avoid passing the full list to Autocomplete or filtering with O(n) .filter on every
      // keystroke. Empty query: show a mix of participants + synonyms. Typed query: scan
      // participants (bounded) then all synonym rows so CPI matches are not skipped.
      const filteredOptions = useMemo(() => {
        const split = associatedStartIndex;
        const maxMatches = 400;
        const trimmed = inputValue != null ? String(inputValue).trim() : '';
        if (!trimmed) {
          const half = 200;
          const pTake = Math.min(split, half);
          const pSlice = options.slice(0, pTake);
          const aTake = Math.min(half, options.length - split);
          const aSlice = options.slice(split, split + aTake);
          return pSlice.concat(aSlice);
        }
        const q = trimmed.toLowerCase();
        const out = [];
        const maxScanP = split < 50000 ? split : 50000;
        for (let i = 0; i < maxScanP && out.length < maxMatches; i += 1) {
          const opt = options[i];
          const t1 = opt.title != null ? String(opt.title).toLowerCase() : '';
          const s1 = opt.synonym != null ? String(opt.synonym).toLowerCase() : '';
          if (t1.includes(q) || s1.includes(q)) out.push(opt);
        }
        for (let i = split; i < options.length && out.length < maxMatches; i += 1) {
          const opt2 = options[i];
          const t2 = opt2.title != null ? String(opt2.title).toLowerCase() : '';
          const s2 = opt2.synonym != null ? String(opt2.synonym).toLowerCase() : '';
          if (t2.includes(q) || s2.includes(q)) out.push(opt2);
        }
        return out;
      }, [inputValue, options, associatedStartIndex]);

      useEffect(() => {
        // Check if the data has already been loaded
        if (!open || dataLoaded.current || (options && options.length > 0)) {
          return;
        }

        (async () => {
          const opts = await getSuggestions(searchType);
          await new Promise((resolve) => {
            setTimeout(resolve, 0);
          });
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
