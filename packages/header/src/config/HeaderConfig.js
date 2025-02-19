import Logo from '../assets/Portal_Logo.svg';
import LogoSmall from '../assets/Portal_Logo_Small.svg';
import usaFlagSmall from '../assets/US_Flag_Small.svg';

// globalHeaderLogo image 468x100
// globalHeaderImage: image 2200x100
export const headerData = {
  globalHeaderLogo: Logo,
  globalHeaderLogoSmall: LogoSmall,
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'Portal Logo',
  usaFlagSmall,
  usaFlagSmallAltText: 'usaFlagSmall',
};

export const HeaderLinks = [
  {
    name: 'HOME',
    link: '/',
    id: 'navbar-dropdown-home',
    className: 'navMobileItem',
  },
  {
    name: 'DATA',
    link: '/data',
    id: 'navbar-dropdown-data',
    className: 'navMobileItem',
  },
  {
    name: 'PROGRAMS',
    link: '/programs',
    id: 'navbar-dropdown-programs',
    className: 'navMobileItem',
  },
  {
    name: 'STUDIES',
    link: '/studies',
    id: 'navbar-dropdown-studies',
    className: 'navMobileItem',
  },
  {
    name: 'ABOUT',
    link: '#',
    id: 'navbar-dropdown-about',
    className: 'navMobileItem clickable',
  },
];

export const HeaderSubLinks = {
  ABOUT: [
    {
      name: 'About CDS',
      link: '/cancerDataService',
      id: 'about-cancer-data-service',
      className: 'navMobileSubItem',
    },
    {
      name: 'Submission Requests',
      link: 'https://hub.datacommons.cancer.gov/',
      id: 'about-submission-requests',
      className: 'navMobileSubItem',
    },
    {
      name: 'Data Model',
      link: '/resources',
      id: 'about-resources',
      className: 'navMobileSubItem',
    },
    {
      name: 'Query the CDS Portal Using GraphQL',
      link: '/graphql',
      id: 'about-graphql',
      className: 'navMobileSubItem',
    },
    {
      name: 'CDS Portal - Release Notes',
      link: '/releases',
      id: 'about-releases',
      className: 'navMobileSubItem',
    },
    { // TODO: Fix download link
      name: 'CDS Portal User Guide',
      link: '/download-here',
      id: 'about-user-guide',
      className: 'navMobileSubItem',
    },
  ],
};
