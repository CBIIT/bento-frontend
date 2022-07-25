import React from 'react';
import {
  Grid, withStyles, Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CustomDataTable, getColumns, getOptions } from 'bento-components';
// eslint-disable-next-line
import {useMutation} from "@apollo/client";
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

function ProfileView({ classes, data }) {
  return (
    <div className={classes.profileView}>
      <div className={classes.profile_container}>
        <ProfileViewHeader classes={classes} data={data} />
        <ProfileViewBody data={data} classes={classes} />
        <ProfileViewFooter classes={classes} data={data} />
      </div>
    </div>
  );
}

const ProfileViewHeader = ({ classes, data }) => {
  const check = (strRole) => strRole && strRole.length && data.data.role.includes(strRole);
  const getIconInfo = () => {
    const isMember = check('member');
    const isInactive = check('in-active');
    const isAdmin = check('admin');
    if (isAdmin && !isInactive) {
      return adminIcon;
    }

    if (isMember && !isInactive) {
      return userIcon;
    }

    if (isInactive) {
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
          <div className={classes.profile_header_text}>{data.data.email}</div>
          <RoleBadgeGroup data={data.data} />
        </div>
      </div>
    </>
  );
};

const ProfileViewBody = ({ classes, data }) => {
  const d = data.data;
  const [mutate] = useMutation(changeUserBasicInfo, {
    context: { clientName: 'userService' },
    onCompleted() { /* check here for what returns */ },
    onError() { /* Check here for what needs to be changed */ },
  });

  return (
    <>
      <div className={classes.profile_body_container}>
        <div className={classes.splitBodyColumn1}>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>Name: </div>
            <TextEditComponent data={`${d.firstName}, ${d.lastName}`} customOptions={{ alt: 'Edit name' }} onSave={mutate} />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              Organization:
            </div>
            <TextEditComponent customOptions={{ disabled: true, alt: 'edit organization' }} data={d.organization} onSave={mutate} />
          </div>
        </div>
        <div className={classes.splitBodyColumn2}>
          &nbsp;
        </div>
      </div>
      <div className="" />
    </>
  );
};

const ProfileViewFooter = ({ classes, data }) => (
  <>
    <div>
      {profileArmsTable.display ? (
        <div id="table_profile" className={classes.tableDiv}>
          <Grid container>
            <Grid item xs={12}>
              <CustomDataTable
                data={data.data[profileArmsTable.dataField]}
                columns={getColumns(profileArmsTable, classes, data.data)}
                options={getOptions(profileArmsTable, classes)}
              />
            </Grid>
          </Grid>
        </div>
      ) : ''}

      <Button className={classes.btnRequest}>
        <Link to="/" className={classes.btnRequestLink}>Request Access</Link>
      </Button>
    </div>
  </>
);

export default withStyles(style, { withTheme: true })(ProfileView);
