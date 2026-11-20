export default () => ({
  slider_INPUT_MIN: {
    fontFamily: 'Montserrat',
    fontSize: '13px',
    fontWeight: 500,
    color: '#717171',
    background: '#F0F0F0',
    '& input': {
      width: '65px',
      height: '22px',
      boxSizing: 'border-box',
      padding: '3px 4px',
    },
    '&.Mui-disabled': {
      color: '#BDBDBD',
      background: '#F5F5F5',
      '& input': {
        color: '#BDBDBD',
        cursor: 'not-allowed',
      },
    },
  },
  slider_INPUT_MAX: {
    fontFamily: 'Montserrat',
    fontSize: '13px',
    fontWeight: 500,
    color: '#717171',
    background: '#F0F0F0',
    '& input': {
      width: '65px',
      height: '22px',
      boxSizing: 'border-box',
      padding: '3px 4px',
    },
    '&.Mui-disabled': {
      color: '#BDBDBD',
      background: '#F5F5F5',
      '& input': {
        color: '#BDBDBD',
        cursor: 'not-allowed',
      },
    },
  },
});
