/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useOutsideClick } from './hooks/useOutsideClick';
import NavBarDropdown from './components/NavbarDropdown';
import Cart from './components/Cart';
import styles from './components/Navbar.styles';

const NavBar = ({
  config,
  endComponent,
  classes,
  navBarCartData,
  LoginComponent,
  numberOfCases,
}) => {
  const { HeaderLinks = [], HeaderSubLinks = {} } = config || {};
  const [clickedTitle, setClickedTitle] = useState('');
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setClickedTitle(''));

  useEffect(() => {
    setClickedTitle('');
  }, []);

  return (
    <div className={classes.nav}>
      <div className={classes.navContainer}>
        <ul className={classes.ulContainer}>
          {HeaderLinks.map((navItem) => (
            <li key={navItem.id} className={classes.liSection}>
              <div
                className={
                  clickedTitle === navItem.name ? 'navTitleClicked' : 'navTitle'
                }
              >
                <div
                  id={navItem.id}
                  role="button"
                  tabIndex={0}
                  className={
                    clickedTitle === navItem.name
                      ? 'navText clicked'
                      : 'navText'
                  }
                  onClick={() => setClickedTitle(
                    clickedTitle === navItem.name ? '' : navItem.name,
                  )}
                >
                  {navItem.name}
                </div>
              </div>
            </li>
          ))}
          {endComponent && (
            <li className={`${classes.liSection} end-dropdown-li`}>
              {LoginComponent && <LoginComponent />}
              <Cart
                classes={classes}
                navBarCartData={navBarCartData}
                numberOfCases={numberOfCases}
              />
            </li>
          )}
        </ul>
      </div>

      <div ref={dropdownRef}>
        <NavBarDropdown
          clickedTitle={clickedTitle}
          HeaderSubLinks={HeaderSubLinks}
          setClickedTitle={setClickedTitle}
          classes={classes}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(NavBar);
