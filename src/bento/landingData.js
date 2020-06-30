import gql from 'graphql-tag';

export const landingPageData = {
  heroHeaderTitle: 'Explore, Analyze, Visualize Clinical Trial Data Sets',
  exploreCallToActionButtonText: 'EXPLORE',
  exploreCallToActionLink: '/cases',
  hero: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/Hero_Graphic.png',
  },
  stats: [
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
    cardTitleText: 'About Bento',
    cardDescriptionText: 'Effective data management is key to scientific discovery. Bento is an open source framework, developed by the Frederick National Laboratory for Cancer Research, to support the creation of data sharing platforms, that adhere to the FAIR principles of scientific data management.',
    cardCallToActionText: 'Read More',
    cardCallToActionLink: '', // This links to the "About" static page.
  },
  tile2: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/prgmImage.png',
    cardTitleText: 'Programs',
    cardDescriptionText: 'This reference implementation of the Bento framework provides access to data from the TailoRx clinical trial.',
    cardCallToActionText: 'More',
    cardCallToActionLink: '/trials', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/analyticsImage.png',
    cardTitleText: 'Resources',
    cardDescriptionText: 'Use Bento to set up your data sharing platform',
    cardCallToActionText: 'Read More',
    cardCallToActionLink: '/purpose', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: '',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/casesImage.png',
    cardTitleText: 'Cases',
    cardDescriptionText: 'Analyze data from the TailoRx clinical trial.',
    cardCallToActionText: 'Explore',
    cardCallToActionLink: '/cases', // This links to the cases dashboard.
  },
};

export const LANDING_QUERY = gql`{
  numberOfPrograms
  numberOfStudies
  numberOfSubjects
  numberOfSamples
  numberOfFiles
  }
  `;
