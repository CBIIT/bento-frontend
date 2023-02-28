import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ExpandElement } from './components/ExpandElement';
import { DEFAULT_STYLES } from './styles';
import { DEFAULT_CONFIG_SEARCHBAR } from './config';
import { CustomTextField } from './components/CustomTextField';
import { CustomPopper } from './components/CustomPopper';

/**
 * A generator that exposes a Global Searchbar component
 *
 * @param {object} uiConfig configuration object
 * @returns {object} { SearchBar }
 */
export const SearchBarGenerator = (uiConfig = DEFAULT_CONFIG_SEARCHBAR) => {
  const {
    classes: uiClasses, functions, config,
  } = uiConfig;

  const classes = uiClasses && typeof uiClasses === 'object'
    ? uiClasses
    : DEFAULT_STYLES();

  const onChange = functions && functions.onChange && typeof functions.onChange === 'function'
    ? functions.onChange
    : DEFAULT_CONFIG_SEARCHBAR.functions.onChange;

  const filterFunction = functions && functions.filterOptions && typeof functions.filterOptions === 'function'
    ? functions.filterOptions
    : DEFAULT_CONFIG_SEARCHBAR.functions.filterOptions;

  const labelFunction = functions && functions.getOptionLabel && typeof functions.getOptionLabel === 'function'
    ? functions.getOptionLabel
    : DEFAULT_CONFIG_SEARCHBAR.functions.getOptionLabel;

  const suggestionFunction = functions && functions.getSuggestions && typeof functions.getSuggestions === 'function'
    ? functions.getSuggestions
    : DEFAULT_CONFIG_SEARCHBAR.functions.getSuggestions;

  const searchRoute = config && config.searchRoute
    ? config.searchRoute
    : DEFAULT_CONFIG_SEARCHBAR.config.searchRoute;

  const minimumInputLength = config && config.minimumInputLength && typeof config.minimumInputLength === 'number'
    ? config.minimumInputLength
    : DEFAULT_CONFIG_SEARCHBAR.config.minimumInputLength;

  const maximumSuggestions = config && config.maxSuggestions && typeof config.maxSuggestions === 'number'
    ? config.maxSuggestions
    : DEFAULT_CONFIG_SEARCHBAR.config.maxSuggestions;

  return {
    SearchBar: ({ ...props }) => {
      const {
        clearable = false, showLoading = false,
      } = props;

      const history = useHistory();
      const [inputValue, setInputValue] = useState('');
      const [results, setResults] = useState([]);
      const [loading, setLoading] = useState(false);

      /**
       * Handles the autocomplete search
       *
       * Note:
       * - This function wraps the getSuggestions helper function
       *
       * @async
       * @param {object} event source of the event
       * @param {string} newValue new value of the input
       * @returns void
       */
      async function fetchAutocomplete(event, newValue) {
        setInputValue(newValue);

        if (!event) {
          return;
        }
        if (minimumInputLength > 0 && newValue && newValue.length < minimumInputLength) {
          return;
        }

        setLoading(true);
        const result = await suggestionFunction(config, newValue);

        const resultOpts = !result || !(result instanceof Array) || result.length === 0
          ? []
          : [
            ...(maximumSuggestions > 0 && result.length > maximumSuggestions
              ? result.slice(0, maximumSuggestions)
              : result),
            <ExpandElement
              classes={classes}
              text={config.expandText || DEFAULT_CONFIG_SEARCHBAR.config.expandText}
            />,
          ];

        setLoading(false);
        setResults(resultOpts);
      }

      return (
        <Autocomplete
          id="search"
          freeSolo
          options={results}
          loading={showLoading ? loading : false}
          disableClearable={!clearable}
          className={classes.autocomplete}
          inputValue={inputValue}
          onInputChange={fetchAutocomplete}
          filterOptions={filterFunction}
          getOptionLabel={labelFunction}
          onChange={(event, value) => onChange(value, searchRoute, history, event)}
          PopperComponent={(params) => (<CustomPopper {...params} classes={classes} />)}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              loading={showLoading ? loading : false}
              classes={classes}
              placeholder={config.placeholder || DEFAULT_CONFIG_SEARCHBAR.config.placeholder}
              onClick={(val) => onChange(val, searchRoute, history)}
              onEnter={(val) => onChange(val, searchRoute, history)}
            />
          )}
        />
      );
    },
  };
};

export default SearchBarGenerator;
