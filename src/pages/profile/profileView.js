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
  editTool,
  changeUserBasicInfo,
} from '../../bento/profileData';
import RoleBadgeGroup from './components/RoleBadgeGroup';
import TextEditComponent from './components/textEditComponent';

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
        <div className={classes.splitBodyColumn}>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>Name: </div>
            <TextEditComponent data={d} customOptions={{ alt: 'Edit name' }} onSave={mutate} />
          </div>
          <div className={classes.textContainer}>
            <div className={classes.textLabel}>
              Organization:
            </div>
            <div className={classes.textField}>
              <div style={{ 'line-height': '30px' }}>
                {d.organization}
              </div>
              <Button disabled="true" variant="text"><img className={classes.editIcon} src={editTool.src} alt="edit organization" /></Button>
            </div>
          </div>
        </div>
        <div className={classes.splitBodyColumn}>
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

const style = () => ({
  profileView: {
    backgroundColor: '#ffffff',
  },
  profile_container: {
    background: '#ffffff',
    margin: '0 auto',
    height: '70vh',
    maxWidth: '80vh',
  },
  profile_header: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    position: 'relative',
  },
  profile_header_container: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    // borderBottom: '10px solid #aab2c8',
  },
  profile_header_left: {
    display: 'flex',
  },
  profile_header_icon: {
    height: '120px',
    padding: '0 10px',
  },
  profileIcon: {
    height: '150px',
  },
  profile_header_right: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  profile_header_bottom: {
    height: '30px',
    backgroundColor: '#aab2c8',
    // position: 'absolute',
  },
  profile_header_text: {
    fontFamily: 'Lato',
    letterSpacing: '0.025em',
    color: '#274fa5',
    fontSize: '24pt',
    margin: '30px 0 10px 0',
    lineHeight: '25px',
  },
  profile_body_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '50px 0',
  },
  tableDiv: {
    margin: 'auto',
  },
  btnRequest: {
    textDecoration: 'none',
    backgroundColor: '#5d53f6',
    margin: '10px 500px',
    '&hover btnRequestLink': {
      color: '#000',
    },
    minWidth: '200px',
  },
  btnRequestLink: {
    color: '#ffffff',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontSize: '16px',
    textTransform: 'capitalize',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  splitBodyColumn: {
    flex: 1,
    padding: '10px 50px',
  },
  textField: {
    minWidth: '220px',
    borderBottom: '1px solid #acacac',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLabel: {
    textTransform: 'uppercase',
  },
  editIcon: {
    width: '18px',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
  },
});

export default withStyles(style, { withTheme: true })(ProfileView);
