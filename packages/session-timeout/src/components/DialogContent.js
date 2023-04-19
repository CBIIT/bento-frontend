import {
  withStyles,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';

export default withStyles(() => ({
  root: {
    padding: '51px 75px 10px',
    height: '65px',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '17px',
    fontWeight: '300',
    letterSpacing: '0',
    lineHeight: '24px',
  },
  buttonGroup: {
    textAlign: 'center',
  },
}))(MuiDialogContent);
