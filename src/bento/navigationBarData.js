export default [
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
    dropDonwLinks: [
      {
        labelText: 'purpose',
        link: '/purpose',
      },
      {
        labelText: 'crdc & analysis',
        link: '/crdc',
      },
      {
        labelText: 'support',
        link: '/support',
      },
      {
        labelText: 'developers',
        link: '/developers',
      },
    ],
  },
];
