import React, { useState } from 'react';
import ToolTip from '@bento-core/tool-tip';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';
import { getFilesID } from '../../WrapperService';
import AddToCartDialogView from '../AddToCartDialog/AddToCartDialogView';

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

const addFileQuery = gql`
query search (
  $pid: [String],
){
  fileIDsFromList (
      pid: $pid,
  )
}
  `;

const CPIFilesComponent = (props) => {
  const {
    title,
    btnType,
    clsName,
    section,
    addFiles,
    setAlterDisplay,
    setOpenSnackbar,
    client,
    tooltipCofig,
    cartFiles,
    participantIds,
    buttonStyle,
    rowID,
    onOptionClick,
  } = props;
  /**
  * conditionally display dialog view
  */
  const [openAddDialog, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!openAddDialog);
  const [addFilesId, setAddFilesId] = useState([]);
  // const [isDataloading, setIsDataloading] = useState(false);
  const responseKeys = ['fileIDsFromList'];

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
    if (typeof onOptionClick === 'function') {
      onOptionClick();
    }
    let toAdd = [];
    if (btnType === 'ADD_ALL_FILES') {
      // Always include the modal participant pid plus any internal CPI-mapped ids.
      toAdd = rowID ? [rowID] : [];
      participantIds.forEach((e) => {
        if (e.data_type === 'internal' && e.p_id) {
          toAdd = toAdd.concat(e.p_id);
        }
      });
    } else {
      toAdd = (rowID ? [rowID] : []).concat(participantIds);
    }
    toAdd = [...new Set(toAdd.filter((id) => typeof id === 'string' && id))];
    const fileIds = getFilesID({
      client,
      variables: { pid: toAdd },
      query: addFileQuery,
    });
    const upperLimit = 200000;
    const cartCount = cartFiles.length;
    if (cartCount < upperLimit) {
      fileIds().then((response) => {
        const idsInitial = response[responseKeys[0]] || [];
        const ids = [...new Set(idsInitial)];
        const fileCount = ids.length;
        if (fileCount <= upperLimit && cartCount < upperLimit) {
          if (cartCount + ids.length <= upperLimit) {
            setOpen(true);
            setAddFilesId(ids);
          } else {
            const newIds = checkDuplicate(cartFilesDict, ids);
            if (cartCount + newIds.length <= upperLimit) {
              setOpen(true);
              setAddFilesId(newIds);
            } else {
              setAlterDisplay(true);
            }
          }
        } else {
          setAlterDisplay(true);
        }
      });
    } else {
      setAlterDisplay(true);
    }
  };

  /**
  * use wrapper service to add files to cart
  */
  const addFilesToCart = () => {
    addFiles(addFilesId);
    toggleOpen();
    setOpenSnackbar(true);
  };

  return (
    <>
      <Button
        onClick={addAllFiles}
        className={clsx(clsName, `${clsName}_${section}`)}
        disableRipple
        style={buttonStyle}
        disabled={btnType === 'ADD_SELECTED_FILES' && participantIds.length === 0}
      >
        {title}
      </Button>
      {tooltipCofig && (<ToolTipView {...props} />)}
      <AddToCartDialogView
        open={openAddDialog}
        onYesClick={addFilesToCart}
        onNoClick={toggleOpen}
        dialogText={btnType === 'ADD_SELECTED_FILES' ? 'Are you sure to add selected files' : 'Are you sure to add All Files'}
      />
      {/* <Backdrop className={backdropCls} style={backdropCls} open={isDataloading}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </>
  );
};

export default CPIFilesComponent;
