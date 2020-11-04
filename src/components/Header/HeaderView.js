import React from 'react';
import { Header } from 'bento-components';
import headerData from '../../bento/globalHeaderData';

const ICDCHeader = () => (
  <>
    <Header
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
    />
  </>
);
export default ICDCHeader;
