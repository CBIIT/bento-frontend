import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const ProgamCard = ({ data, classes, index }) => {
  const properties = [

    {
      label: 'program id',
      dataField: 'program_id',
    },
    {
      label: 'Program Name',
      dataField: 'program_name',
    },
    {
      label: 'Program Code',
      dataField: 'program_code',
      link: '/program/{program_id}',

    },
    {
      label: 'File Id',
      dataField: 'file_id',

    },
  ];

  const propertiesWithLinks = prepareLinks(properties, data);

  return (
    <>
      <Grid item className={classes.card}>
        <Grid item xs={1} className={classes.indexContainer}>
          {index + 1 }
        </Grid>
        <Grid item xs={11} className={classes.propertyContainer}>
          <div>
            <span className={classes.detailContainerHeader}>Program</span>
            {' '}
&nbsp;
            {' '}
            <span className={classes.cardTitle}>{data.program_code}</span>

          </div>

          {propertiesWithLinks.slice(0, 10).map((prop) => (
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

const styles = () => ({
  indexContainer: {
    padding: '18px',
    fontFamily: 'Nunito',
    color: '#747474',
  },
  propertyContainer: {
    padding: '18px',
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
    backgroundColor: '#FFE25A',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '500',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(ProgamCard);
