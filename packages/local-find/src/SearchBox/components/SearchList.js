import React from 'react';
import {
  Divider, List, ListItem,
} from '@material-ui/core';

/**
 * Renders a basic list of active search entries
 *
 * @param {object} props
 * @param {object} props.classes Material UI classes
 * @param {string} [props.id] id of the list element
 * @param {string[]} [props.items] items to be displayed in the list
 * @param {function} [props.onDelete] function to be called when delete icon is clicked
 * @returns {JSX.Element}
 */
const SearchList = (props) => {
  const {
    classes,
    id = 'localFindCaseDropdown',
    items = [],
    onDelete,
  } = props;

  const deleteWrapper = (item) => {
    if (onDelete) {
      onDelete(item);
    }
  };

  return (
    <List classes={{ padding: classes.listPadding }} id={id}>
      {items.slice(0, 3).map((item, index) => (
        <>
          <Divider className={classes.divider} />
          <ListItem classes={{ gutters: classes.listItemGutters }} key={index}>
            <div className={classes.searchResultDetailText}>
              <span>
                {item}
              </span>
            </div>
            <div className={classes.deleteIcon} onClick={() => deleteWrapper(item)}>
              <img src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/LocalFindCaseDeleteIcon.svg" alt="close icon" className={classes.closeRoot} />
            </div>
          </ListItem>
        </>
      ))}
      {items.length > 3 && (
        <>
          <Divider className={classes.divider} />
          <ListItem classes={{ gutters: classes.listItemGutters }} key="ellipsis">
            <div className={classes.searchResultDetailText}>
              <span>...</span>
            </div>
          </ListItem>
        </>
      )}
    </List>
  );
};

export default SearchList;
