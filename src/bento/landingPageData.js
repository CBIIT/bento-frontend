import gql from 'graphql-tag';

export const landingPageData = {
  callToActionTitle: 'Yours Tagline Here Up to 2-3 Lines',
  callToActionDescription: 'ABC Data Source believes in the value of sharing and exploring data together for the benefit of the research community. Up to 150 Characters Limit.',
  callToActionButtonText: 'explore the site',
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
      statTitle: 'Subjects',
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
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/aboutImage.png',
    titleText: 'About Your Data Commons',
    descriptionText: 'Up to 460 Character Limitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in cumastera qui officia deserunt mollit anim id. Excepteur laborum.',
    callToActionText: 'read more',
    callToActionLink: '/trials',
  },
  tile2: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/prgmImage.png',
    titleText: 'Programs',
    descriptionText: 'Up to 100 Character Limit. It is a long established fact that',
    callToActionText: 'read more',
    callToActionLink: '/request-access',
  },
  tile3: {
    alt: 'Alt tag1',
    titleText: 'Analytics',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/analyticsImage.png',
    descriptionText: 'Up to 100 Character Limit. distracted by the readable content of a page',
    callToActionText: 'read more',
    callToActionLink: '/model',
  },
  tile4: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/master/src/assets/landing/casesImage.png',
    titleText: 'Cases',
    descriptionText: 'Up to 250 Character Limit. layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is',
    callToActionText: 'explore',
    callToActionLink: '/purpose',
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
