/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { useOutsideClick } from './hooks/useOutsideClick';
import NavBarDropdown from './components/NavbarDropdown'
import styles from './components/Navbar.styles';
import Cart from './components/Cart'

const NavBar = ({
  config,
  endComponent,
  classes,
  navBarCartData,
  numberOfCases,
}) => {
  const { HeaderLinks = [], HeaderSubLinks = {} } = config || {};
  const [clickedTitle, setClickedTitle] = useState('');
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setClickedTitle(''));

  useEffect(() => {
    setClickedTitle('');
  }, []);

  const handleMenuClick = (_e, navItem) => {
    if (clickedTitle === navItem.name) {
      setClickedTitle('');
    } else {
      setClickedTitle(navItem.name);
    }
  };

  // ✅ Helper: check if a parent should be underlined when a child is active
  const isParentActive = (parentName) => {
    const currentPath = window.location.hash.slice(1); // ✅ use hash routing
    const subLinks = HeaderSubLinks[parentName];
    if (!subLinks) return false;

    const linkNames = Object.values(subLinks).map((e) => e.link);
    return linkNames.includes(currentPath);
  };

  return (
    <div className={classes.nav}>
      <div className={classes.navContainer}>
        <ul className={classes.ulContainer}>
          {HeaderLinks.map((navItem) => {
            const hasDropdown = !!HeaderSubLinks[navItem.name];

            return (
              <li key={navItem.id} className={classes.liSection}>
                {/* Direct link (no dropdown) */}
                {!hasDropdown ? (
                  <div className="navTitle directLink">
                    <NavLink
                      to={navItem.link}
                      target={
                        navItem.link.startsWith('https://') ? '_blank' : '_self'
                      }
                      activeClassName="active"
                      className="navText directLink"
                      onClick={(e) => handleMenuClick(e, navItem)}
                    >
                      {navItem.name}
                    </NavLink>
                  </div>
                ) : (
                  // Dropdown parent
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
                      className={
                        (clickedTitle === navItem.name
                          ? 'navText clicked'
                          : 'navText') +
                        (isParentActive(navItem.name)
                          ? ' shouldBeUnderlined'
                          : '')
                      }
                      onClick={(e) => handleMenuClick(e, navItem)}
                    >
                      {navItem.name}
                    </div>
                  </div>
                )}
              </li>
            );
          })}

          {endComponent && (
            <li className={`${classes.liSection} end-dropdown-li`}>
              {/* LoginComponent && <LoginComponent /> */}
              <Cart
                classes={classes}
                navBarCartData={navBarCartData}
                numberOfCases={numberOfCases}
              />
            </li>
          )}
        </ul>
      </div>

      {/* ✅ Only render dropdown if clicked item has sublinks */}
      <div ref={dropdownRef}>
        {clickedTitle && HeaderSubLinks[clickedTitle] && (
          <NavBarDropdown
            clickedTitle={clickedTitle}
            HeaderSubLinks={HeaderSubLinks}
            setClickedTitle={setClickedTitle}
            classes={classes}
          />
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(NavBar);
