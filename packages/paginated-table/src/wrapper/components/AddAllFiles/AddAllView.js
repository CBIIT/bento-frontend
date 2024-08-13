import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import ToolTip from '@bento-core/tool-tip/src/ToolTip';
import clsx from 'clsx';
import { getFilesID } from '../../WrapperService';
import AddToCartDialogView from '../AddToCartDialog/AddToCartDialogView';
import ToolTipView from '../TooltipView';
import addFilesResponseHandler from '../util';

const AddAllFilesComponent = (props) => {
  const {
    title,
    clsName,
    classes,
    section,
    addFileQuery,
    responseKeys,
    activeFilters,
    addFiles,
    setAlterDisplay,
    setOpenSnackbar,
    client,
    tooltipCofig,
    buttonTooltipConfig,
    maxFileLimit = 1000,
    DisplayCustomText,
  } = props;

  const { title: tooltipTitle, ...tooltipProps } = buttonTooltipConfig || {};
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
    let filesInCart = 0;
    if (localStorage.getItem('CartFileIds')) {
      const filesId = JSON.parse(localStorage.getItem('CartFileIds')) || [];
      filesInCart = filesId.length;
    }

    fileIds().then((response) => {
      const data = response[responseKeys[0]];
      if (data && data.length > 0) {
        const ids = addFilesResponseHandler(response, responseKeys);
        if (ids.length + filesInCart > maxFileLimit) {
          setAlterDisplay(true);
        } else {
          setOpen(true);
          setAddFilesId(ids);
        }
      } else {
        setOpen(true);
      }
      return [];
    });
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
      <ToolTip
        title={tooltipTitle || ''}
        classes={{
          tooltip: classes.customTooltip,
          arrow: classes.customArrow,
        }}
        {...tooltipProps}
      >
        <Button
          onClick={addAllFiles}
          className={clsx(clsName, `${clsName}_${section}`)}
          disableRipple
        >
          {title}
        </Button>
      </ToolTip>
      {tooltipCofig && (<ToolTipView {...props} />)}
      <AddToCartDialogView
        open={openAddDialog}
        onYesClick={addFilesToCart}
        onNoClick={toggleOpen}
        DisplayCustomText={DisplayCustomText}
        activeFilters={activeFilters}
      />
    </>
  );
};

export default AddAllFilesComponent;
