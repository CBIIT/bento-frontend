import React from 'react';
// eslint-disable-next-line import/no-unresolved
import ToolTip from '@bento-core/tool-tip';

/**
* customize tooltips based on tooltipContent
* defined on dashboardTabData (tooltipContent)
*/
const ToolTipView = (props) => {
  const {
    section,
    tooltipCofig,
    classes,
  } = props;

  const {
    icon,
    alt,
    arrow = false,
    clsName,
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
      {icon && (<img src={icon} alt={alt} className={clsName} />)}
    </ToolTip>
  );
};

export default ToolTipView;
