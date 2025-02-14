import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import {
  withStyles, Paper,
} from '@material-ui/core';
import clsx from 'clsx';

const CustomDropdownMenu = ({
  classes, handleClick, dropDownElements,
  externalLinksFlag, linkText, externalLinks, externalLinksFirst,
}) => {
  const renderInternalLinks = React.useCallback(() => (
    dropDownElements.map((dropDownElementsItem) => (
      <HashRouter>
        <NavLink
          className={
            dropDownElementsItem.sublink
              ? clsx(classes.sublink, classes.link)
              : classes.link
          }
          activeStyle={dropDownElementsItem.linkActiveStyle
            ? { color: dropDownElementsItem.linkActiveStyle } : { color: '#27DBFF' }}
          to={dropDownElementsItem.link}
          onClick={handleClick}
        >
          {dropDownElementsItem.labelText}
        </NavLink>
      </HashRouter>
    ))
  ), [dropDownElements]);

  const renderExternalLinks = React.useCallback(() => (
    externalLinksFlag && externalLinks[linkText] ? (
      externalLinks[linkText].map((link) => (
        <a
          href={link.link}
          rel="noreferrer"
          target="_blank"
          className={
            classes.link
          }
          // TODO: find out use of activeStyle, If not used please remove.
          // eslint-disable-next-line react/no-unknown-property
          activeStyle={{ color: '#27DBFF' }}
        >
          {link.title}
        </a>
      ))
    ) : null
  ), [externalLinks, externalLinksFirst, externalLinksFlag]);

  return (
    <Paper className={classes.paper}>
      <div id="aboutDropDown">
        {
          !externalLinksFirst
            ? (
              <>
                {renderInternalLinks()}
                {renderExternalLinks()}
              </>
            )
            : (
              <>
                {renderExternalLinks()}
                {renderInternalLinks()}
              </>
            )
        }
      </div>
    </Paper>
  );
};

const styles = () => ({
  paper: (props) => {
    const defaultProps = {
      background: '#142D64',
      width: '170px',
      padding: '0px 16px 18px 22px',
      position: 'absolute',
      margin: '-5px 0px 0px 18px',
      borderRadius: '0',
    };
    return Object.assign(defaultProps, props.navBarstyling
      ? props.navBarstyling.dropdownMenu ? props.navBarstyling.dropdownMenu.paper : {} : {});
  },
  sublink: (props) => {
    const defaultProps = {
      fontWeight: '500 !important',
    };
    return Object.assign(defaultProps, props.navBarstyling
      ? props.navBarstyling.dropdownMenu ? props.navBarstyling.dropdownMenu.sublink : {} : {});
  },
  link: (props) => {
    const defaultProps = {
      textDecoration: 'none',
      color: 'white',
      fontFamily: 'Lato',
      fontSize: '15px',
      fontWeight: '800',
      lineHeight: '12px',
      display: 'block',
      marginTop: '13px',
      '&:hover': {
        cursor: 'pointer',
        color: '#41A7FF',
      },
    };
    return Object.assign(defaultProps, props.navBarstyling
      ? props.navBarstyling.dropdownMenu ? props.navBarstyling.dropdownMenu.link : {} : {});
  },
});

CustomDropdownMenu.defaultProps = {
  classes: {},
  statsStyling: {},
};

export default withStyles(styles)(CustomDropdownMenu);
