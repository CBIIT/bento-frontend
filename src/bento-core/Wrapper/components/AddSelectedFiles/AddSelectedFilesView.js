import React from 'react';
import { ToolTip } from 'bento-components';
import { Button } from '@material-ui/core';

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
    alt,
    arrow = false,
  } = tooltipCofig;

  return (
    <ToolTip
      title={tooltipCofig[section]}
      arrow={arrow}
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      {icon && (<img src={icon} alt={alt} />)}
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
