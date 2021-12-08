import React from 'react';
import { Grid, withStyles } from '@material-ui/core';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const StudyCard = ({ data, classes }) => {
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
        <div>
          <span className={classes.detailContainerHeader}>STUDY</span>
          {' '}
&nbsp;
          {' '}
          <span className={classes.cardTitle}>{data.study_id}</span>
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
    </>
  );
};

const styles = () => ({
  content: {
    fontSize: '12px',
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
  detailContainerHeader: {
    textTransform: 'uppercase',
    paddingLeft: '8px',
    paddingRight: '8px',
    backgroundColor: 'white',
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(StudyCard);
