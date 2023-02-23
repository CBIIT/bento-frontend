import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from 'bento-components';
import { Link } from 'react-router-dom';
import PropertyItem from '../propertyItem';

const SampleCard = ({ data, classes, index }) => {
  const properties = [
    {
      label: 'Program ID',
      dataField: 'program_id',
      link: '/program/{program_id}',

    },

    {
      label: 'Case ID',
      dataField: 'subject_id',
      link: '/case/{subject_id}',

    },
    {
      label: 'Diagnosis',
      dataField: 'diagnosis',
    },
    {
      label: 'Sample Anatomic Site',
      dataField: 'sample_anatomic_site',

    },
    {
      label: 'Sample Tissue Type',
      dataField: 'tissue_type',
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
            <span className={classes.detailContainerHeader}>Sample</span>
            <span className={classes.cardTitle}>
              <Link to={`/case/${data.subject_id}`} className={classes.cardTitle}>
                {data.sample_id}
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
        <Grid item xs={3}>
          {/* <Button variant="outlined" sx={{ borderRadius: 100 }}>
            <span className={classes.badge}>
              <img
                className={classes.cartIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg"
                alt="add to cart"
              />

            </span>
            Add to cart
          </Button> */}
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
    backgroundColor: '#C3EAF5',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '400',
    letterSpacing: '0.9px',
    verticalAlign: 'middle',
    borderRadius: '4px',
  },

});

export default withStyles(styles, { withTheme: true })(SampleCard);
