import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import FooterDesktop from './FooterDesktop';
import FooterTablet from './FooterTablet';
import FooterMobile from './FooterMobile';

const FooterController = ({ data = {} }) => {
  const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const mobile = useMediaQuery('(max-width: 767px)');

  if (mobile) {
    return <FooterMobile data={data} />;
  }

  if (tablet) {
    return <FooterTablet data={data} />;
  }

  return <FooterDesktop data={data} />;
};

export default FooterController;
