/* eslint-disable */
const styles = {
  nav: {
    top: 0,
    left: 0,
    width: '100%',
    background: '#ffffff',
    boxShadow: '0px 4px 8px -4px rgba(0, 0, 0, 0.5)',
    zIndex: 1100,
    position: 'relative',
    '& .dropdownContainer': {
      margin: '0 auto',
      position: 'relative',
      width: '1400px',
    },
    '& .loggedInName': {
      color: '#007BBD',
      textAlign: 'right',
      fontSize: '14px',
      fontFamily: 'Poppins',
      fontWeight: 600,
      letterSpacing: '0.42px',
      textDecoration: 'none',
      textTransform: 'uppercase',
      padding: '10px 0',
      marginBottom: '4.5px',
      marginRight: '40px',
    },
    '& .invisible': {
      visibility: 'hidden',
    },
  },

  // 🔹 Cart styles
  cartWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  cartIcon: {
    width: '30px',
    height: '30px',
    marginRight: '8px',
  },
  cartTextWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    lineHeight: '1.2',
  },
  cartCount: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#122F4B',
  },
  cartLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    color: '#122F4B',
    textTransform: 'uppercase',
  },

  // 🔹 Nav container
  navContainer: {
    margin: '0 0 0 16px',
    height: '60px',
    maxWidth: '100% - 16px',
    textAlign: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    '#navbar-dropdown-name-container': {
      margin: 0,
    },
  },

  // 🔹 UL container
  ulContainer: {
    listStyle: 'none',
    margin: 0,
    paddingTop: '17px',
    paddingLeft: '15px',
    display: 'flex',
    width: '100%',
    position: 'relative',
  },

  // 🔹 LI section
  liSection: {
    display: 'inline-block',
    position: 'relative',
    lineHeight: '48px',
    letterSpacing: '1px',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
    '& a': {
      color: '#585C65',
      textDecoration: 'none',
    },
    '&.end-dropdown-li': {
      marginLeft: 'auto',
      marginRight: '44px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    '&.login-button': {
      lineHeight: '48px',
    },

    // 🔹 Active/Clicked state
    '& .clicked': {
      color: '#FFFFFF !important',
      background: '#1F4671',
    },

    // 🔹 Nav title wrapper
    '& .navTitle': {
      display: 'block',
      color: '#585C65',
      fontFamily: 'Poppins',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '40px',
      margin: '0 5px',
      padding: '0 8px',
      userSelect: 'none',
    },

    // 🔹 Nav text (with dropdown arrow)
    '& .navText': {
      fontFamily: "'Poppins', sans-serif",
      color: '#585C65',
      fontWeight: 600,
      fontSize: '16px',
      borderBottom: '4px solid transparent',
      width: 'fit-content',
      margin: 'auto',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      paddingRight: '12px',
      transition: 'color 0.3s ease, border-bottom 0.3s ease',

      '&:hover': {
        cursor: 'pointer',
        color: '#3A75BD',
        borderBottom: '4px solid #3A75BD',
      },

      '&::after': {
        content: '""',
        display: 'inline-block',
        width: '6px',
        height: '6px',
        borderBottom: '2px solid currentColor',
        borderLeft: '2px solid currentColor',
        marginLeft: '6px',
        transform: 'rotate(-45deg)',
        transition: 'transform 0.3s ease',
      },
    },

    // 🔹 When dropdown is open (clicked) → rotate arrow
    '& .navText.clicked': {
      '&::after': {
        transform: 'rotate(135deg)',
      },
    },

    // 🔹 Direct links (no dropdown) → hide arrow
    '& .navText.directLink::after': {
      display: 'none',
    },

    // 🔹 Underlined state
    '& .shouldBeUnderlined': {
      borderBottom: '4px solid #3A75BD !important',
    },

    // 🔹 Clicked nav title
    '& .navTitleClicked': {
      display: 'block',
      color: '#FFFFFF',
      fontFamily: 'Poppins',
      fontSize: '17px',
      fontWeight: 600,
      lineHeight: '40px',
      background: '#1F4671',
      borderTop: '4px solid #5786FF',
      borderLeft: '4px solid #5786FF',
      borderRight: '4px solid #5786FF',
      padding: '0 8px',
    },
  },

  // 🔹 Dropdown
  dropdown: {
    backgroundColor: '#004971',
    display: 'block',
    left: 0,
    paddingTop: '35px',
    paddingBottom: '12px',
    position: 'absolute',
    right: 0,
    width: '100%',
    zIndex: 400,
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },

  // 🔹 Hidden dropdown (when not active)
  invisible: {
    visibility: 'hidden',
    opacity: 0,
    transform: 'translateY(-10px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },

  // 🔹 Dropdown container
  nameDropdownContainer: {
    textAlign: 'left',
    position: 'relative',
    maxWidth: '1400px',
    padding: '0 64px 0 16px',
    '& .dropdownList': {
      padding: 0,
      marginTop: 0,
      marginBottom: '45px',
      listStyle: 'none',
    },
    '& .gridItem': {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    '& .dropdownItem': {
      padding: 0,
      textAlign: 'left',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '22px',
      color: '#FFFFFF',
      textDecoration: 'none',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& .dropdownSubItem': {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 400,
      fontSize: '16px',
      color: '#FFFFFF',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  styledLoginLink: {
    color: '#007BBD !important',
    textAlign: 'right',
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginRight: '32px',
  },
};

export default styles;
