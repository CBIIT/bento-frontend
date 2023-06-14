const dataAcccessRequestStyle = {
  Container: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Nunito',
  },
  pageTitle: {
    color: '#3974A8',
    fontSize: '27px',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontWeight: '500',
    lineHeight: '40px',
    marginBottom: '10px',
    marginTop: '10px',
  },
  pageTitleUnderline: {
    boxSizing: 'border-box',
    height: '2px',
    width: '474px',
    minWidth: '200px',
    border: '1px solid #88B4DA',
    backgroundColor: '#F2F6FA',
    boxShadow: '-4px 8px 27px 4px rgb(27 28 28 / 9%)',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  brace: {
    flex: 1,
  },
  SummaryBox: {
    boxSizing: 'border-box',
    flexDirection: 'column',
    minWidth: '500px',
    justifyContent: 'center',
    fontFamily: 'Nunito',
    padding: '0 0 0 110px',
    flex: '1.5',
    marginBottom: '20px',
    marginTop: '10px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  column: {
    '&:first-child': {
      flex: '.60',
    },
    flex: 1,
  },
  itemTitles: {
    color: '#708292',
    textTransform: 'uppercase',
    fontFamily: 'Nunito',
    fontWeight: 300,
    fontSize: '12px',
    fontStyle: 'italic',
    letterSpacing: '0',
    lineHeight: '34px',
    flex: 1,
    textAlign: 'left',
    padding: '0 0px 0 0px',
  },
  itemValue: {
    color: '#4F5D69',
    fontFamily: 'Nunito',
    fontSize: '17px',
    fontWeight: '500',
    letterSpacing: '0',
    lineHeight: '34px',
    flex: 1,
  },
  Box: {
    width: '535px',
    boxShadow: '-4px 8px 27px 4px rgba(27,28,28,0.09);',
    border: '#A9C8E3 2px solid',
    borderRadius: '10px',
    margin: '10px 0px',
    padding: '30px 10px 0px 10px !important',
    backgroundColor: '#F2F6FA',
  },
  helperMessage: {
    textAlign: 'center',
    width: '397px',
    color: '#323232',
    fontFamily: 'Nunito',
    fontSize: '14px',
    fontWeight: '300',
    letterSpacing: '0',
    lineHeight: '22px',
    margin: 'auto',
    marginTop: '25px',
  },
  createAccountMessage: {
    marginTop: '4px',
    marginBottom: '18px',
  },
  formButton: {
    height: '45px',
    color: '#FFFFFF',
    backgroundColor: '#5D53F6',
    marginTop: '23px',
    marginBottom: '50px',
    '&:disabled': {
      backgroundColor: '#A7A4F8',
      color: '#FFFFFF',
    },
    '&:hover': {
      backgroundColor: '#5D53F6',
    },
  },
  goToHomeButton: {
  },
  submitButton: {
    width: '139px',
  },
  emptySpace: {
    height: '50px',
  },

  // Page Styles
  inputSelect: {
    boxSizing: 'border-box',
    height: '37px',
    width: '359px',
  },

  inputText: {
    width: '359px',
    border: '1px solid #61A6E6',
    height: '35px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    backgroundColor: '#FFFFFF',
    padding: '0px 0px 0px 15px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  selectMenuItem: {
    paddingTop: '0px',
    paddingRight: '10px',
    paddingBottom: '0px',
  },

  // Styles for inputs
  required: {
    color: '#BC3900',
    marginLeft: '5px',
    fontFamily: 'Lato',
    fontSize: '15px',
    letterSpacing: '-100px',
    lineHeight: '22px',
  },
  formLabel: {
    height: '18px',
    color: '#0467BD',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: 500,
    letterSpacing: '0',
    lineHeight: '22px',
    marginBottom: '10px',
    marginTop: '15px',
  },
  requiredFieldMessage: {
    color: '#BC3900',
    fontFamily: 'Lato',
    fontSize: '15px',
    letterSpacing: '0',
    lineHeight: '22px',
    textAlign: 'center',
  },
  supportEmail: {},

};

export default dataAcccessRequestStyle;
