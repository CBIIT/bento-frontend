import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';

const styles = {
  nav: {
    top: 0,
    left: 0,
    width: '100%',
    background: '#ffffff',
    boxShadow: '-0.1px 6px 9px -6px rgba(0, 0, 0, 0.5)',
    zIndex: 1100,
    position: 'relative',
    '& .dropdownContainer': {
      margin: '0 auto',
      position: 'relative',
      width: '1400px',
    },
    '& .loggedInName': {
      color: '#007BBD',
      textAlign: 'right',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 'normal',
      letterSpacing: '0.42px',
      textDecoration: 'none',
      textTransform: 'uppercase',
      padding: '10px 0',
      marginBottom: '4.5px',
      marginRight: '40px',
    },
    '& .invisible': {
      visibility: 'hidden',
    },
  },
  navContainer: {
    margin: '0 auto',
    maxWidth: '1400px',
    textAlign: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    '#navbar-dropdown-name-container': {
      margin: 0,
    },
  },
  ulContainer: {
    listStyle: 'none',
    margin: 0,
    paddingTop: '17px',
    paddingLeft: '13px',
    display: 'flex',
    width: '100%',
  },
  liSection: {
    display: 'inline-block',
    position: 'relative',
    lineHeight: '48px',
    letterSpacing: '1px',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
    '& a': {
      color: '#585C65',
      textDecoration: 'none',
    },
    '& .displayName': {
      color: '#007BBD',
      fontSize: '14px',
      lineHeight: '20px',
      padding: '10px 0',
      textAlign: 'right',
      width: 'fit-content',
    },
    '&.end-dropdown-li': {
      marginLeft: 'auto',
      marginRight: '32px',
    },
    '&.login-button': {
      lineHeight: '48px',
    },
    '& .clicked': {
      color: '#FFFFFF',
      background: '#1F4671',
      '&::after': {
        borderTop: '1px solid #FFFFFF',
        borderRight: '1px solid #FFFFFF',
        borderBottom: '0',
        borderLeft: '0',
        margin: '0 0 0 8px',
      },
      '&:hover': {
        borderBottom: '4px solid #1F4671',
        color: '#FFFFFF',
        '&::after': {
          content: '""',
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderTop: '1px solid #FFFFFF',
          borderRight: '1px solid #FFFFFF',
          borderBottom: '0',
          borderLeft: '0',
          margin: '0 0 0 8px',
          transform: 'rotate(-45deg)',
          WebkitTransform: 'rotate(-45deg)',
        },
      },
    },
    '& .navTitle': {
      display: 'block',
      color: '#585C65',
      fontFamily: 'poppins',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '40px',
      letterSpacing: 'normal',
      textDecoration: 'none',
      margin: '0 5px',
      padding: '0 8px',
      userSelect: 'none',
      borderTop: '4px solid transparent',
      borderLeft: '4px solid transparent',
      borderRight: '4px solid transparent',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    '& .navText': {
      borderBottom: '4px solid transparent',
      width: 'fit-content',
      margin: 'auto',
      '&:hover': {
        cursor: 'pointer',
        color: '#3A75BD',
        borderBottom: '4px solid #3A75BD',
        '&::after': {
          content: '""',
          display: 'inline-block',
          width: '6px',
          height: '6px',
          borderBottom: '1px solid #298085',
          borderLeft: '1px solid #298085',
          margin: '0 0 4px 8px',
          transform: 'rotate(-45deg)',
          WebkitTransform: 'rotate(-45deg)',
        },
      },
      '&::after': {
        content: '""',
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderBottom: '1px solid #585C65',
        borderLeft: '1px solid #585C65',
        margin: '0 0 4px 8px',
        transform: 'rotate(-45deg)',
        WebkitTransform: 'rotate(-45deg)',
      },
    },
    '& .navText.directLink::after': {
      display: 'none',
    },
    '& .navText.directLink:hover::after': {
      display: 'none',
    },
    '& .directLink::after': {
      display: 'none',
    },
    '& .directLink:hover::after': {
      display: 'none',
    },
    '& .shouldBeUnderlined': {
      borderBottom: '4px solid #3A75BD !important',
    },
    '& .navTitleClicked': {
      display: 'block',
      color: '#FFFFFF',
      fontFamily: 'poppins',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '40px',
      letterSpacing: 'normal',
      textDecoration: 'none',
      margin: '0 5px',
      padding: '0 8px',
      userSelect: 'none',
      background: '#1F4671',
      borderTop: '4px solid #5786FF',
      borderLeft: '4px solid #5786FF',
      borderRight: '4px solid #5786FF',
    },
    '& .invisible': {
      visibility: 'hidden',
    },
  },
  dropdown: {
    top: '60.5px',
    left: 0,
    width: '100%',
    background: '#1F4671',
    zIndex: 1100,
    position: 'absolute',
  },
  nameDropdownContainer: {
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    maxWidth: '1400px',
    '& .dropdownList': {
      background: '#1F4671',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, max-content)',
      justifyContent: 'space-between',
      rowGap: '48px',
      padding: '35px 32px 76px',
    },
    '& .dropdownItem': {
      padding: '0',
      textAlign: 'left',
      fontFamily: "'Poppins', sans-serif",
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '22px',
      color: '#FFFFFF',
      textDecoration: 'none',
      cursor: 'pointer',
      whiteSpace: 'pre-line',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& .dropdownItem a': {
      display: 'inline-block',
      padding: '0',
    },
    '& .dropdownItemButton': {
      textTransform: 'none',
      paddingLeft: '20px',
      paddingRight: '20px',
      '&:hover': {
        background: 'transparent',
      },
    },
    '#navbar-dropdown-item-name-logout': {
      maxWidth: '200px',
    },
  },
  styledLoginLink: {
    color: '#007BBD !important',
    textAlign: 'right',
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
    letterSpacing: '0.42px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    padding: '10px 0',
    marginBottom: '4.5px',
    marginRight: '32px',
  },
  invisible: {
    visibility: 'hidden',
  },
};

