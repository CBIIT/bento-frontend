import React, { useState } from 'react';
import ToolTip from '@bento-core/tool-tip';
import { Button, Backdrop, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { getFilesID } from '../../WrapperService';
import AddToCartDialogView from '../AddToCartDialog/AddToCartDialogView';

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

const AddAllFilesComponent = (props) => {
  const {
    title,
    clsName,
    section,
    addFileQuery,
    responseKeys,
    activeFilters,
    addFiles,
    setAlterDisplay,
    setOpenSnackbar,
    client,
    tooltipCofig,
    fileCount,
    cartFiles,
  } = props;
  /**
  * conditionally display dialog view
  */
  const [openAddDialog, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!openAddDialog);
  const [addFilesId, setAddFilesId] = useState([]);
  const [isDataloading, setIsDataloading] = useState(false);

  const cartFilesDict = {};
  cartFiles.forEach((file) => { cartFilesDict[file] = true; });

  const backdropCls = {
    width: '100%',
    zIndex: 99999,
    background: 'rgba(0, 0, 0, 0.1)',
  };

  /**
  * verify and set file ids
  */
  const addAllFiles = () => {
    const fileIds = getFilesID({
      client,
      variables: activeFilters,
      query: addFileQuery,
    });
    const upperLimit = 200000;
    const cartCount = cartFiles.length;
    if (fileCount <= upperLimit && cartCount < upperLimit) {
      setIsDataloading(true);
      fileIds().then((response) => {
        const data = response[responseKeys[0]];
        if (data && data.length > 0) {
          const isArray = Array.isArray(data[0][responseKeys[1]]);
          // const idsInitial = data.reduce((acc, id) => {
          //   if (id && id[responseKeys[1]]) {
          //     // if object convert to array
          //     const items = isArray ? id[responseKeys[1]] : [id[responseKeys[1]]];
          //     acc.push(...items);
          //   }
          //   return acc;
          // }, []);
          const idsInitial = [];
          data.forEach((item) => {
            if (item && item[responseKeys[1]]) {
              const items = isArray ? item[responseKeys[1]] : [item[responseKeys[1]]];
              items.forEach((it) => {
                idsInitial.push(it);
              });
            }
          });
          const ids = [...new Set(idsInitial)];
          if (cartCount + ids.length <= upperLimit) {
            setIsDataloading(false);
            setOpen(true);
            setAddFilesId(ids);
          } else {
            const newIds = checkDuplicate(cartFilesDict, ids);
            setIsDataloading(false);
            if (cartCount + newIds.length <= upperLimit) {
              setOpen(true);
              setAddFilesId(newIds);
            } else {
              setAlterDisplay(true);
            }
          }
        }
        return [];
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
      >
        {title}
      </Button>
      {tooltipCofig && (<ToolTipView {...props} />)}
      <AddToCartDialogView
        open={openAddDialog}
        onYesClick={addFilesToCart}
        onNoClick={toggleOpen}
      />
      <Backdrop className={backdropCls} style={backdropCls} open={isDataloading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default AddAllFilesComponent;
