import React from 'react';
import {
  ThemeProvider,
  createTheme,
  Container
} from '@material-ui/core';
import defaultTheme from './DefaultTheme';
import HeaderView from './components/HeaderView';
import BodyView from './components/BodyView';
import FooterView from './components/FooterView';

const ProfileView = (props) => {
  const {
    customTheme = {},
    data,
    imageMap,
    changeUserBasicInfo,
    editTool,
    ignoredArms,
    profileArmsTable,
    tblThemeConfig,
  } = props;
  const theme = createTheme({ overrides: {
    ...defaultTheme(),
    customTheme,
  }});
  return (
    <ThemeProvider theme={theme}>
      <Container className="container">
        <HeaderView
          data={data}
          imageMap={imageMap}
        />
        <BodyView
          changeUserBasicInfo={changeUserBasicInfo}
          editTool={editTool}
          data={data}
        />
        <FooterView
          data={data}
          ignoredArms={ignoredArms}
          profileArmsTable={profileArmsTable}
          tblThemeConfig={tblThemeConfig}
        />
      </Container>
    </ThemeProvider>
  );
};

export default ProfileView;
