import React from 'react';
import { Button } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip';

/**
* customize tooltips based on tooltipContent
* defined on dashboardTabData (tooltipContent)
*/
export const ToolTipView = (props) => {
  const {
    section,
    tooltipCofig,
    classes,
  } = props;
  const {
    icon,
    src,
    alt,
    arrow = false,
    tooltipText,
    placement,
  } = tooltipCofig;
  return (
    <ToolTip
      placement={placement}
      title={tooltipText || `${tooltipCofig[section]}`}
      arrow={arrow}
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      <img src={icon || src} alt={alt} />
    </ToolTip>
  );
};

const AddSelectedFileComponent = (props) => {
  const {
    eventHandler,
    title,
    clsName,
    disabled,
    tooltipCofig,
  } = props;

  const addFiles = () => {
    eventHandler();
  };
  return (
    <>
      <Button
        onClick={addFiles}
        className={clsName}
        disableRipple
        disabled={disabled}
      >
        {title}
      </Button>
      {tooltipCofig && (<ToolTipView {...props} />)}
    </>
  );
};

export default AddSelectedFileComponent;
