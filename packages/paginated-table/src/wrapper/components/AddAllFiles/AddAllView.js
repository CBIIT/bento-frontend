import React, { useState } from 'react';
import ToolTip from '@bento-core/tool-tip';
import { Button } from '@material-ui/core';
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

const checkDuplicate = (cartFiles, ids) => {
  let duplicateCount = 0;
  for (let i = 0; i < cartFiles.length; i += 1) {
    if (ids.includes(cartFiles[i])) {
      duplicateCount += 1;
    }
  }
  return duplicateCount;
};

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

  /**
  * verify and set file ids
  */
  const addAllFiles = () => {
    const fileIds = getFilesID({
      client,
      variables: activeFilters,
      query: addFileQuery,
    });
    const cartCount = cartFiles.length;
    if (fileCount <= 6000 && cartCount < 6000) {
      fileIds().then((response) => {
        const data = response[responseKeys[0]];
        if (data && data.length > 0) {
          const isArray = Array.isArray(data[0][responseKeys[1]]);
          const idsInitial = data.reduce((acc, id) => {
            if (id && id[responseKeys[1]]) {
              // if object convert to array
              const items = isArray ? id[responseKeys[1]] : [id[responseKeys[1]]];
              acc.push(...items);
            }
            return acc;
          }, []);
          const ids = [...new Set(idsInitial)];
          if (cartCount + ids.length <= 6000) {
            setOpen(true);
            setAddFilesId(ids);
          } else {
            const duplicate = checkDuplicate(cartFiles, ids);
            if (cartCount + ids.length - duplicate <= 6000) {
              setOpen(true);
              setAddFilesId(ids);
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
    </>
  );
};

export default AddAllFilesComponent;
