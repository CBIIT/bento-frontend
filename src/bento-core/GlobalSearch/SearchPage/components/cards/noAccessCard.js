import { Grid, withStyles } from '@material-ui/core';
import React from 'react';

const NoAccessCard = ({
  classes, index, tab,
}) => (
  <>
    <Grid item container className={classes.card}>
      <Grid item xs={1} className={classes.indexContainer}>
        {index + 1 }
      </Grid>
      <Grid item xs={11} className={classes.propertyContainer}>
        <div>
          <span className={classes.detailContainerHeader}>Access Denied</span>
          <span className={classes.cardTitle}>
            Please login to view search results for
            {tab}
            {' '}
            tab.
          </span>
        </div>
      </Grid>
    </Grid>

  </>
);

const styles = (theme) => ({
  cartIcon: {
    height: '22px',
    margin: '0px 0px 0px 6px',
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

export default withStyles(styles, { withTheme: true })(NoAccessCard);
