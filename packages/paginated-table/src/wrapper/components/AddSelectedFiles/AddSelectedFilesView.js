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
      <img className="add_selected_file_tooltip_icon" src={icon || src} alt={alt} />
    </ToolTip>
  );
};

const AddSelectedFileComponent = (props) => {
  const {
    eventHandler,
    title,
    clsName,
    classes,
    disabled,
    tooltipCofig,
    buttonTooltipConfig,
  } = props;
  const { title: tooltipTitle, ...tooltipProps } = buttonTooltipConfig || {};

  const addFiles = () => {
    eventHandler();
  };

  return (
    <>
      <ToolTip
        title={tooltipTitle || ''}
        classes={{
          tooltip: classes.customTooltip,
          arrow: classes.customArrow,
        }}
        {...tooltipProps}
      >
        <span className={classes.customTooltipSpan}>
          <Button
            onClick={addFiles}
            className={clsName}
            disableRipple
            disabled={disabled}
            style={{ margin: '0px' }}
          >
            {title}
          </Button>
        </span>
      </ToolTip>
      {tooltipCofig && (<ToolTipView classes={classes} {...props} />)}
    </>
  );
};

export default AddSelectedFileComponent;
