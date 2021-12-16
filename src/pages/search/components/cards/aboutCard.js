import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Anchor } from 'bento-components';

const AboutCard = ({
  searchText, data, classes, index,
}) => {
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
        <Grid item xs={1} className={classes.indexContainer}>
          {index + 1 }
        </Grid>
        <Grid item xs={11} className={classes.propertyContainer}>
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
  indexContainer: {
    padding: '18px',
    fontFamily: 'Nunito',
    color: '#747474',
  },
  propertyContainer: {
    padding: '18px',
    borderBottom: '2px solid #E7EEF5',
  },
  cardTitle: {
    color: '#7747FF',
    fontSize: '16px',
    fontFamily: 'Nunito',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    padding: '2px 8px',
    backgroundColor: '#ECC28B',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(AboutCard);
