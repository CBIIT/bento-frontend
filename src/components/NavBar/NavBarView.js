import React from 'react';
import { useSelector } from 'react-redux';
import { NavBar } from 'bento-components';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';
import Login from '../Auth/loginComponent';
import globalData from '../../bento/siteWideConfig';

const BentoNavBar = ({ cartFieldIds = [] }) => {
  const { enableAuthentication } = globalData;
  const isSignedIn = useSelector((state) => state.login.isSignedIn);

  const getNumberOfCase = () => {
    const { length: numberOfCases } = cartFieldIds;

    if (!enableAuthentication) return numberOfCases;

    return isSignedIn ? numberOfCases : 0;
  };

  const getLoginComponent = () => {
    if (!enableAuthentication) return undefined;
    return Login;
  };

  return (
    <>
      <NavBar
        navBarData={navBarData}
        navBarCartData={navBarCartData}
        navBarstyling={navBarstyling}
        numberOfCases={getNumberOfCase()}
        LoginComponent={getLoginComponent()}
      />
    </>
  );
};
export default BentoNavBar;
