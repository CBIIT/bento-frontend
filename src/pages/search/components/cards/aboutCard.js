import { Grid, withStyles } from '@material-ui/core';
import React from 'react';

const AboutCard = ({ data, classes }) => {
  const split = data.text.replaceAll('</em>', '<em>');
  // const term = split.match(/<em>(.*)<em>/).pop()
  const results = split.replaceAll('<em>', '');

  return (
    <>
      <Grid item container className={classes.card}>
        <Grid item xs={9}>
          <div className={classes.text}>{results}</div>
        </Grid>
      </Grid>

    </>
  );
};

const styles = () => ({
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  card: {
    padding: '18px',
    borderBottom: '2px solid #E7EEF5',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    paddingLeft: '8px',
    paddingRight: '8px',
    backgroundColor: '#AC32AB',
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(AboutCard);
