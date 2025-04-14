export default () => ({
  sliderRoot: {
    marginTop: '10px',
    marginLeft: '20px',
    marginRight: 'Auto',
    paddingRight: '20px',
  },
  minValue: {
    fontFamily: 'Nunito',
    fontSize: '15px',
    color: '#000000',
    marginBottom: '0px',
    float: 'left',
    width: '75px',
    display: 'flex',
  },
  maxValue: {
    fontFamily: 'Nunito',
    fontSize: '15px',
    color: '#000000',
    float: 'right',
    marginBottom: '0px',
    display: 'flex',
  },
  rail: {
    borderRadius: 4,
    height: 6,
    background: '#142D64',
  },
  minInputLabel: {
    float: 'left',
    lineHeight: '34px',
    marginRight: '5px',
  },
  maxInputLabel: {
    float: 'left',
    lineHeight: '34px',
    marginRight: '5px',
  },
  thumb: {
    height: 16,
    width: 16,
    background: '#10A075',
  },
  invalidThumb: {
    height: 16,
    width: 16,
    background: '#F44336',
  },
  track: {
    borderRadius: 4,
    height: 6,
    background: '#10A075',
    '&~&': {
      background: '#142D64',
    },
  },
  invalidTrack: {
    borderRadius: 4,
    height: 6,
    background: '#F44336',
    '&~&': {
      background: '#142D64',
    },
  },
  upperBound: {
    fontFamily: 'Nunito',
    fontSize: '11px',
    color: '#000000',
    float: 'right',
    marginLeft: 'Auto',
    marginRight: 'Auto',
    marginBottom: '15px',
  },
  lowerBound: {
    fontFamily: 'Nunito',
    fontSize: '11px',
    color: '#000000',
    float: 'left',
    marginLeft: 'Auto',
    marginRight: 'Auto',
    marginBottom: '15px',
  },
  sliderText: {
    color: '#10a075',
    lineHeight: '120%',
    fontFamily: 'Nunito',
    fontSize: '14px',
    padding: '5px 15px 5px 0px',
    width: '100%',
    textAlign: 'right',
    background: '#f5fdee',
    marginTop: '10px',
  },
  invalidSliderText: {
    color: '#D32F2F',
    lineHeight: '120%',
    fontFamily: 'Nunito',
    fontSize: '14px',
    padding: '5px 15px 5px 0px',
    width: '100%',
    textAlign: 'right',
    background: '#E57373',
    marginTop: '10px',
  },
  sliderListItem: {
    height: '15px',
  },
  listItemGutters: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 5px 2px 8px',
  },
  lowerUpperBound: {
    height: '15px',
  },
});
