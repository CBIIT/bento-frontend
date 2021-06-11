export const navBarstyling = {
  global: {
    backgroundColor: '#142D64',
    height: '39px',
    padding: '9px 20px 0px 20px',
  },
  dropDownIcon: {
    displayIcon: false,
    fontSize: '18px',
    margin: '0px 0px 0px 0px',
  },
  dropdownMenu: {
    paper: {
      background: '#309EC4',
      width: '200px',
      padding: '5px 18px 18px 18px',
      marginLeft: '15px',
      position: 'absolute',
      marginTop: '-1px',
      borderRadius: '0',
    },
    link: {
      overflowWrap: 'normal',
      textDecoration: 'none',
      color: 'black',
      fontSize: '14px',
      fontWeight: '600',
      lineSpacing: '1px',
      lineHeight: '18px',
      fontFamily: 'Raleway, sans-serif',
      display: 'block',
      marginTop: '10px',
      '&:hover': {
        cursor: 'pointer',
        color: 'white',
      },
    },
  },
};

export const navBarData = [
  // A maximum of 5 nav bar items are allowed
  // A maximum of 9 dropDownLinks items are allowed
  {
    labelText: 'home',
    type: 'link',
    link: '/home',
  },
  {
    labelText: 'programs',
    type: 'link',
    link: '/programs',
  },
  {
    labelText: 'cases',
    type: 'link',
    link: '/cases',
  },
  {
    labelText: 'about',
    type: 'dropdown',
    dropDownLinks: [
      {
        labelText: 'Bento',
        link: '/bento',
      },
      {
        labelText: 'Resources',
        link: '/resources',
      },
      {
        labelText: 'Graphql',
        link: '/graphql',
      },
    ],
  },
];

export const navBarCartData = {
  cartLabel: 'MY Files',
  cartLink: '/fileCentricCart',
  cartIcon: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg',
  cartIconAlt: 'cart_logo',
};
