/* eslint-disable */

import React from 'react';
import { Header } from 'bento-components';
import headerData from '../../bento/headerData';

// import nihLogo from '../../assets/header/icdc_nih_logo.svg';

const ICDCHeader = () => <><Header logo={headerData.globalHeaderLogo} easter={headerData.globalHeaderImage} alt={headerData.globalHeaderLogoAltText} homeLink={headerData.globalHeaderLogoLink}/></>;
export default ICDCHeader;
