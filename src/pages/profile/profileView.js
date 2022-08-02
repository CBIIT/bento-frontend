import React from 'react';
import { withStyles } from '@material-ui/core';
import ProfileViewHeader from './components/profileHeaderComponent';
import ProfileViewBody from './components/profileBodyComponent';
import ProfileViewFooter from './components/profileFooterComponent';
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

export default withStyles(style, { withTheme: true })(ProfileView);
