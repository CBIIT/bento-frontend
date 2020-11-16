import React from 'react';
import { NavBar } from 'bento-components';
// import { useSelector } from 'react-redux';
import {
  navBarData, navBarCartData, navBarstyling,
} from '../../bento/navigationBarData';

// const numberOfCases = useSelector((state) => {
//   if (state.cart.fileIds) {
//     return state.cart.fileIds.length;
//   }
//   return 0;
// });

const BentoNavBar = () => (
  <>
    <NavBar
      navBarData={navBarData}
      navBarCartData={navBarCartData}
      navBarstyling={navBarstyling}
      // numberOfCases={numberOfCases}
    />
  </>
);
export default BentoNavBar;
