import gql from 'graphql-tag';

export const landingPageData = {
  heroHeaderTitle: 'Yours Tagline Here Up to 2-3 lines',
  heroHeaderDescription: 'ABC Data Source believes in the value of sharing and exploring data together for the benefit of the research community. Up to 150 Characters Limit.',
  exploreCallToActionButtonText: 'explore the site',
  exploreCallToActionLink: '/cases',
  hero: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/LP/src/assets/landing/Hero_Graphic.png',
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
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/LP/src/assets/landing/Box.About_Image.png',
    cardTitleText: 'About Your Data Commons',
    cardDescriptionText: 'Up to 460 Character Limitsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id. Excepteur laborum.',
    cardCallToActionText: 'random text',
    cardCallToActionLink: '/trials',
  },
  tile2: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/LP/src/assets/landing/Box.Analytics-image.png',
    cardTitleText: 'Programs',
    cardDescriptionText: 'It is a long established fact that',
    cardCallToActionText: 'a reader',
    cardCallToActionLink: '/request-access',
  },
  tile3: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/LP/src/assets/landing/Box.Prgm-image.png',
    cardTitleText: 'Analytics',
    cardDescriptionText: 'distracted by the readable content of a page',
    cardCallToActionText: 'when looking',
    cardCallToActionLink: '/model',
  },
  tile4: {
    alt: 'Alt tag1',
    img: 'https://raw.githubusercontent.com/CBIIT/bento-frontend/LP/src/assets/landing/Box.Cases-image.png',
    cardTitleText: 'Cases',
    cardDescriptionText: 'layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is',
    cardCallToActionText: 'that it',
    cardCallToActionLink: '/purpose',
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
