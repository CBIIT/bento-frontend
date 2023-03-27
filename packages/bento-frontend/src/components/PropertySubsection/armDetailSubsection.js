import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { Anchor, prepareLinks } from 'bento-components';

const PropertyItem = ({
  label, value, link, labelLink, classes, index,
}) => {
  const defaultValue = '';
  return (
    <Grid item>
      <Grid container>
        <Grid item xs={12}>
          <span className={classes.title} id={`case_detail_left_section_title_${index + 1}`}>
            {labelLink ? <Anchor text={label} link={labelLink} classes={classes} /> : label}
          </span>
        </Grid>
        <Grid item xs={12} className={classes.content} d={`case_detail_left_section_description_${index + 1}`}>
          {value || value === 0 ? (
            link ? <Anchor text={value} link={link} classes={classes} /> : value
          ) : defaultValue}
        </Grid>
      </Grid>
    </Grid>
  );
};

const PropertySubsection = ({ section: config, data, classes }) => {
  const properties = prepareLinks(config.properties, data);
  return (
    <Grid item xs={12} className={classes.propertyPanel}>
      <Grid container spacing={4} direction="column">
        {properties.slice(0, 10).map((prop, index) => (
          <PropertyItem
            key={index}
            label={prop.label}
            value={data[prop.dataField]}
            link={prop.link}
            labelLink={prop.labelLink}
            classes={classes}
            index
          />
        ))}
      </Grid>
    </Grid>
  );
};

const styles = (theme) => ({
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    fontWeight: 'bold',
    color: '#2f519f',
    letterSpacing: '0.025em',
  },
  descriptionPart: {
    paddingBottom: '26px',
    fontSize: '14px',
  },
  propertyPanel: {
    marginTop: '30px',
  },
  title: {
    color: '#0296C9',
    fontFamily: theme.custom.fontFamily,
    fontSize: '17px',
    lineHeight: '12px',
    letterSpacing: '0.017em',
    textTransform: 'uppercase',
  },
  content: {
    fontSize: '14px',
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },
});

export default withStyles(styles, { withTheme: true })(PropertySubsection);
