import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const StudyCard = ({ data, classes, index }) => {
  const properties = [
    {
      label: 'Study ID',
      dataField: 'study_id',

    },
    {
      label: 'Study Name',
      dataField: 'study_name',
    },
    {
      label: 'Study Code',
      dataField: 'study_code',
      link: '/arm/{study_code}',

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
            <span className={classes.detailContainerHeader}>STUDY</span>
            {' '}
&nbsp;
            {' '}
            <span className={classes.cardTitle}>{data.study_id}</span>
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
  content: {
    fontSize: '12px',
  },
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
  detailContainerHeader: {
    textTransform: 'uppercase',
    padding: '2px 8px',
    backgroundColor: 'white',
    color: '#000000',
    fontFamily: 'Nunito',
    fontSize: '12px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(StudyCard);
