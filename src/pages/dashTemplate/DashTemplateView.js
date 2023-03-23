import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './DashTemplateStyle';
import BentoFacetFilter from './sideBar/BentoFacetFilter';
import WidgetView from './widget/WidgetView';
import StatsView from '../../components/Stats/StatsView';
import Tabs from '../../bento-core/Tab/Tabs';

const DashTemplate = ({
  classes,
  dashData,
  onTabChange,
  tabData,
}) => (
  <div className={classes.dashboardContainer}>
    <StatsView data={dashData} />
    <div>
      <div className={classes.content}>
        <div className={classes.sideBar}>
          <BentoFacetFilter searchData={dashData} />
        </div>
        <div className={classes.rightContent}>
          <div className={classes.widgetsContainer}>
            <WidgetView
              data={dashData}
            />
            <Tabs
              tabData={tabData}
              onChange={onTabChange}
              styles={{
                tabsLabel:
                  {
                    '& .count': {
                      marginLeft: '5px',
                      fontSize: '17px',
                    },
                  },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(DashTemplate);
