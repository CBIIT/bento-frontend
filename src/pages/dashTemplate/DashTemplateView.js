import React from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';
import styles from './DashTemplateStyle';
import BentoFacetFilter from './sideBar/BentoFacetFilter';
import WidgetView from './widget/WidgetView';

const DashTemplate = ({
  classes,
  dashData,
}) => {
  if (!dashData) {
    return (<CircularProgress />);
  }
  return (
    <div className={classes.dashboardContainer}>
      <div>
        <div className={classes.content}>
          <div className={classes.sideBar}>
            <BentoFacetFilter searchData={dashData} />
          </div>
          <div className={classes.rightContent}>
            <WidgetView
              data={dashData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(DashTemplate);
