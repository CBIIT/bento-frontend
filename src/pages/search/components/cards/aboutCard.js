import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Anchor } from 'bento-components';

const AboutCard = ({ searchText, data, classes }) => {
  const results = data.text.replaceAll('$', '');

  function getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        { parts.map((part, i) => (
          <span id={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#0467BD', fontWeight: 'bold' } : {}}>
            { part }
          </span>
        ))}
        {' '}

      </span>
    );
  }

  return (
    <>
      <Grid item container className={classes.card}>
        <Grid item xs={9}>
          <div>
            <span className={classes.detailContainerHeader}>ABOUT</span>
            {' '}
&nbsp;
            {' '}
            <span className={classes.cardTitle}>{data.title}</span>
          </div>
          <div className={classes.text}>{getHighlightedText(results, searchText)}</div>
          <div><Anchor link={data.page} text={`${window.location.origin}${data.page}`} classes={classes} /></div>
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
  cardTitle: {
    color: '#0083C6',
    fontFamily: 'Nunito Sans',
    fontSize: '16px',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    paddingLeft: '8px',
    paddingRight: '8px',
    backgroundColor: '#ECC28B',
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(AboutCard);
