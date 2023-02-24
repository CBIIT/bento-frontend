import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const CaseCard = ({ data, classes, index }) => {
  const properties = [

    {
      label: 'Program ID',
      dataField: 'program_id',
      link: '/program/{program_id}',

    },
    {
      label: 'Diagnosis',
      dataField: 'diagnosis',
    },
    {
      label: 'Age',
      dataField: 'age',
    },
  ];

  const propertiesWithLinks = prepareLinks(properties, data);

  return (
    <>
      <Grid item container className={classes.card}>
        <Grid item xs={1} className={classes.indexContainer}>
          {index + 1 }
        </Grid>
        <Grid item xs={11} className={classes.propertyContainer}>
          <div>
            <span className={classes.detailContainerHeader}>CASE</span>
            <span>
              <Link to={`/case/${data.subject_id}`} className={classes.cardTitle}>
                {data.subject_id}
              </Link>

            </span>
          </div>
          {propertiesWithLinks.map((prop) => (
            <PropertyItem
              label={prop.label}
              value={data[prop.dataField]}
              link={prop.link}
            // labelLink={prop.labelLink}
            // classes={classes}
              index
            />
          ))}
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
    backgroundColor: '#C0E9D7',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },
});

export default withStyles(styles, { withTheme: true })(CaseCard);
