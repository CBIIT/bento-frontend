import React from 'react';
import { NavBar } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';
import Login from '../GoogleAuth/loginComponent';

const BentoNavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length || 0}
      LoginComponent={Login}
    />
  </>
);
export default BentoNavBar;
