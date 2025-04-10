import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import FooterDesktop from './FooterDesktop';
import FooterTablet from './FooterTablet';
import FooterMobile from './FooterMobile';

const FooterController = ({ data = {} }) => {
  const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const mobile = useMediaQuery('(max-width: 767px)');

  let externalTab = null;
  function handleExternalLinkClick(e, url) {
    e.preventDefault();
    if (!externalTab || externalTab.closed) {
      externalTab = window.open(url, 'footerExternalURL');
    } else {
      externalTab.location.href = url;
      externalTab.focus();
    }
  }

  if (mobile) {
    return <FooterMobile data={data} handleExternalLinkClick={handleExternalLinkClick} />;
  }

  if (tablet) {
    return <FooterTablet data={data} handleExternalLinkClick={handleExternalLinkClick} />;
  }

  return <FooterDesktop data={data} handleExternalLinkClick={handleExternalLinkClick} />;
};

export default FooterController;
