import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Anchor } from 'bento-components';

const AboutCard = ({
  searchText, data, classes, index,
}) => {
  const results = data.text.map((result) => result.replaceAll('$', ''));

  function getHighlightedText(text, highlight) {
    // Split on highlight term and include term into parts, ignore case
    const textString = text.reduce((searchResults, currentString, currentIndex) => {
      let newResults = searchResults;
      if (currentString.endsWith('.') || currentIndex >= text.length - 1) {
        newResults = `${`${newResults} ${currentString}`}`;
      } else {
        newResults = `${`${newResults} ${currentString}`} ... `;
      }
      return newResults;
    }, '');
    const parts = textString.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        { parts.map((part, i) => (
          <span id={i} style={part.toLowerCase() === highlight.toLowerCase() ? { color: '#0467BD' } : {}}>
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
            <span className={classes.cardTitle}>{data.title}</span>
          </div>
          <div className={classes.text}>{getHighlightedText(results, searchText)}</div>
          <div className={classes.linkText}><Anchor link={data.page} text={`${window.location.origin}${data.page}`} classes={classes} /></div>
        </Grid>
      </Grid>

    </>
  );
};

const styles = (theme) => ({
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  linkText: {
    fontFamily: 'Nunito',
    color: theme.palette.text.link,
    textDecoration: 'none',
  },
  indexContainer: {
    padding: '18px 0px 18px 18px',
    color: '#747474',
    fontFamily: 'Inter',
    fontSize: '13px',
  },
  propertyContainer: {
    padding: '16px 16px 16px 0px',
    borderBottom: '2px solid #E7EEF5',
  },
  cardTitle: {
    color: theme.palette.text.link,
    textDecoration: 'none',
    fontSize: '16px',
    fontFamily: 'Nunito',
    paddingLeft: '9px',
    verticalAlign: 'middle',
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
    fontWeight: '400',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(AboutCard);
