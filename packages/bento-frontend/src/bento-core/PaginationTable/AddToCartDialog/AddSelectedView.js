import React, { useState } from 'react';
import { ToolTip } from 'bento-components';
import { Button, Snackbar } from '@material-ui/core';
import SuccessOutlinedIcon from './SuccessOutlined';

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
    value = 0,
    disabled,
    tooltipCofig,
  } = props;

  const [open, setOpen] = useState(false);
  const addFiles = () => {
    setOpen(true);
    eventHandler();
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  function closeSnack() {
    setOpen(false);
  }
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
      <Snackbar
        className="snackBar"
        open={open}
        closeSnack={closeSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        message={(
          <div className="snackBarMessage">
            <span className="snackBarMessageIcon">
              <SuccessOutlinedIcon />
              {' '}
            </span>
            <span className="snackBarText">
              {value}
              {' '}
              File(s) successfully added to your cart
            </span>
          </div>
        )}
      />
    </>
  );
};

export default AddSelectedFileComponent;
