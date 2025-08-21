/* eslint-disable */
const styles = {
  nav: {
    top: 0,
    left: 0,
    height: '60px',
    width: '100%',
    background: '#ffffff',
    boxShadow: '0px 4px 8px -4px rgba(0, 0, 0, 0.5)',
    zIndex: 1100,
    position: 'relative',
  },

  navContainer: {
    margin: '0 16px',        // ✅ restored original
    maxWidth: 'calc(100% - 16px)',      // ✅ restored original
    textAlign: 'left',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    top: '8px',
  },

  ulContainer: {
    listStyle: 'none',
    margin: 0,
    // paddingTop: '17px',
    paddingLeft: '15px',
    display: 'flex',
    width: '100%',
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
      marginRight: '32px',
      display: 'flex',
      alignItems: 'center',
    },

    // 🔹 Nav text
    '& .navText': {
      borderBottom: '4px solid transparent',
      width: 'fit-content',
      margin: 'auto',
      padding: '0 16px',
      lineHeight: '48px',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: '16px',
      color: '#585C65',
      display: 'inline-flex',
      alignItems: 'center',
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
        borderBottom: '1px solid #585C65',
        borderLeft: '1px solid #585C65',
        margin: '0 0 4px 8px',
        transform: 'rotate(-45deg)',
      },
    },

    // 🔹 Direct links → no arrow
    '& .navText.directLink::after': {
      display: 'none',
    },

    // 🔹 Direct links → underline persists when active
    '& .navText.directLink.active': {
      borderBottom: '4px solid #3A75BD',
      color: '#3A75BD',
    },

    // 🔹 Dropdown open → rotate arrow, no underline
    '& .navText.clicked': {
      borderBottom: '4px solid transparent',
      color: '#FFFFFF !important',
      '&::after': {
        transform: 'rotate(135deg)',
      },
    },

    // 🔹 Dropdown parents → underline when a child is active
    '& .shouldBeUnderlined': {
      borderBottom: '4px solid #3A75BD !important',
      color: '#3A75BD !important',
    },

    // 🔹 Dropdown parents clicked → background highlight
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
    },
  },

  dropdown: {
    backgroundColor: '#004971',
    display: 'block',
    left: 0,
    paddingTop: '35px',
    paddingBottom: '12px',
    position: 'absolute',
    top: '59px',
    right: 0,
    width: '100%',
    zIndex: 400,
  },

  nameDropdownContainer: {
    margin: '0 auto',
    textAlign: 'left',
    position: 'relative',
    maxWidth: '1400px',
    padding: '0 16px',
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
};

export default styles;
