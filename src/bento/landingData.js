import heroImg from '../assets/landing/heroGraphic/heroGraphic1200.png';
import tile1Img from '../assets/landing/About-image.jpg';
import tile2Img from '../assets/landing/Trials-image.jpg';
import tile3Img from '../assets/landing/RequestAccess-LP.jpg';
import tile4Img from '../assets/landing/Cases-LP.jpg';

const landingPageData = {
  exploreText: 'eb sites still in their infancy. Various versions have evolved over the years',
  exploreCallToActionButtonText: 'printing',
  exploreCallToActionLink: '/cases',
  hero: {
    alt: 'Alt tag1',
    img: heroImg,
  },
  stats: [
    {
      statTitle: 'Programs',
      statCount: '23',
    },
    {
      statTitle: 'Arms',
      statCount: '23',
    },
    {
      statTitle: 'cases',
      statCount: '23',
    },
    {
      statTitle: 'samples',
      statCount: '23',
    },
    {
      statTitle: 'files',
      statCount: '23',
    },
  ],
  tile1: {
    alt: 'Alt tag1',
    img: tile1Img,
    cardTitleText: 'is simply dummy text',
    cardDescriptionText: "mply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchange",
    cardCallToActionText: 'random text',
    cardCallToActionLink: '/trials',
  },
  tile2: {
    alt: 'Alt tag1',
    img: tile2Img,
    cardTitleText: 'variations',
    cardDescriptionText: 'It is a long established fact that',
    cardCallToActionText: 'a reader',
    cardCallToActionLink: '/request-access',
  },
  tile3: {
    alt: 'Alt tag1',
    img: tile3Img,
    cardTitleText: 'passages',
    cardDescriptionText: 'distracted by the readable content of a page',
    cardCallToActionText: 'when looking',
    cardCallToActionLink: '/model',
  },
  tile4: {
    alt: 'Alt tag1',
    img: tile4Img,
    cardTitleText: 'Ipsum',
    cardDescriptionText: 'layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is layout. The point of using Lorem Ipsum is',
    cardCallToActionText: 'that it',
    cardCallToActionLink: '/purpose',
  },
};

export default landingPageData;
