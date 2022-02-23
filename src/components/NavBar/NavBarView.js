import React from 'react';
import { NavBar } from 'bento-components';
// import { useSelector } from 'react-redux';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';
// import Login from './loginButton';
import Login from '../GoogleLogin';

const BentoNavBar = ({ cartFieldIds }) => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      numberOfCases={cartFieldIds.length || 0}
      LoginComponent={Login}
    />
    <Login />
    <div>helo</div>
  </>
);
export default BentoNavBar;
