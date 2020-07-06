import gql from 'graphql-tag';

export const landingPageData = {
  callToActionTitle: 'Explore, Analyze, Visualize Clinical Trial Data Sets',
  callToActionButtonText: 'EXPLORE',
  callToActionLink: '/cases',
  landingPageHero: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/Hero_Graphic.png',
  },
  landingPageStatsBar: [
    {
      statTitle: 'Programs',
      statAPI: 'numberOfPrograms',
    },
    {
      statTitle: 'Studies',
      statAPI: 'numberOfStudies',
    },
    {
      statTitle: 'Cases',
      statAPI: 'numberOfSubjects',
    },
    {
      statTitle: 'samples',
      statAPI: 'numberOfSamples',
    },
    {
      statTitle: 'files',
      statAPI: 'numberOfFiles',
    },
  ],
  tile1: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/aboutImage.png',
    titleText: 'About Bento',
    descriptionText: 'Effective data management is key to scientific discovery. Bento is an open source framework, developed by the Frederick National Laboratory for Cancer Research, to support the creation of data sharing platforms, that adhere to the FAIR principles of scientific data management.',
    callToActionText: 'Read More',
    callToActionLink: '/purpose', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/prgmImage.png',
    titleText: 'Programs',
    descriptionText: 'This data sharing platform has been built using the Bento framework. It provides access to data from the TAILORx clinical trial.',
    callToActionText: 'More',
    callToActionLink: '/trials', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/analyticsImage.png',
    titleText: 'Resources',
    descriptionText: 'The Bento team has developed a suite of software components to help you build your own data sharing platform.',
    callToActionText: 'Read More',
    callToActionLink: '/purpose', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/casesImage.png',
    titleText: 'Cases',
    descriptionText: 'Analyze data from the TailoRx clinical trial.',
    callToActionText: 'Explore',
    callToActionLink: '/cases', // This links to the cases dashboard.
  },
};

export const landingPageQuery = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;