const NavBar = ({ config, endComponent, classes }) => {
  const { HeaderLinks, HeaderSubLinks } = config || {};
  const [clickedTitle, setClickedTitle] = useState('');
  const dropdownSelection = useRef(null);

  const clickableObject = HeaderLinks.filter(
    (item) => item.className === 'navMobileItem clickable',
  );
  const clickableTitle = clickableObject.map((item) => item.name);

  const handleMenuClick = (e) => {
    if (
      e.target.textContent === clickedTitle
      || !clickableTitle.includes(e.target.textContent)
    ) {
      setClickedTitle('');
    } else {
      setClickedTitle(e.target.textContent);
    }
  };

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      handleMenuClick(e);
    }
  };

  const shouldBeUnderlined = (item) => {
    const linkName = item.name;
    const correctPath = window.location.hash.slice(1);
    if (item.className === 'navMobileItem') {
      return correctPath === item.link;
    }
    if (HeaderSubLinks[linkName] === undefined) {
      return false;
    }
    const linkNames = Object.values(HeaderSubLinks[linkName]).map(
      (e) => e.link,
    );
    return linkNames.includes(correctPath);
  };

  const useOutsideAlerter = (ref1) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          !event.target
          || (event.target.getAttribute('class') !== 'dropdownList'
            && ref1.current
            && !ref1.current.contains(event.target))
        ) {
          const toggle = document.getElementsByClassName('navText clicked');
          if (
            toggle[0]
            && !event.target.getAttribute('class')?.includes('navText clicked')
          ) {
            const temp = toggle[0];
            temp.click();
          }
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref1]);
  };

  useOutsideAlerter(dropdownSelection);

  useEffect(() => {
    setClickedTitle('');
  }, []);

  return (
    <div className={classes.nav}>
      <div className={classes.navContainer}>
        <ul className={classes.ulContainer}>
          {HeaderLinks.map((navItem) => (
            <li key={navItem.id} className={classes.liSection}>
              {navItem.className === 'navMobileItem' ? (
                <div className="navTitle directLink">
                  <NavLink
                    to={navItem.link}
                    target={
                      navItem.link.startsWith('https://') ? '_blank' : '_self'
                    }
                  >
                    <div
                      id={navItem.id}
                      role="button"
                      tabIndex={0}
                      className={`navText directLink ${
                        shouldBeUnderlined(navItem) ? 'shouldBeUnderlined' : ''
                      }`}
                      onKeyDown={onKeyPressHandler}
                      onClick={handleMenuClick}
                    >
                      {navItem.name}
                    </div>
                  </NavLink>
                </div>
              ) : (
                <div
                  className={
                    clickedTitle === navItem.name
                      ? 'navTitleClicked'
                      : 'navTitle'
                  }
                >
                  <div
                    id={navItem.id}
                    role="button"
                    tabIndex={0}
                    className={`${
                      clickedTitle === navItem.name
                        ? 'navText clicked'
                        : 'navText'
                    } ${
                      shouldBeUnderlined(navItem) ? 'shouldBeUnderlined' : ''
                    }`}
                    onKeyDown={onKeyPressHandler}
                    onClick={handleMenuClick}
                  >
                    {navItem.name}
                  </div>
                </div>
              )}
            </li>
          ))}
          {endComponent && (
            <li className={`${classes.liSection} end-dropdown-li`}>
              {endComponent}
            </li>
          )}
        </ul>
      </div>
      <div
        ref={dropdownSelection}
        className={`${classes.dropdown} ${
          clickedTitle === '' ? classes.invisible : ''
        }`}
      >
        <div className={classes.nameDropdownContainer}>
          <div className="dropdownList">
            {clickedTitle !== ''
              ? HeaderSubLinks[clickedTitle]?.map((dropItem) => {
                if (dropItem.link) {
                  return (
                    <span className="dropdownItem" key={dropItem.id}>
                      {dropItem.link.startsWith('https://')
                        || dropItem.link.endsWith('.pdf') ? (
                          <a
                            target="_blank"
                            id={dropItem.id}
                            href={dropItem.link}
                            rel="noopener noreferrer"
                            className="dropdownItem"
                            onClick={() => setClickedTitle('')}
                          >
                            {dropItem.name}
                            {dropItem.text && (
                              <div className="dropdownItemText">
                                {dropItem.text}
                              </div>
                            )}
                          </a>
                        ) : (
                          <Link
                            target="_self"
                            id={dropItem.id}
                            to={dropItem.link}
                            className="dropdownItem"
                            onClick={() => setClickedTitle('')}
                          >
                            {dropItem.name}
                            {dropItem.text && (
                              <div className="dropdownItemText">
                                {dropItem.text}
                              </div>
                            )}
                          </Link>
                        )}
                    </span>
                  );
                }
                if (dropItem.onClick) {
                  return (
                    <Button
                      id={dropItem.id}
                      key={dropItem.id}
                      className="dropdownItem dropdownItemButton"
                      onClick={dropItem.onClick}
                    >
                      {dropItem.name}
                    </Button>
                  );
                }
                return null;
              })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(NavBar);
