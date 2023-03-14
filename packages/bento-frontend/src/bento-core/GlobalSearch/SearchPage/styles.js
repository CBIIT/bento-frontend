const styles = () => ({
  allText: {
    marginLeft: '8px',
  },
  subjectTab: {
    color: '#142D64',
  },
  indicator: {
    backgroundColor: '#142D64',
  },
  tabContainter: {
    display: 'flex',
    maxWidth: '840px',
    margin: '0 auto',
  },
  sampleTab: { color: '#142D64' },
  fileTab: { color: '#142D64' },
  programTab: { color: '#142D64' },
  studyTab: { color: '#142D64' },
  dataTab: { color: '#142D64' },
  aboutTab: { color: '#142D64' },
  allTab: { color: '#142D64' },
  searchText: {
    color: '#1479D3',
    fontFamily: 'Lato',
    fontSize: '25px',
  },
  buttonRoot: {
    minWidth: '100px',
    padding: '6px, 28px',
    textTransform: 'none',
  },
  notchedOutline: {

  },
  input: {
    borderRadius: '8px',
    borderColor: '#616161',
    color: '#747474',
    fontFamily: 'Lato',
    fontSize: '25px',

  },
  heroArea: {
    width: '100%',
    height: '167px',
    background: '#D9E8F8',
    marginTop: '-47px',
  },
  autocomplete: {
    margin: '0 auto',
    paddingTop: '57px',
  },
  chipSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px',
    },
  },
  button: {
    borderRadius: '30px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '16px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '32px',
    marginBottom: '32px',
    marginRight: '24px',
    borderWidth: '1px',
    borderColor: 'black',
  },
  bodyContainer: {
    background: '#FFFFFF',
    color: '#000000',
    fontSize: '15px',
    lineHeight: '22px',
  },
  width1100: {
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
  },
  searchItem: {
    minHeight: '100px',
    padding: '16px',
  },

  backdrop: {
    // position: 'absolute',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  },

  filterIcon: {
    height: '0.86rem',
    margin: '0px 16px 0px 6px',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  inputRoot: {
    '& .MuiOutlinedInput-root': {
      background: '#fff',
      '& fieldset': {
        border: '2px solid #747474',
      },
      '&:hover fieldset': {
        border: '2px solid #747474',
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #747474',
      },
    },
  },

  root: {
    '& .MuiAutocomplete-listbox': {
      borderRadius: '8px',
      fontFamily: 'Lato',
      fontSize: '18px',
      color: '#142D64',
      fontWeight: 500,
      border: '2px solid #0088FF',
      padding: '0px',
      background: '#fff',
      '& li': {
        // list item specific styling
        border: '1px solid #D2D2D2',
      },
      '& :hover': {
        color: 'white',
        backgroundColor: '#0088FF',
      },
    },
  },
  searchIcon: {
    height: '22px',
    margin: '0px 6px 0px 6px',
  },
  searchIconSpan: {
    cursor: 'pointer',
    zIndex: 40,
  },
  clearIcon: {
    height: '18px',
    margin: '-8px 4px 0px 19px',
  },
});

export default styles;
