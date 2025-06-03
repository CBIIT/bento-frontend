import React, { useState } from 'react';
import ToolTip from '@bento-core/tool-tip';
import { Button } from '@material-ui/core';
import SnackbarView from '../Snackbar/Snackbar';
import AlertView from '../AddToCartDialog/AddToCartDialogAlertView';

const customTooltip = {
  border: '#03A383 1px solid',
};

const customArrow = {
  '&::before': {
    border: '#03A383 1px solid',
  },
};

const iconStyle = {
  paddingRight: '20px',
  paddingBottom: '20px',
  paddingLeft: '5px',
};

export const ToolTipView = (props) => {
  const {
    section,
    tooltipCofig,
  } = props;
  const {
    icon,
    src,
    alt,
    arrow = false,
    tooltipText,
  } = tooltipCofig;
  return (
    <ToolTip
      placement="top"
      title={tooltipText || `${tooltipCofig[section]}`}
      arrow={arrow}
      classes={{
        tooltip: customTooltip,
        arrow: customArrow,
      }}
    >
      <img src={icon || src} alt={alt} style={iconStyle} />
    </ToolTip>
  );
};

// const checkDuplicate = (cartFiles, ids) => {
//   const newIds = [];
//   for (let i = 0; i < ids.length; i += 1) {
//     if (!cartFiles.includes(ids[i])) {
//       newIds.push(ids[i]);
//     }
//   }
//   return newIds;
// };

const checkDuplicate = (cartFiles, ids) => (ids.filter((id) => !cartFiles[id]));

const AddToCartView = (props) => {
  const {
    cartFiles,
    fileId,
    buttonStyle,
    addFiles,
    count,
  } = props;

  // const [isDataloading, setIsDataloading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [displayAlter, setAlterDisplay] = useState(false);

  const cartFilesDict = {};
  cartFiles.forEach((file) => { cartFilesDict[file] = true; });

  // const backdropCls = {
  //   width: '100%',
  //   zIndex: 99999,
  //   background: 'rgba(0, 0, 0, 0.1)',
  // };
  /**
  * verify and set file ids
  */
  const addAllFiles = () => {
    const idsInitial = fileId || [];
    const ids = [idsInitial];
    const fileCount = ids.length;
    const upperLimit = 200000;
    const cartCount = cartFiles.length;
    if (fileCount <= upperLimit && cartCount < upperLimit) {
      const newIds = checkDuplicate(cartFiles, ids);
      console.log(newIds);
      if (cartCount + newIds.length <= upperLimit) {
        addFiles(newIds);
        setOpenSnackbar(true);
      } else {
        setAlterDisplay(true);
      }
    } else {
      setAlterDisplay(true);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={addAllFiles}
        disableRipple
        style={buttonStyle}
        disabled={false}
      >
        ADD TO CART
      </Button>
      <SnackbarView
        open={openSnackbar}
        count={count}
        onClose={() => setOpenSnackbar(false)}
      />
      {displayAlter && (
        <AlertView
          alertMessage="The cart is limited to 200,000 files. Please narrow the search criteria or remove some files from the cart to add more."
          open={displayAlter}
          onClose={() => setAlterDisplay(false)}
        />
      )}
    </>
  );
};

export default AddToCartView;
