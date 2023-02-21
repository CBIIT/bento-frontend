import React, { useEffect, useState } from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import client from '../../utils/graphqlClient';
import styles from './DashStyle';
import BentoFacetFilter from './sideBar/BentoFacetFilter';

const filters = {
};

const DashTemplate = ({
  classes,
}) => {
  async function getData() {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: filters,
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    getData().then((result) => {
      if (result.searchSubjects) {
        setDashData(result.searchSubjects);
      }
    });
  }, []);

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
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(DashTemplate);
