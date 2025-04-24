import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Styled from './ReadMe.styled';
import ReadMeDialogView from './Dialog/DialogView';

const ReadMeView = ({
  config,
}) => {
  const [displayReadMe, setDisplayReadMe] = useState(false);
  const [content, setContent] = useState(undefined);

  useEffect(() => {
    if (config && config.readMeUrl) {
      axios.get(config.readMeUrl).then((response) => response).then((resp) => {
        if (resp.data) {
          setContent(resp.data);
        }
      });
    }
  }, []);

  const displayReadMeHandler = () => {
    setDisplayReadMe(!displayReadMe);
  };

  return (
    <>
      {typeof (config?.readMeUrl) === 'string' && (
        <Styled.ReadMeButton
          variant="contained"
          color="primary"
          onClick={displayReadMeHandler}
          endIcon={(
            <Styled.ReadMeButtonIcon
              alt="readme btn icon"
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/icdc/images/svgs/DMN_readme_title-bar_icon.svg"
            />
          )}
        >
          README
        </Styled.ReadMeButton>
      )}

      <ReadMeDialogView
        title={config.readMeTitle}
        content={content}
        config={config}
        display={displayReadMe}
        displayReadMeDialog={displayReadMeHandler}
      />
    </>
  );
};

export default ReadMeView;
