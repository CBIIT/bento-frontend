import React from 'react';
import DropDownView from './dropdown/DropdownView';
import * as Styled from './Header.styled';
import ReadMeView from './ReadMe/ReadMeView';

const HeaderView = ({
  headerLogo,
  title = 'Data Model Navigator',
  readMeConfig,
}) => (
  <>
    <Styled.TitleContainer className="headerTitleContainer">
      <Styled.LogoAndTitle className="logoAndTitle">
        <Styled.HeaderLogo src={headerLogo} alt="header-logo" className="headerLogo" />
        <Styled.Title className="headerTitle">{title}</Styled.Title>
      </Styled.LogoAndTitle>
      <Styled.ButtonContainer className="headerButtonContainer">
        {
          readMeConfig && (
            <ReadMeView
              config={readMeConfig}
            />
          )
        }
        <DropDownView
          readMeConfig={readMeConfig}
        />
      </Styled.ButtonContainer>
    </Styled.TitleContainer>
    <Styled.Divider />
  </>
);

export default HeaderView;
