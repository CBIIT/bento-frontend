import React from 'react';
import { useSelector } from 'react-redux';
import { NavBar } from '@bento-core/nav-bar';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';
import Login from '../Auth/loginComponent';
import { enableAuthentication, PUBLIC_ACCESS } from '../../bento/siteWideConfig';
import { accessLevelTypes } from '@bento-core/authentication';
import { GOVERNMENT_WARNING_BANNER } from '../../bento/siteWideConfig';

const BentoNavBar = ({ cartFieldIds = [] }) => {
  const isSignedIn = useSelector((state) => state.login.isSignedIn);
  const { METADATA_ONLY } = accessLevelTypes;

  const getNumberOfCase = () => {
    const { length: numberOfCases } = cartFieldIds;

    if (!enableAuthentication || PUBLIC_ACCESS === METADATA_ONLY) return numberOfCases;

    return isSignedIn ? numberOfCases : 0;
  };

  const getLoginComponent = () => {
    if (!enableAuthentication) return undefined;
    return Login;
  };

  navBarstyling.global.marginTop = GOVERNMENT_WARNING_BANNER ?  '267.578px' : navBarstyling.global.marginTop;

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
