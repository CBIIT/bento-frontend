// Component to display a property
import { Grid, withStyles } from '@material-ui/core';
import React from 'react';
import Components from './component';

// Component to display a subsection
const Subsection = ({
  data, classes, searchText, count,
}) => (
  <>
    {count !== 0 && (
      <div className={classes.totalResults}>
        {count}
        {' '}
        Results
      </div>
    ) }
    <Grid className={classes.subsection}>
      <Grid item container direction="column" className={classes.subsectionBody} xs={9}>
        {/* {data.content.body.map(block => Components(block))} */}

        { data !== undefined ? data.length !== 0 ? data.map(
          // eslint-disable-next-line max-len
          (block, index) => <Components searchText={searchText} data={block} classes index={index} />,
        )
          : <div>No data</div> : <div>No data</div>}
      </Grid>
    </Grid>
  </>
);
const styles = (theme) => ({
  content: {
    fontSize: '12px',
  },
  subsectionBody: {
    margin: '0 auto',
    maxWidth: '1000px',
    // borderBottom: '1px solid #8DCAFF',
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
  totalResults: {
    // margin: '0 auto',
    maxWidth: '1100px',
    color: '#000',
    fontSize: '20px',
    fontWeight: '300',
    margin: '16px auto',
    paddingLeft: '32px',
  },

});

export default withStyles(styles, { withTheme: true })(Subsection);
