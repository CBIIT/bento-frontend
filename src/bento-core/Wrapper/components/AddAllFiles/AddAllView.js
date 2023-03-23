import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import { getFilesID } from '../../WrapperService';
import AddToCartDialogView from '../AddToCartDialog/AddToCartDialogView';

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
      variables: activeFilters,
      query: addFileQuery,
    });
    fileIds().then((response) => {
      const data = response[responseKeys[0]];
      if (data && data.length > 0) {
        const ids = data.reduce((acc, id) => {
          acc.push(...id[responseKeys[1]]);
          return acc;
        }, []);
        if (ids.length > 1000) {
          setAlterDisplay(true);
        } else {
          setOpen(true);
          setAddFilesId(ids);
        }
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
      <Button
        onClick={addAllFiles}
        className={clsx(clsName, `${clsName}_${section}`)}
        disableRipple
      >
        {title}
      </Button>
      <AddToCartDialogView
        open={openAddDialog}
        onYesClick={addFilesToCart}
        onNoClick={toggleOpen}
      />
    </>
  );
};

export default AddAllFilesComponent;
