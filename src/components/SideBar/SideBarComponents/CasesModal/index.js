import React from 'react';
import {
  Modal,
  Button,
  Tooltip,
  makeStyles,
  Typography,
  TextareaAutosize,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import FileUploader from '../../../FileUploader';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minWidth: '50%',
    borderRadius: '10px',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    backgroundColor: theme.palette.background.paper,
  },
  modalTitle: {
    borderBottom: '1px solid rgba(#000,0.3)',
    paddingBottom: '10px',
  },
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadFile: {

  },
  modalFooter: {
    borderTop: '1px solid rgba(#000,0.3)',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
  button: {
    marginLeft: '10px',
    marginRight: '10px',
    borderRadius: '5px',
  },
  modalRoot: {
    background: 'rgba(0,0,0,0.2)',
  },
}));

const FacetModal = ({ closeModal, ...modalProps }) => {
  const classes = useStyles();

  const [fileContent, setFileContent] = React.useState('');

  const submitCase = () => {
    closeModal();
  };

  const handleFileUpload = (content) => {
    setFileContent(content);
  };

  return (
    <Modal
      {...modalProps}
      className={classes.modal}
      BackdropProps={{
        classes: {
          root: classes.modalRoot,
        },
      }}
    >
      <div className={classes.paper}>
        <h1 className={classes.modalTitle}>Upload Case Set</h1>
        <div className={classes.modalContainer}>
          <div className={classes.inputLabel}>
            <Typography>
              <p>Type or copy-and-paste a list of identifiers</p>
            </Typography>
            <Tooltip title="Add the case indentifier." placement="left-start">
              <HelpIcon />
            </Tooltip>
          </div>
          <TextareaAutosize
            minRows={4}
            maxRows={6}
            value={fileContent}
            name="caseDescription"
            placeholder="eg. TGCA blah blah blah...."
          />
          <div className={classes.uploadFile}>
            <p>Or choose a file to upload</p>
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
        </div>
        <div className={classes.modalFooter}>
          <Button variant="contained" color="primary" onClick={closeModal} className={classes.button}>Cancel</Button>
          <Button variant="contained" color="blueGrey" className={classes.button}>Clear</Button>
          <Button variant="contained" color="blueGrey" onClick={submitCase} className={classes.button}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default FacetModal;
