import React, { useState } from 'react';
import DropDownView from './dropdown/DropdownView';
import * as Styled from './Header.styled';
import ReadMeView from './readMe/ReadMeView';
// import { useModelContext } from '../../state/NavContextProvider';

const HeaderView = ({
  headerLogo,
  title = "Data Model Navigator",
  readMeConfig
}) => {

  /**
  * use context access data model state
  */
  // const { context } = useModelContext();
  // console.log(context.readMeConfig);
  return (
    <>
      <Styled.TitleContainer>
        <Styled.LogoAndTitle>
          <Styled.HeaderLogo src={headerLogo} alt="header-logo" />
          <Styled.Title>{title}</Styled.Title>
        </Styled.LogoAndTitle>
        <Styled.ButtonContainer>
          <ReadMeView
            config={readMeConfig}
          />
          <DropDownView
            readMeConfig={readMeConfig}
          />
        </Styled.ButtonContainer>
      </Styled.TitleContainer>
      <Styled.Divider />
    </>
  );
}

export default HeaderView;
