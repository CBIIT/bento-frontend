import React from 'react';
import {
  Box, Button, Grid, Paper, withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CustomDataTable, getColumns, getOptions } from 'bento-components';
import { ignoredArms, profileArmsTable } from '../../../bento/profileData';
import { NODE_LEVEL_ACCESS } from '../../../bento/siteWideConfig';
import custodianUtils from '../../../utils/custodianUtilFuncs';
import style from '../styles';
import getDateInFormat from '../../../utils/date';

const ProfileViewFooter = ({ classes, data }) => {
  const { role, userStatus } = data.getMyUser;

  /**
   * Determines whether a given role can access the DAR button
   * @param {string} userRole The user's role
   * @returns boolean
   */
  const canAccessButton = (userRole) => {
    const roles = [
      'member',
      'non-member',
    ];

    // User must be one of the roles above
    if (!roles.includes(userRole)) {
      return false;
    }

    return true;
  };

  const renderAdmin = () => (
    <Box sx={{
      width: '100%',
      'border-top': '1px solid #89b5da',
      'border-bottom': '1px solid #89b5da',
      padding: '80px',
      'text-align': 'center',
      'font-weight': 'bold',
    }}
    >
      <Paper elevation={0}>
        <div>
          You have access to all
          {' '}
          {NODE_LEVEL_ACCESS ? custodianUtils.getNodeLevelLabel() : 'data'}
        </div>
      </Paper>
    </Box>
  );

  const renderRequestButton = () => (canAccessButton(role) ? (
    <Box textAlign="center" sx={{ width: '100%' }}>
      <Button className={classes.btnRequest}>
        <Link to="/request" className={classes.btnRequestLink}>Request Access</Link>
      </Button>
    </Box>
  ) : '');

  const renderInactive = () => (
    <>
      <Box sx={{
        width: '100%',
        'border-top': '1px solid #89b5da',
        'border-bottom': '1px solid #89b5da',
        padding: '80px',
        'text-align': 'center',
        'font-weight': 'bold',
      }}
      >
        <Paper elevation={0}>
          <div>You have no access to data.</div>
        </Paper>
      </Box>

      {renderRequestButton()}
    </>
  );

  const formatDate = () => {
    const removeRevokedStatus = (dataItem) => ignoredArms.indexOf(
      dataItem.accessStatus.toLowerCase(),
    ) === -1;
    const newData = JSON.parse(JSON.stringify({ ...data }));
    newData.getMyUser.acl = newData.getMyUser.acl.filter(removeRevokedStatus);
    /* eslint no-param-reassign: ["error", { "props": false }] */
    (newData.getMyUser.acl || []).forEach((element) => {
      element.requestDate = getDateInFormat(element.requestDate, '/');
      element.reviewDate = getDateInFormat(element.reviewDate, '/');
    });

    return newData.getMyUser;
  };

  const gridConfig = profileArmsTable;

  const renderGrid = () => (
    <>
      <div>
        {gridConfig.display ? (
          <div id="table_profile" className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12}>
                <CustomDataTable
                  data={formatDate()[gridConfig.dataField]}
                  columns={getColumns(gridConfig, classes, formatDate())}
                  options={getOptions(gridConfig, classes)}
                />
              </Grid>
            </Grid>
          </div>
        ) : ''}

        {renderRequestButton()}
      </div>
    </>
  );

  if (userStatus === 'non-member' && data.getMyUser.acl.length === 0) {
    return renderInactive();
  }

  if (role === 'admin' && userStatus === 'active') {
    return renderAdmin();
  }

  return renderGrid();
};

export default withStyles(style, { withTheme: true })(ProfileViewFooter);
