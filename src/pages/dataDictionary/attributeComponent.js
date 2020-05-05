import React from 'react';
import { withStyles } from '@material-ui/core';

const AttributeComponent = ({ classes, data }) => (
  <div className={classes.sectionContent} id={data.row[0].charAt(0).toUpperCase()}>
    <div className={classes.attributeContent}>
      Attribute Name:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[0]}
      </span>
    </div>
    {data.row[3] !== '' && (
    <div className={classes.attributeContent}>
    Display Name:
      <span className={classes.boldAttrDesc}>
      &nbsp;
        {data.row[3]}
      </span>
    </div>
    )}
    <div className={classes.attributeContent}>
      Description:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[1]}
      </span>
    </div>
    {data.row[2] !== '' && (
    <div className={classes.attributeContent}>
    Attribute of Node:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[2]}
      </span>
    </div>
    )}
    { typeof data.row[8] !== 'undefined' && (
    <div className={classes.attributeContent}>
    Attribute of Relationship:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[8]}
      </span>
    </div>
    )}
    <div className={classes.attributeContent}>
      Required:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[4]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Type:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[5]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Constraints:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[6]}
      </span>
    </div>
    <div className={classes.attributeContent}>
      Enumeration:
      <span className={classes.attrDesc}>
      &nbsp;
        {data.row[7]}
      </span>
    </div>
  </div>
);
const styles = () => ({
  sectionContent: {
    padding: '12px',
    '&:nth-child(even)': {
      backgroundColor: '#EEF6FD',
    },
  },
  attrDesc: {
    color: '#022B43',
    fontFamily: 'Raleway',
    fontSize: '17px',
    fontWeight: 'normal',
  },
  attributeContent: {
    color: '#2C9FCA',
    fontFamily: 'Lato',
    fontSize: '17px',
    padding: '2px',
    fontWeight: 'bold',
    lineHeight: '1.5em',
  },
  boldAttrDesc: {
    color: ' #022B43',
    fontFamily: 'Raleway',
    fontSize: '17px',
    fontWeight: 'bold',
    lineHeight: '1.5em',
  },
});

export default withStyles(styles)(AttributeComponent);
