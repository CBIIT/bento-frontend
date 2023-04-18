import React from 'react';
import { Alert, withStyles } from '@material-ui/core';
import { capitalize } from '@bento-core/util';
import RoleBadgeGroup from './RoleBadgeGroup';
import style from './defaultStyle';

const HeaderView = ({
  classes,
  data,
  imageMap,
}) => {
  if (!data || !data.getMyUser) {
    return (
      <Alert severity="error">Provide Valid User Information.</Alert>
    );
  }

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
}

export default withStyles(style)(HeaderView);
