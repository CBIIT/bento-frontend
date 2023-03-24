import React from 'react';
import { Button } from '@material-ui/core';
import { btnTypes } from './AddFiles';
import ToolTipView from './TooltipView';
import AddFileButtonView from './ReduxAddFile';

const ButtonView = (props) => {
  const {
    btnType,
  } = props;

  if (btnTypes.DOWNLOAD_MANIFEST === btnType) {
    const {
      tooltipCofig,
      clsName,
      title,
    } = props;
    return (
      <>
        <Button
          className={clsName}
          disableRipple
        >
          {title}
        </Button>
        {tooltipCofig && (<ToolTipView {...props} />)}
      </>
    );
  }

  return (
    <>
      <AddFileButtonView {...props} />
    </>
  );
};

export default ButtonView;
