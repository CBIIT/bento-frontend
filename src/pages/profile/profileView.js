import React, { useState } from 'react';
import {
  Grid, withStyles, Button, Box, Paper, TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CustomDataTable, getColumns, getOptions } from 'bento-components';
import { useMutation } from '@apollo/client';
import {
  profileArmsTable,
  userIcon,
  adminIcon,
  inactiveUserIcon,
  changeUserBasicInfo,
} from '../../bento/profileData';
import RoleBadgeGroup from './components/RoleBadgeGroup';
import TextEditComponent from './components/textEditComponent';
import style from './styles';
import Stats from '../../components/Stats/AllStatsController';

function ProfileView({ classes, data }) {
  return (
    <>
      <Stats />
      <div className={classes.profileView}>
        <div className={classes.profile_container}>
          <ProfileViewHeader classes={classes} data={data} />
          <ProfileViewBody data={data} classes={classes} />
          <ProfileViewFooter classes={classes} data={data} />
        </div>
      </div>
    </>
  );
}

const ProfileViewHeader = ({ classes, data }) => {
  const check = (strRole) => strRole && strRole.length && data.getMyUser.role.includes(strRole);
  const getIconInfo = () => {
    const isMember = check('member');
    const isNonMember = check('non-member');
    const isAdmin = check('admin');
    if (isAdmin) {
      return adminIcon;
    }

    if (isMember) {
      return userIcon;
    }

    if (isNonMember) {
      return inactiveUserIcon;
    }

    return userIcon;
  };
  const icon = getIconInfo();

  return (
    <>
      <div className={classes.profile_header_container}>
        <div className={classes.profile_header_left}>
          <div className={classes.profile_header_icon}>
            <img className={classes.profileIcon} src={icon.src} alt={icon.alt} />
          </div>
        </div>
        <div className={classes.profile_header_right}>
          <div className={classes.profile_header_text}>{data.getMyUser.email}</div>
          <RoleBadgeGroup data={data.getMyUser} />
        </div>
      </div>
    </>
  );
};

const ProfileViewBody = ({ classes, data }) => {
  const { getMyUser } = data;
  const [firstName, setFirstName] = useState(getMyUser.firstName);
  const [lastName, setLastName] = useState(getMyUser.lastName);
  const [organization, setOrganization] = useState(getMyUser.organization);

  const [mutate] = useMutation(changeUserBasicInfo, {
    context: { clientName: 'userService' },
    fetchPolicy: 'no-cache',
    // refetchQueries: [{ query: GET_MY_PROFILE_QUERY }],
    onCompleted(responseData) { /* check here for what returns */
      setFirstName(responseData.updateMyUser.firstName);
      setLastName(responseData.updateMyUser.lastName);
      setOrganization(responseData.updateMyUser.organization);
    },
    onError() {
      /* Check here for what needs to be changed */
    },
  });
  /* const { data: editSuccessData } = response; */

  const completeSave = (value, field) => {
    const variables = { userInfo: { firstName, lastName, organization } };
    variables.userInfo[field] = value;
    mutate({ variables });
  };

  return (
    <>
      <div className={classes.profile_body_container}>
        <div className={classes.splitBodyColumn1}>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>Account Type: </div>
            <TextField value={(getMyUser.IDP || '').toUpperCase()} inputProps={{ readOnly: true }} />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>Last Name: </div>
            <TextEditComponent data={`${lastName}`} customOptions={{ alt: 'Edit last name', field: 'lastName' }} onSave={completeSave} />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>First Name: </div>
            <TextEditComponent data={`${firstName}`} customOptions={{ alt: 'Edit first name', field: 'firstName' }} onSave={completeSave} />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              Organization:
            </div>
            <TextEditComponent customOptions={{ alt: 'edit organization', field: 'organization' }} data={organization} onSave={completeSave} />
          </div>
        </div>
        <div className={classes.splitBodyColumn2} />
      </div>
      <div className="" />
    </>
  );
};

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
  const renderGrid = () => (
    <>
      <div>
        {profileArmsTable.display ? (
          <div id="table_profile" className={classes.tableDiv}>
            <Grid container>
              <Grid item xs={12}>
                <CustomDataTable
                  data={data.getMyUser[profileArmsTable.dataField]}
                  columns={getColumns(profileArmsTable, classes, data.getMyUser)}
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

export default withStyles(style, { withTheme: true })(ProfileView);
