import React from 'react';
import {
  Divider, List, ListItem, withStyles,
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
      {(items || []).reverse().map((item, index) => (
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
    </List>
  );
};

const styles = () => ({
  listPadding: {
    paddingTop: 0,
    paddingBottom: 4,
  },
  deleteIcon: {
    cursor: 'pointer',
    marginTop: -4,
  },
  closeRoot: {
    height: 10,
  },
  listItemGutters: {
    padding: '0px 15px 0px 18px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchResultDetailText: {
    color: '#0D8662',
    lineHeight: '20px',
    fontFamily: 'Lato',
    fontSize: '11px',
    fontStyle: 'italic',
  },
  divider: {
    backgroundColor: '#B1B1B1',
    height: '1px',
    marginRight: 11,
    marginLeft: 12,
  },
});

export default withStyles(styles)(SearchList);
