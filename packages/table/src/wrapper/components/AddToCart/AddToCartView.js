import React, { useState } from 'react';
import ToolTip from '@bento-core/tool-tip';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';
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
  $participant_ids: [String],
){
  fileIDsFromList (          
      participant_ids: $participant_ids,
  ) 
}
  `;

const CPIFilesComponent = (props) => {
  const {
    cartFiles,
    fileId,
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
    let toAdd = [];
    if (btnType === 'ADD_ALL_FILES') {
      participantIds.forEach((e) => {
        if (e.data_type === 'internal' && e.p_id) {
          toAdd = toAdd.concat(e.p_id);
        }
        toAdd = toAdd.concat(rowID);
      });
    } else {
      toAdd = participantIds.concat(rowID);
    }
    const idsInitial = response[responseKeys[0]] || [];
      console.log(idsInitial);
      const ids = [...new Set(idsInitial)];
      const fileCount = ids.length;
      if (fileCount <= upperLimit && cartCount < upperLimit) {
        if (cartCount + ids.length <= upperLimit) {
          setOpen(true);
          setAddFilesId(ids);
        } else {
          const newIds = checkDuplicate(cartFiles, ids);
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
        disabled={false}
      >
        {title}
      </Button>
      <SnackbarView
        open={openSnackbar}
        count={count}
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

export default CPIFilesComponent;
