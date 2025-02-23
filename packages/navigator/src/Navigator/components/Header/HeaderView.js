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
    <Styled.TitleContainer>
      <Styled.LogoAndTitle>
        <Styled.HeaderLogo src={headerLogo} alt="header-logo" />
        <Styled.Title>{title}</Styled.Title>
      </Styled.LogoAndTitle>
      <Styled.ButtonContainer>
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
