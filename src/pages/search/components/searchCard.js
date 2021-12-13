/* eslint-disable */

// Component to display a property
import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import { Anchor, prepareLinks } from 'bento-components';
import Components from './component';


// Component to display a subsection
const Subsection = ({ data, classes, searchText }) => {
//   const properties = prepareLinks(config.properties, data);
  return (
    <Grid className={classes.subsection}>
      <Grid item container direction="column" className={classes.subsectionBody} xs={9}>
      {/* {data.content.body.map(block => Components(block))} */}

      {data !== undefined ? data.length != 0 ? data.map((block, index) => <Components searchText={searchText} data={block} classes index={index} />): <div>No data</div>: <div>No data</div>}
      </Grid>
    </Grid>
    // <div className="App">
    //   <h1>Hello React</h1>
    //   {data.map(block => Components(block))}
    // </div>
  );
};

const styles = (theme) => ({
  content: {
    fontSize: '12px',
  },
  detailContainerHeader: {
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    fontSize: '17px',
    letterSpacing: '0.025em',
    color: '#0296C9',
  },
  subsectionBody: {
    margin: '0 auto',
    borderBottom: '1px solid #8DCAFF',
    paddingBottom: '15px',
  },
  subsection: {
    '&:last-child $subsectionBody': {
      borderBottom: 'none',
    },
  },
  title: {
    color: '#9d9d9c',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.017em',
    fontWeight: '600',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  },
  descriptionPart: {
    paddingBottom: '26px',
  },
  description: {
    fontWeight: 'bold',
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },

});

export default withStyles(styles, { withTheme: true })(Subsection);
