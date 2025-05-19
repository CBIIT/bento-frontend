import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Button,
  Grid,
  withStyles,
} from '@material-ui/core';
import NavbarLink from './NavbarLink';

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
    paddingLeft: '15px',
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
    backgroundColor: '#004971',
    display: 'block',
    left: 0,
    paddingTop: '35px',
    paddingBottom: '12px',
    position: 'absolute',
    right: 0,
    width: '100%',
    zIndex: 400,
  },
  nameDropdownContainer: {
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    maxWidth: '1400px',
    padding: '0 16px',
    '& .dropdownList': {
      padding: 0,
      marginTop: 0,
      marginBottom: '45px',
      listStyle: 'none',
    },
    '& .gridItem': {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    '& .dropdownListItem': {
      padding: 0,
      margin: 0,
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
    '& a.dropdownItem': {
      display: 'inline-block',
      padding: '0',
    },
    '& .dropdownItem.dropdownTitle': {
      cursor: 'auto',
      '&:hover': {
        textDecoration: 'none',
      },
      '& .dropdownSubItemList': {
        padding: 0,
        margin: 0,
        listStyleType: 'none',
        marginTop: '5px',
      },
      '& .dropdownSubItem': {
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: 400,
        fontSize: '16px',
        color: '#FFFFFF',
        textDecoration: 'none',
        display: 'inline',
        alignItems: 'center',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
    '& .dropdownSubIcon': {
      display: 'inline',
      marginLeft: '7px',
      verticalAlign: 'middle',
    },
    '& .dropdownItemButton': {
      textTransform: 'none',
      paddingLeft: 0,
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

const PDFDownloadIconSvg = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="dropdownSubIcon" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_504_1311)">
      <path
        d="M12.537 5.66293C12.2568 5.32585 11.7665 5.32585 11.4163 5.59551L9.52529 7.41574V2.83147C9.52529 2.76405 9.52529 2.76405 9.52529 2.69664C9.45526 2.35956 9.10506 2.0899 8.75487 2.15731C8.40467 2.22473 8.12452 2.56181 8.19455 2.89888V7.48315L6.23347 5.59551C6.16343 5.5281 6.16343 5.46068 6.09339 5.46068C5.74319 5.19102 5.25292 5.25843 4.97276 5.59551C4.69261 5.93259 4.76265 6.4045 5.11284 6.67416L8.26459 9.70787C8.40467 9.8427 8.61479 9.91012 8.82491 9.91012C9.03502 9.91012 9.24514 9.8427 9.38522 9.70787L12.537 6.67416C12.8171 6.4045 12.8171 5.93259 12.537 5.66293Z"
        fill="white"
      />
      <path
        d="M13.4475 12.3371C13.5175 12.3371 13.5875 12.3371 13.5875 12.2697C13.6576 12.2697 13.7276 12.2697 13.7977 12.2023C13.8677 12.1348 13.9377 12.0674 13.9377 11.9326C13.9377 11.7978 13.8677 11.7304 13.7977 11.6629C13.7276 11.5955 13.5875 11.5955 13.4475 11.5955H11.6265C11.5564 11.5955 11.4163 11.5955 11.3463 11.6629C11.2763 11.7304 11.2062 11.7978 11.1362 11.8652C11.0661 11.9326 11.0661 12 11.0661 12.1348V12.2023V14.9663V15.0337C11.0661 15.1686 11.1362 15.3034 11.2062 15.3708C11.2763 15.4382 11.3463 15.5056 11.4864 15.5056C11.4864 15.5056 11.4864 15.5056 11.5564 15.5056C11.6965 15.5056 11.8366 15.5056 11.9066 15.236C11.9767 15.1686 12.0467 15.0337 12.0467 14.8315V13.8202H13.1673C13.3074 13.8202 13.3774 13.8202 13.4475 13.7528C13.5175 13.6854 13.5175 13.6854 13.5175 13.618H13.5875C13.6576 13.5506 13.7276 13.4832 13.7276 13.3483C13.7276 13.2135 13.6576 13.1461 13.5875 13.0787C13.5175 13.0112 13.3774 13.0112 13.2374 13.0112H12.0467V12.3371H13.4475Z"
        fill="white"
      />
      <path
        d="M6.58366 12.2697C6.51362 12.0674 6.44359 12 6.30351 11.8652C6.16343 11.7978 6.02335 11.7304 5.88327 11.6629C5.7432 11.5955 5.46304 11.5955 5.18289 11.5955H4.20234C3.99222 11.5955 3.85215 11.6629 3.78211 11.7304C3.71207 11.7978 3.64203 11.9326 3.64203 12.1348V14.9663C3.64203 15.1686 3.71207 15.3034 3.78211 15.3708C3.85215 15.4382 3.99222 15.5056 4.1323 15.5056C4.27238 15.5056 4.41246 15.5056 4.4825 15.3034C4.55253 15.1686 4.62257 15.0337 4.62257 14.8989V13.9551H5.11285H5.25292C5.67316 13.9551 6.09339 13.7528 6.30351 13.618C6.51362 13.4832 6.6537 13.1461 6.6537 12.809C6.6537 12.809 6.6537 12.809 6.6537 12.7416C6.6537 12.6068 6.6537 12.4045 6.58366 12.2697ZM5.7432 12.8764C5.7432 13.0113 5.7432 13.0787 5.67316 13.1461C5.67316 13.2135 5.53308 13.2809 5.46304 13.2809C5.32296 13.3483 5.18288 13.3483 5.04281 13.3483H4.62257V12.4045H4.97277C5.393 12.4045 5.53308 12.4719 5.60312 12.5393C5.67316 12.6068 5.7432 12.7416 5.7432 12.8764Z"
        fill="white"
      />
      <path
        d="M9.38523 11.6629C9.17511 11.5955 8.96499 11.5955 8.68484 11.5955H7.70429C7.49418 11.5955 7.3541 11.6629 7.28406 11.7304C7.21402 11.7978 7.14398 11.9326 7.14398 12.1348V14.8315C7.14398 14.9663 7.21402 15.1011 7.21402 15.1686C7.21402 15.236 7.28406 15.236 7.3541 15.3034L7.42414 15.3708C7.49418 15.4382 7.63425 15.4382 7.77433 15.4382H8.75488C8.96499 15.4382 9.10507 15.4382 9.17511 15.3708C9.31519 15.3034 9.45527 15.3034 9.59534 15.236C9.73542 15.236 9.80546 15.1011 9.94554 15.0337C10.0856 14.8989 10.2257 14.7641 10.2957 14.6292C10.3658 14.427 10.4358 14.2921 10.5058 14.0899C10.5759 13.8877 10.5759 13.6854 10.5759 13.4832C10.5759 12.809 10.3658 12.2697 9.94554 11.9326C9.73542 11.7978 9.59534 11.7304 9.38523 11.6629ZM9.59534 13.5506C9.59534 14.0225 9.45527 14.3596 9.24515 14.5618C9.24515 14.5618 9.17511 14.6292 9.10507 14.6292C9.03503 14.6966 8.96499 14.6966 8.89495 14.6966C8.82492 14.6966 8.75488 14.6966 8.6148 14.6966H8.12453V12.4045H8.54476C8.75488 12.4045 8.96499 12.4045 9.10507 12.4719C9.24515 12.5393 9.38523 12.6742 9.45527 12.809C9.52531 12.9438 9.59534 13.2135 9.59534 13.5506Z"
        fill="white"
      />
    </g>
    <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="white" />
    <defs>
      <clipPath id="clip0_504_1311">
        <rect width="18" height="18" rx="4" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

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

    if (clickedTitle === linkName) {
      return false;
    }
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
          || (event.target.getAttribute('class') !== 'dropdownListWrapper'
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
        <div className="dropdownListWrapper">
          <Grid container className={classes.nameDropdownContainer}>
            {clickedTitle !== ''
              ? HeaderSubLinks[clickedTitle]?.map((dropItem) => {
                if (dropItem.link) {
                  return (
                    <Grid item xs={3} key={dropItem.id} className="gridItem">
                      <ul className="dropdownList">
                        <li className="dropdownListItem">
                          <NavbarLink item={dropItem} onItemClick={() => setClickedTitle('')} />
                        </li>
                      </ul>
                    </Grid>
                  );
                }
                if (dropItem.onClick) {
                  return (
                    <Grid item xs={3} key={dropItem.id} className="gridItem">
                      <ul className="dropdownList">
                        <li className="dropdownListItem">
                          <Button
                            id={dropItem.id}
                            key={dropItem.id}
                            className="dropdownItem dropdownItemButton"
                            onClick={dropItem.onClick}
                          >
                            {dropItem.name}
                          </Button>
                        </li>
                      </ul>
                    </Grid>
                  );
                }

                if (dropItem?.items?.length > 0) {
                  return (
                    <Grid item xs={3} key={dropItem.id} className="gridItem">
                      <ul className="dropdownList">
                        <li className="dropdownListItem">
                          <div
                            id={dropItem.id}
                            className="dropdownItem dropdownTitle"
                          >
                            {dropItem.name}
                            <ul className="dropdownSubItemList">
                              {dropItem?.items?.map((item) => (
                                <li key={`dropdown-sub-item-${item?.id}`}>
                                  <NavbarLink
                                    item={item}
                                    icon={<PDFDownloadIconSvg />}
                                    className="dropdownSubItem"
                                    onItemClick={() => setClickedTitle('')}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </Grid>
                  );
                }
                return null;
              })
              : null}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(NavBar);
