import React from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const CustomBreadcrumb = ({ classes, data }) => (
  <div className={classes.headerNav}>
    {
      data.reduce((acc, current, index) => {
        if (current.isALink) {
          acc.push(
            <Link className={classes.headerNavLink} to={current.to} onClick={current.onClick}>
              {current.name}
            </Link>,
          );
        } else {
          acc.push(<span className={classes.headerNavLink}>{current.name}</span>);
        }
        if (index < data.length - 1) {
          acc.push('/');
        }
        return acc;
      }, []).map((item) => (item))
    }
  </div>
);

const styles = (theme) => ({
  headerNav: {
    paddingTop: '8px',
    color: '#5e8ca5',
    paddingBottom: '12px',
  },
  headerNavLink: {
    paddingLeft: '6px',
    paddingRight: '6px',
    textDecoration: 'none',
    color: '#5e8ca5',
    textTransform: 'uppercase',
    fontFamily: theme.custom.fontFamilySans,
    fontSize: '8pt',
    letterSpacing: '0.025em',

  },
});


export default withStyles(styles)(CustomBreadcrumb);
