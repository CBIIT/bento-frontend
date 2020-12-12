/* eslint-disable */
import React,{ useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '../../../components/AddToCartDialog';
import { addToCart, cartWillFull } from '../../fileCentricCart/store/cart';
import { fetchAllFileIDsForSelectAll, getFilesCount } from '../store/dashboardReducer';


const useStyles = makeStyles({
  button: {
    borderRadius: '10px',
    width: '100px',
    lineHeight: '37px',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontFamily: 'Lato',
    color: '#fff',
    backgroundColor: '#142D64',
    marginTop: '6px',
    marginBottom: '10px',
    marginRight: '24px',
  },
});


export default function SimpleDialogDemo() {
  
  const classes = useStyles();
  const childRef = useRef();

  const handleClickOpen = () => {
    childRef.current.open();
  };

  const handleClose = () => {
    childRef.current.close();
  };

  async function exportFiles() {
    // Find the newly added files by comparing
    const getAllFilesData = await fetchAllFileIDsForSelectAll(getFilesCount());
    const selectedIDs = getAllFilesData.reduce((accumulator, currentValue) => {
      const { files } = currentValue;
      // check if file
      if (files && files.length > 0) {
        return accumulator.concat(files.map((f) => f.file_id));
      }
      return accumulator;
    }, []);
    addToCart({ fileIds: selectedIDs });
    handleClose();
  }


 const numberOfFilesSelected = getFilesCount();
 const OnYesClick = ()=>{ exportFiles();};
 const onNoClick = ()=>{handleClose(); };

  return (
    <>
      <button type="button" onClick={handleClickOpen} className={classes.button}>
        Select All
      </button>
      <Dialog 
      ref={childRef} 
      onYesClick= {OnYesClick}
      onNoClick={onNoClick}
      numberOfFilesSelected={numberOfFilesSelected}
      cartWillFull={cartWillFull(numberOfFilesSelected)}
      />
    </>
  );
}
