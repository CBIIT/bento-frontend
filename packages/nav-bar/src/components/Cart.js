/* eslint-disable */
import React from 'react';
import { NavLink, HashRouter } from 'react-router-dom';
import { Box, Tooltip } from '@material-ui/core';

const Cart = ({ classes, navBarCartData, numberOfCases }) => {
  if (!navBarCartData) return null;

  return (
    <Box
      id="button_navbar_mycases"
      className={classes.logotype}
      classes={{ root: classes.buttonRootNoRightPadding }}
    >
      <HashRouter>
        <NavLink className={classes.cartLabelText} to={navBarCartData.cartLink}>
          <Tooltip title="Files" placement="bottom-end">
            <div className={classes.cartWrapper}>
              <img
                className={classes.cartIcon}
                src={navBarCartData.cartIcon}
                alt={navBarCartData.cartIconAlt}
              />
              <div className={classes.cartTextWrapper}>
                <span className={classes.cartCount}>{numberOfCases}</span>
                <span className={classes.cartLabel}>Files</span>
              </div>
            </div>
          </Tooltip>
        </NavLink>
      </HashRouter>
    </Box>
  );
};

export default Cart;
