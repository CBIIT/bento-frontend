import React from 'react';
import { withStyles } from '@material-ui/core';
import clsx from 'clsx';

const tabLabel = ({
  classes, title, primaryColorClass, icon,
}) => (
  <div className={clsx(classes.defaultStyle, primaryColorClass)}>
    {(icon && (<img src={icon} alt="icdc_carousel_tabs" />))}
    <span>
      {title}
      {' '}

    </span>
  </div>
);

const styles = () => ({
  defaultStyle: {
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: '17px',
    height: '30px',
    marginBottom: '-5px',
  },
});

export default withStyles(styles, { withTheme: true })(tabLabel);
