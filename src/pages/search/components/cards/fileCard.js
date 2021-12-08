import { Grid, withStyles, Button } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const FileCard = ({ data, classes }) => {
  const properties = [

    {
      label: 'Subject Id',
      dataField: 'subject_id',
      link: '/case/{subject_id}',

    },
    {
      label: 'Sample Id',
      dataField: 'sample_id',
    },
    {
      label: 'File Name',
      dataField: 'file_name',
    },
    {
      label: 'File Id',
      dataField: 'file_id',

    },
  ];
  const propertiesWithLinks = prepareLinks(properties, data);

  return (
    <>
      <Grid item container className={classes.card}>
        <Grid item xs={9}>
          <div>
            <span className={classes.detailContainerHeader}>FILE</span>
            {' '}
&nbsp;
            {' '}
            <span className={classes.cardTitle}>{data.file_id}</span>

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
  cardTitle: {
    color: '#0083C6',
    fontFamily: 'Nunito Sans',
    fontSize: '16px',
  },
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    paddingLeft: '8px',
    paddingRight: '8px',
    backgroundColor: '#F5C3F1',
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(FileCard);
