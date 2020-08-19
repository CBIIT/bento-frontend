import React from 'react';
import {
  Button, withStyles,
} from '@material-ui/core';
// import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import DropdownItemsMenu from './DropdownItemsMenu';

const DropdownMenu = ({
  classes, handleButtonClickEvent, linkText, clickedEl, dropDownElements,
}) => {
  const [displayDropDownMenu, setDisplayDropDownMenu] = React.useState(false);

  function handleClick() {
    setDisplayDropDownMenu(true);
  }

  function handleMoveOut() {
    setDisplayDropDownMenu(false);
  }

  function dropdownMenuClickEvent() {
    setDisplayDropDownMenu(false);
    handleButtonClickEvent('aboutMenu');
  }

  return (
    <div
      onMouseEnter={handleClick}
      onMouseLeave={handleMoveOut}
      className={classes.aboutMenu}
    >
      <Button
        id="button_navbar_about"
        weight="medium"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onFocus={handleClick}
        className={classes.logotype}
        classes={{ root: classes.buttonRoot }}
      >
        <span className={clickedEl === 'aboutMenu' ? classes.buttonRootClicked : ''}>
          { linkText }
        </span>
        {/* <ExpandMoreRoundedIcon className={classes.icon} /> */}
      </Button>
      {displayDropDownMenu ? <DropdownItemsMenu handleClick={dropdownMenuClickEvent} dropDownElements={dropDownElements} /> : ''}
    </div>
  );
};

const styles = (theme) => ({
  logotype: {
    whiteSpace: 'nowrap',
    color: theme.palette.primary.contrastText,
    fontFamily: 'Nunito',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.9px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonRoot: {
    paddingTop: '9px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  buttonRootClicked: {
    borderBottom: '2px solid #FFFFFF',
  },
  icon: {
    fontSize: '18px',
  },
  paper: {
    background: '#309EC4',
    padding: '6px 16px 16px 16px',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Lato',
    fontSize: '13px',
    fontWeight: '800',
    lineSpacing: '1px',
    display: 'block',
    marginTop: '13px',
    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },
  aboutItemsWrapper: {
    maxWidth: '150px',
  },
  aboutMenu: {
    display: 'inline-block',
  },
});

export default withStyles(styles)(DropdownMenu);
