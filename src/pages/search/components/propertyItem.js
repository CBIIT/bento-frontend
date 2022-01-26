import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { Anchor } from 'bento-components';

const PropertyItem = ({
  label, value, link, labelLink, classes, index,
}) => {
  const defaultValue = '';
  return (
    <Grid item container className={classes.propertyContainer}>
      {value ? (
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            {labelLink ? <Anchor link={labelLink} text={label} classes={classes} /> : `${label}:`}
          </span>
          <span className={classes.content} id={`section_description_${index + 1}`}>
            {value || value === 0 ? (
              link ? <Anchor link={link} text={value} classes={classes} /> : value
            ) : defaultValue}
          </span>
        </Grid>
      ) : '' }
    </Grid>
  );
};

const styles = () => ({
  content: {
    color: '#000',
    // fontFamily: theme.custom.fontFamilySans,
    fontFamily: 'Nunito',
    fontSize: '14px',
    whiteSpace: 'normal',
    paddingLeft: '6px',
    letterSpacing: '0.7px',
  },
  title: {
    color: '#000',
    // fontFamily: theme.custom.fontFamilySans,
    fontFamily: 'Inter',
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.7px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
  },
  propertyContainer: {
    lineHeight: '17px',
    paddingLeft: '6px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },

});

export default withStyles(styles, { withTheme: true })(PropertyItem);
