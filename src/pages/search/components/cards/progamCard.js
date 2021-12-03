import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { prepareLinks } from 'bento-components';
import PropertyItem from '../propertyItem';

const ProgamCard = ({ data, classes }) => {
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
        <div>
          <span className={classes.detailContainerHeader}>Program</span>
          {' '}
&nbsp;
          {' '}
          {data.program_code}
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
    backgroundColor: '#C09500',
    color: '#000000',
    fontFamily: 'Nunito Sans',
    fontSize: '14px',
    fontWeight: '600',
    /* letter-spacing: 10px; */
    lineHeight: '20px',
  },
});

export default withStyles(styles, { withTheme: true })(ProgamCard);
