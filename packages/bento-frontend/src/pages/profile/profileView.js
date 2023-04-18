import React from 'react';
import { withStyles } from '@material-ui/core';
import { ProfileView as BentoProfileView } from '@bento-core/profile';
import { changeUserBasicInfo, editTool } from '../../bento/profileData';
import ProfileViewHeader from './components/profileHeaderComponent';
import ProfileViewBody from './components/profileBodyComponent';
import ProfileViewFooter from './components/profileFooterComponent';
import style from './styles';
import Stats from '../../components/Stats/AllStatsController';
import { adminIcon, inactiveUserIcon, userIcon, ignoredArms, profileArmsTable  } from '../../bento/profileData';

const imageMap = {
  member: userIcon,
  'non-member': inactiveUserIcon,
  admin: adminIcon,
};

function ProfileView({ classes, data }) {
  if (data && data.getMyUser) {
    const { getMyUser } = data;
    getMyUser.role = getMyUser.role.toLowerCase();
    getMyUser.userStatus = getMyUser.userStatus.toLowerCase();
  }

  return (
    <>
      <Stats />
      <div className={classes.profileView}>
        <BentoProfileView
          data={data}
          imageMap={imageMap}
          changeUserBasicInfo={changeUserBasicInfo}
          editTool={editTool}
          ignoredArms={ignoredArms}
          profileArmsTable={profileArmsTable}
        />
      </div>
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

export default withStyles(style, { withTheme: true })(ProfileView);
