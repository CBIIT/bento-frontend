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
    client,
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
    fileIds().then((response) => {
      const data = response[responseKeys[0]];
      if (data && data.length > 0) {
        const isArray = Array.isArray(data[0][responseKeys[1]]);
        const ids = data.reduce((acc, id) => {
          if (id && id[responseKeys[1]]) {
            // if object convert to array
            const items = isArray ? id[responseKeys[1]] : [id[responseKeys[1]]];
            acc.push(...items);
          }
          return acc;
        }, []);
        if (ids.length > 1000) {
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
