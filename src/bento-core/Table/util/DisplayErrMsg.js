import { Container, withStyles } from '@material-ui/core';
import React from 'react';

const DisplayErr = ({
  classes,
  table,
}) => {
  const { tableMsg } = table;
  return (
    <Container className={classes.container}>
      {tableMsg && tableMsg.noMatch}
    </Container>
  );
};

const styles = () => ({
  container: {
    textAlign: 'center',
    height: '40px',
    paddingTop: '10px',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '500',
    color: '#4a4a4a',
    lineHeight: '1.5',
    letterSpacing: '0.00938em',
  },
});

export default withStyles(styles)(DisplayErr);
