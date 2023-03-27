import React from 'react';
import { withStyles } from '@material-ui/core';
import { adminIcon, inactiveUserIcon, userIcon } from '../../../bento/profileData';
import RoleBadgeGroup from './RoleBadgeGroup';
import style from '../styles';

const imageMap = {
  member: userIcon,
  'non-member': inactiveUserIcon,
  admin: adminIcon,
};

const capitalize = (str) => str.substr(0, 1).toUpperCase() + str.substr(1, str.length - 1);

const ProfileViewHeader = ({ classes, data }) => {
  let icon;
  const { role } = data.getMyUser;

  if (role && role.length && Object.prototype.hasOwnProperty.call(imageMap, role)) {
    icon = imageMap[role];
  } else {
    icon = imageMap.member;
  }

  return (
    <>
      <div className={classes.profile_header_container}>
        <div className={classes.profile_header_left}>
          <div className={classes.profile_header_icon}>
            <img className={classes.profileIcon} src={icon.src} alt={icon.alt} />
          </div>
        </div>
        <div className={classes.profile_header_right}>
          <div className={classes.profile_header_text}>{capitalize(data.getMyUser.email)}</div>
          <RoleBadgeGroup data={data.getMyUser} />
        </div>
      </div>
    </>
  );
};

export default withStyles(style, { withTheme: true })(ProfileViewHeader);
