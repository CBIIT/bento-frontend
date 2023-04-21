import React from 'react';
import { withStyles } from '@material-ui/core';
import { ProfileView as BentoProfileView } from '@bento-core/profile';
import { changeUserBasicInfo, editTool } from '../../bento/profileData';
import style from './styles';
import { themeConfig } from './tblThemeConfig';
import Stats from '../../components/Stats/AllStatsController';
import {
  adminIcon,
  inactiveUserIcon,
  userIcon,
  ignoredArms,
  profileArmsTable,
} from '../../bento/profileData';
import { NODE_LEVEL_ACCESS, NODE_LABEL } from '../../bento/siteWideConfig';

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
        <div className={classes.profile_container}>
          <BentoProfileView
            data={data}
            imageMap={imageMap}
            changeUserBasicInfo={changeUserBasicInfo}
            editTool={editTool}
            ignoredArms={ignoredArms}
            profileArmsTable={profileArmsTable}
            tblThemeConfig={themeConfig}
            nodeLevelAccess={NODE_LEVEL_ACCESS}
            nodeLabel={NODE_LABEL}
          />
        </div>
      </div>
    </>
  );
}

export default withStyles(style, { withTheme: true })(ProfileView);
