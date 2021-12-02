import { Grid, withStyles, Button } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const CaseCard = ({ data, classes }) => {
  const properties = [

    {
      label: 'Program Code',
      dataField: 'program_code',

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
        <Grid item xs={9}>
          <div>
            <span className={classes.detailContainerHeader}>CASE</span>
            {' '}
&nbsp;
            {' '}
            {data.subject_id}
          </div>
          {propertiesWithLinks.slice(0, 10).map((prop, index) => (
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
        <Grid item xs={3}>
          <Button variant="outlined" sx={{ borderRadius: 100 }}>
            <span className={classes.badge}>
              <img
                className={classes.cartIcon}
                src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Icon-Cart-Navbar.svg"
                alt="add to cart"
              />

            </span>
            Add to cart
            {/* <Badge badgeContent={numberOfCases} max={99999}> */}

          </Button>
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
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    paddingLeft: '8px',
    paddingRight: '8px',
    backgroundColor: '#C0E9D7',
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(CaseCard);
