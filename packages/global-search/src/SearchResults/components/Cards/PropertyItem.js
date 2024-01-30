import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { Anchor } from '@bento-core/util';

/**
 * Property Item component generates the result card key:value element
 * e.g. "Program ID: NCT00000000" or "Age: 33"
 *
 * @param {object} props
 * @param {string} props.label - the label of the property
 * @param {string} props.value - the value of the property
 * @param {string} props.link - the relative link of the value (e.g. a local link)
 * @param {string} props.labelLink - the hyperlink of the label (e.g. to an external site)
 * @param {object} props.classes - the classes object used to style the component
 * @param {number} props.index
 * @returns {JSX.Element}
 */
const PropertyItem = ({ ...props }) => {
  const {
    label, value, link, labelLink, classes, index,
  } = props;
  const defaultValue = '';
  let processedValue = value;
  if (value === '') {
    processedValue = 'Not Available';
  }
  return (
    <Grid item container className={classes.propertyContainer}>
      {processedValue ? (
        <Grid item xs={12}>
          <span className={classes.title} id={`section_title_${index + 1}`}>
            {labelLink ? <Anchor link={labelLink} text={label} classes={classes} /> : `${label}:`}
          </span>
          <span className={classes.content} id={`section_description_${index + 1}`}>
            {processedValue || processedValue === 0 ? (
              link ? <Anchor link={link} text={processedValue} classes={classes} /> : processedValue
            ) : defaultValue}
          </span>
        </Grid>
      ) : ''}
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
