import React, { useEffect, useState } from 'react';
import { CircularProgress, withStyles } from '@material-ui/core';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';
import client from '../../utils/graphqlClient';
import styles from './DashStyle';
import BentoFacetFilter from './BentoFacetFilter';

const filters = {
  age_at_index: [],
  association: [],
  chemo_regimen: [],
  composition: [],
  diagnoses: [],
  endo_therapies: [],
  er_status: [],
  file_type: [],
  meno_status: [],
  pr_status: [],
  programs: [],
  rc_scores: [],
  studies: [],
  tissue_type: [],
  tumor_grades: [],
  tumor_sizes: [],
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
