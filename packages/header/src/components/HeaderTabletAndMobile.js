import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Logo from './LogoMobile';
import menuClearIcon from '../assets/Menu_Cancel_Icon.svg';
import rightArrowIcon from '../assets/Right_Arrow.svg';
import leftArrowIcon from '../assets/Left_Arrow.svg';

const styles = () => ({
  headerBanner: {
    width: '100%',
  },
  headerContainer: {
    margin: '0 auto',
    paddingLeft: '16px',
    paddingRight: '16px',
    boxShadow: '-0.1px 6px 9px -6px rgba(0, 0, 0, 0.5)',
    '& .headerLowerContainer': {
      display: 'flex',
      margin: '16px 0 4px 0',
      height: '51px',
    },
    '& .menuButton': {
      width: '89px',
      height: '45px',
      background: '#1F4671',
      borderRadius: '5px',
      fontFamily: 'Open Sans',
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '45px',
      color: '#FFFFFF',
      textAlign: 'center',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  navMobileContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 1200,
  },
  menuArea: {
    height: '100%',
    width: '100%',
    display: 'flex',
    '& .menuContainer': {
      background: '#ffffff',
      width: '300px',
      height: '100%',
      padding: '21px 16px',
    },
    '& .greyContainer': {
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,.2)',
    },
    '& .closeIcon': {
      height: '14px',
      marginBottom: '29px',
    },
    '& .closeIconImg': {
      float: 'right',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    '& .backButton': {
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '16px',
      color: '#007BBD',
      paddingLeft: '16px',
      background: `url(${leftArrowIcon}) left no-repeat`,
      '&:hover': {
        cursor: 'pointer',
      },
    },
    '& .navMobileContainer': {
      padding: '24px 0 0 0',
      '& a': {
        textDecoration: 'none',
        color: '#3D4551',
      },
    },
    '& .navMobileItem': {
      width: '268px',
      padding: '8px 24px 8px 16px',
      fontFamily: 'Open Sans',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '16px',
      borderTop: '1px solid #F0F0F0',
      borderBottom: '1px solid #F0F0F0',
      color: '#3D4551',
      '&:hover': {
        backgroundColor: '#f9f9f7',
      },
    },
    '& .SubItem': {
      paddingLeft: '24px',
    },
    '& .clickable': {
      background: `url(${rightArrowIcon}) 90% no-repeat`,
      cursor: 'pointer',
    },
    '& .action': {
      cursor: 'pointer',
    },
    '& .endComponent': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  },
});

const Header = ({
  config = {}, endComponent, SearchComponent, classes,
}) => {
  const { HeaderLinks, HeaderSubLinks } = config || {};
  const [navMobileDisplay, setNavMobileDisplay] = useState('none');
  const [selectedList, setSelectedList] = useState(HeaderLinks);

  const clickNavItem = (e) => {
    const clickTitle = e.target.textContent;
    setSelectedList(HeaderSubLinks[clickTitle]);
  };

  return (
    <>
      <div
        className={classes.headerBanner}
        data-testid="navigation-header-mobile"
      >
        <div className={classes.headerContainer}>
          <Logo headerData={config.headerData} />
          <div className="headerLowerContainer">
            <div
              role="button"
              id="header-navbar-open-menu-button"
              tabIndex={0}
              className="menuButton"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setNavMobileDisplay('block');
                }
              }}
              onClick={() => setNavMobileDisplay('block')}
            >
              Menu
            </div>

            {SearchComponent}
          </div>
        </div>
      </div>
      <div
        className={classes.navMobileContainer}
        style={{ display: navMobileDisplay }}
      >
        <div className={classes.menuArea}>
          <div className="menuContainer">
            <div
              role="button"
              id="navbar-close-navbar-button"
              tabIndex={0}
              className="closeIcon"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setNavMobileDisplay('none');
                }
              }}
              onClick={() => setNavMobileDisplay('none')}
            >
              <img
                className="closeIconImg"
                src={menuClearIcon}
                alt="menuClearButton"
              />
            </div>
            {selectedList !== HeaderLinks && (
              <div
                role="button"
                id="navbar-back-to-main-menu-button"
                tabIndex={0}
                className="backButton"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedList(HeaderLinks);
                  }
                }}
                onClick={() => setSelectedList(HeaderLinks)}
              >
                Main Menu
              </div>
            )}
            <div className="navMobileContainer">
              {selectedList
                && selectedList.map((navMobileItem) => (
                  <React.Fragment key={`mobile_${navMobileItem.id}`}>
                    {navMobileItem.className === 'navMobileItem' && (
                      <NavLink
                        id={navMobileItem.id}
                        to={navMobileItem.link}
                        target={
                          navMobileItem.link.startsWith('https://')
                            ? '_blank'
                            : '_self'
                        }
                        onClick={() => setNavMobileDisplay('none')}
                      >
                        <div className="navMobileItem">
                          {navMobileItem.name}
                        </div>
                      </NavLink>
                    )}
                    {navMobileItem.className === 'navMobileItem clickable' && (
                      <div
                        id={navMobileItem.id}
                        role="button"
                        tabIndex={0}
                        className="navMobileItem clickable"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            clickNavItem(e);
                          }
                        }}
                        onClick={clickNavItem}
                      >
                        {navMobileItem.name}
                      </div>
                    )}
                    {(navMobileItem.className === 'navMobileSubItem action'
                    && 'onClick' in navMobileItem
                    && typeof navMobileItem.onClick === 'function') ? (
                      <div
                        id={navMobileItem.id}
                        role="button"
                        tabIndex={0}
                        className="navMobileItem SubItem action"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            navMobileItem.onClick();
                          }
                        }}
                        onClick={() => navMobileItem.onClick()}
                      >
                        {navMobileItem.name}
                      </div>
                      ) : null}
                    {navMobileItem.className === 'navMobileSubItem' && (
                      <a
                        id={navMobileItem.id}
                        href={navMobileItem.link}
                        rel="noopener noreferrer"
                        target={
                          navMobileItem.link.startsWith('https://')
                          || navMobileItem.link.endsWith('.pdf')
                            ? '_blank'
                            : '_self'
                        }
                      >
                        <div
                          role="button"
                          tabIndex={0}
                          className="navMobileItem SubItem"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setNavMobileDisplay('none');
                            }
                          }}
                          onClick={() => {
                            setNavMobileDisplay('none');
                          }}
                        >
                          {navMobileItem.name}
                        </div>
                      </a>
                    )}
                    {navMobileItem.className === 'navMobileSubTitle' && (
                      <div className="navMobileItem">{navMobileItem.name}</div>
                    )}
                  </React.Fragment>
                ))}

              {endComponent && selectedList === HeaderLinks && (
                <div
                  className={`${classes.endComponentWrapper} navMobileItem endComponent`}
                  onClick={() => setNavMobileDisplay('none')}
                >
                  {endComponent}
                </div>
              )}
            </div>
          </div>
          <div
            role="button"
            id="navbar-close-navbar-grey-section"
            tabIndex={0}
            className="greyContainer"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setNavMobileDisplay('none');
              }
            }}
            onClick={() => setNavMobileDisplay('none')}
            aria-label="greyContainer"
          />
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Header);
