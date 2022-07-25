const style = () => ({
  profileView: {
    backgroundColor: '#ffffff',
  },
  profile_container: {
    background: '#ffffff',
    margin: '0 auto',
    height: '70vh',
    maxWidth: '80vh',
  },
  profile_header: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    position: 'relative',
  },
  profile_header_container: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    borderBottom: '10px solid #aab2c8',
  },
  profile_header_left: {
    display: 'flex',
  },
  profile_header_icon: {
    height: '120px',
    padding: '0 10px',
  },
  profileIcon: {
    height: '150px',
  },
  profile_header_right: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  profile_header_bottom: {
    height: '30px',
    backgroundColor: '#aab2c8',
    // position: 'absolute',
  },
  profile_header_text: {
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274fa5',
    fontSize: '24pt',
    margin: '30px 0 10px 0',
    lineHeight: '25px',
  },
  profile_body_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '50px 0',
  },
  tableDiv: {
    margin: 'auto',
  },
  btnRequest: {
    textDecoration: 'none',
    backgroundColor: '#5d53f6',
    margin: '10px 500px',
    '&hover btnRequestLink': {
      color: '#000',
    },
    minWidth: '200px',
  },
  btnRequestLink: {
    color: '#ffffff',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontSize: '16px',
    textTransform: 'capitalize',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  splitBodyColumn1: {
    flex: 1,
    flexGrow: 2,
    padding: '10px 30px',
  },
  splitBodyColumn2: {
    flex: 1,
    padding: '10px',
  },
  textField: {
    minWidth: '220px',
    borderBottom: '1px solid #acacac',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLabel: {
    textTransform: 'uppercase',
    flex: 0.5,
    lineHeight: 2,
    padding: '0 10px',
  },
  editIcon: {
    width: '18px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
  },
});

export default style;