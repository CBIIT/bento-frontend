import React from 'react';
import { Search as SearchIcon } from '@material-ui/icons';

/**
 * Handles backward compatibility for search icon
 *
 * NOTE: type of 'image' is used for backward compatibility
 * default is the material-ui icon
 *
 * @param {object} props
 * @returns
 */
export const CustomSearchIcon = ({ ...props }) => {
  const {
    id = 'global_search_input_find',
    classes,
    onClick,
    type,
  } = props;

  if (type === 'image') {
    return (
      <span id={id} className={classes.searchIconSpan} onClick={onClick}>
        <img
          className={classes.searchIcon}
          src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchSearch.svg"
          alt="search icon"
        />
      </span>
    );
  }

  return (
    <SearchIcon
      id={id}
      className={classes.searchIconSpan}
      onClick={onClick}
    />
  );
};

export default CustomSearchIcon;
