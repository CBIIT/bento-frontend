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
    classes: uiClasses, functions, config: uiConfigOpts,
  } = uiConfig;

  const config = uiConfigOpts && typeof uiConfigOpts === 'object'
    ? uiConfigOpts
    : DEFAULT_CONFIG_SEARCHBAR.config;

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

  const minimumInputLength = config && typeof config.minimumInputLength === 'number'
    ? config.minimumInputLength
    : DEFAULT_CONFIG_SEARCHBAR.config.minimumInputLength;

  const maximumSuggestions = config && typeof config.maxSuggestions === 'number'
    ? config.maxSuggestions
    : DEFAULT_CONFIG_SEARCHBAR.config.maxSuggestions;

  const showSearchButton = config && typeof config.showSearchButton === 'boolean'
    ? config.showSearchButton
    : DEFAULT_CONFIG_SEARCHBAR.config.showSearchButton;

  const displaySearchIcon = config && typeof config.displaySearchIcon === 'boolean'
    ? config.displaySearchIcon
    : DEFAULT_CONFIG_SEARCHBAR.config.displaySearchIcon;

  const showSearchButtonContent = config && (React.isValidElement(config.showSearchButtonContent) || typeof config.showSearchButtonContent === 'string')
    ? config.showSearchButtonContent
    : DEFAULT_CONFIG_SEARCHBAR.config.showSearchButtonContent;

  return {
    SearchBar: ({ ...props }) => {
      const {
        clearable = false,
        showLoading = false,
        style = {},
        value = '',
      } = props;

      const history = useHistory();
      const [inputValue, setInputValue] = useState(value);
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
       * @param {string} reason reason for the event
       * @returns void
       */
      async function fetchAutocomplete(event, newValue, reason) {
        setInputValue(newValue);

        if (!event) {
          return;
        }
        if (minimumInputLength > 0 && newValue && newValue.length < minimumInputLength) {
          return;
        }

        setLoading(true);
        const result = await suggestionFunction(config, newValue, reason).catch(() => []);

        const resultOpts = !result || !(result instanceof Array) || result.length === 0 ? [] : [
          ...(maximumSuggestions > 0 && result.length > maximumSuggestions
            ? result.slice(0, maximumSuggestions)
            : result),
        ];

        if (maximumSuggestions > 0 && result.length > maximumSuggestions) {
          resultOpts.push(
            <ExpandElement
              classes={classes}
              text={config.expandText || DEFAULT_CONFIG_SEARCHBAR.config.expandText}
            />,
          );
        }

        setLoading(false);
        setResults(resultOpts);
      }

      return (
        <div className={classes.searchContainer}>
          <Autocomplete
            id="global_search_input"
            freeSolo
            options={results}
            loading={showLoading ? loading : false}
            disableClearable={!clearable}
            closeIcon={(
              <img
                className={classes.clearIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchDelete.svg"
                alt="clear icon"
              />
            )}
            style={style}
            className={classes.autocomplete}
            value={value}
            inputValue={inputValue}
            onInputChange={fetchAutocomplete}
            filterOptions={filterFunction}
            getOptionLabel={labelFunction}
            onChange={(event, val) => onChange(val, searchRoute, history, event)}
            PopperComponent={(params) => (<CustomPopper {...params} classes={classes} />)}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                displaySearchIcon={displaySearchIcon}
                loading={showLoading ? loading : false}
                classes={classes}
                iconType={config.iconType}
                placeholder={typeof config.placeholder === 'string' ? config.placeholder : DEFAULT_CONFIG_SEARCHBAR.config.placeholder}
                onClick={(val) => onChange(val, searchRoute, history)}
                onEnter={(val) => onChange(val, searchRoute, history)}
              />
            )}
          />
          {showSearchButton && (
            <div
              role="button"
              className={classes.searchButton}
              tabIndex={0}
              onClick={() => onChange(inputValue, searchRoute, history)}
            >
              {showSearchButtonContent}
            </div>
          )}
        </div>
      );
    },
  };
};

export default SearchBarGenerator;
