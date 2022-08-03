import React from 'react';
import {
  Box, Button, Grid, Paper, withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CustomDataTable, getColumns, getOptions } from 'bento-components';
import { profileArmsTable } from '../../../bento/profileData';
import style from '../styles';
import getDateInFormat from '../../../utils/date';

const ProfileViewFooter = ({ classes, data }) => {
  const { role, userStatus } = data.getMyUser;
  const canAccessButton = ['member', 'non-member'].indexOf(role) !== -1 && userStatus !== 'inactive';

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
        <div>You have access to all Arm(s).</div>
      </Paper>
    </Box>
  );

  const renderRequestButton = () => (canAccessButton ? (
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
    const newData = JSON.parse(JSON.stringify({ ...data }));
    /* eslint no-param-reassign: ["error", { "props": false }] */
    newData.getMyUser.acl.forEach((element) => {
      element.requestDate = getDateInFormat(element.requestDate, '/');
      element.reviewDate = getDateInFormat(element.reviewDate, '/');
    });

    return newData.getMyUser;
  };
  const renderGrid = () => (
    <>
      <div>
        {profileArmsTable.display ? (
          <div id="table_profile" className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12}>
                <CustomDataTable
                  data={formatDate()[profileArmsTable.dataField]}
                  columns={getColumns(profileArmsTable, classes, formatDate())}
                  options={getOptions(profileArmsTable, classes)}
                />
              </Grid>
            </Grid>
          </div>
        ) : ''}

        {renderRequestButton()}
      </div>
    </>
  );

  if (userStatus === 'inactive' || (userStatus === 'non-member' && data.getMyUser.acl.length === 0)) {
    return renderInactive();
  }

  if (role === 'admin' && userStatus === 'active') {
    return renderAdmin();
  }

  return renderGrid();
};

export default withStyles(style, { withTheme: true })(ProfileViewFooter);
