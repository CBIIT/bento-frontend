import React from 'react';
import Markdown from 'react-markdown';
import * as Styled from './Changelog.styled';
import { useModelContext } from '../../state/NavContextProvider';

const ChangelogComponent = () => {
  const { context = {} } = useModelContext();
  const { changelogInfo } = context;

  return (
    <Styled.MarkdownBox>
      {changelogInfo.changelogMD ? (
        <Markdown>{changelogInfo.changelogMD}</Markdown>
      ) : (
        <Styled.Error>
          An error occurred while loading the Release Notes
        </Styled.Error>
      )}
    </Styled.MarkdownBox>
  );
};

export default ChangelogComponent;
