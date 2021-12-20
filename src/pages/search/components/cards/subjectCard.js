import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const CaseCard = ({ data, classes, index }) => {
  const properties = [

    {
      label: 'Program Code',
      dataField: 'program_code',
      link: '/program/{program_id}',

    },
    {
      label: 'Study',
      dataField: 'study',
      link: '/arm/{study}',
    },
    {
      label: 'Subject ID',
      dataField: 'subject_id',
      link: '/case/{subject_id}',
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
            {' '}
&nbsp;
            {' '}
            <span className={classes.cardTitle}>{data.subject_id}</span>
          </div>
          {propertiesWithLinks.slice(0, 10).map((prop) => (
            <PropertyItem
              key={index}
              label={prop.label}
              value={data[prop.dataField]}
              link={prop.link}
            // labelLink={prop.labelLink}
            // classes={classes}
              index
            />
          ))}
        </Grid>
        {/* <Grid item xs={3}>
          <Button variant="outlined" sx={{ borderRadius: 100 }}>
            <span className={classes.badge}>
              <img
                className={classes.cartIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg"
                alt="add to cart"
              />

            </span>
            Add to cart
          </Button>
        </Grid> */}
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
    padding: '18px 0px 18px 18px',
    fontFamily: 'Nunito',
    color: '#747474',
  },
  propertyContainer: {
    padding: '16px 16px 16px 0px',
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
    backgroundColor: '#C0E9D7',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(CaseCard);
