import React from 'react';
import { withStyles } from '@material-ui/core';

const message = ({ classes, data }) => (
  <div className={classes.message}>
    <div className={classes.messageTextArea}>{data}</div>
    <div className={classes.arrayIcon}>
      <div className={classes.arrayIconCover} />
      <div className={classes.arrayIconBase} />
    </div>
  </div>
);

const styles = () => ({
  arrayIconBase: {
    width: '0px',
    height: '0px',
    borderTop: '15px solid #03A383',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '20px solid transparent',
  },
  arrayIconCover: {
    position: 'absolute',
    marginTop: '-2px',
    marginLeft: '0.3px',
    width: '0px',
    height: '0px',
    borderTop: '15px solid #fff',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '20px solid transparent',
  },
  messageTextArea: {
    width: '225px',
    minHeight: '50px',
    border: '2px solid #03A383',
    borderRadius: '10px',
    background: '#fff',
    padding: '10px 10px 10px 13px',
    textAlign: 'left',
    color: '#0D4659',
    fontSize: '12px',
  },
  arrayIcon: {
    marginLeft: '192px',
  },
});
export default withStyles(styles, { withTheme: true })(message);
