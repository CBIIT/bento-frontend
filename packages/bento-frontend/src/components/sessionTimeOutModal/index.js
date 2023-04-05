import React from 'react';
import {
  Modal,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: '328px',
    minWidth: '32%',
    borderRadius: '10px',
    border: '0.5px solid #000',
    backgroundColor: theme.palette.background.paper,
  },
  closeIcon: {
    cursor: 'pointer',
  },
  modalTitle: {
    fontFamily: 'lato',
    borderBottom: '1px solid #BDBFC2',
    fontSize: 20,
    color: '#4D6787',
    padding: '16px 32px 12px 32px',
    margin: '0px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    justifyContent: 'space-between',
    paddingRight: 33,
    paddingLeft: 33,
    paddingTop: 33,
    fontFamily: 'lato',
    textAlign: 'center',
  },
  modalBodyTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    paddingBottom: 25,
  },
  modalMessage: {
    fontSize: '17px',
    paddingBottom: 14,
  },
  modalFooter: {
    borderTop: '1px solid rgba(#000,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginLeft: '10px',
    marginRight: '10px',
    borderRadius: '10px',
    boxSizing: 'border-box',
    height: 38,
    width: 97,
    border: '1px solid #626262',
    fontSize: 11,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'lato',
    boxShadow: 'none',
  },
  modalRoot: {
    background: 'green',
  },
}));

const SessionTimeOutModal = ({
  closeModal, submit, title, message, ...modalProps
}, ref) => {
  const classes = useStyles();

  React.useImperativeHandle(ref, () => ({
    clear() {
    },
  }));

  const cancelModal = () => {
    closeModal();
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
        <h1 className={classes.modalTitle}>
          <span>{title}</span>
          <span
            className={classes.closeIcon}
            onClick={cancelModal}
          >
            <img style={{ height: 10, marginBottom: 2 }} src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/LocalFindCaseDeleteIcon.svg" alt="close icon" className={classes.closeRoot} />
          </span>
        </h1>
        <div className={classes.modalContainer}>
          <div className={classes.modalBodyTitle}>Your session has expired.</div>
          <br />
          <div className={classes.modalMessage}>Please login again to continue working.</div>
        </div>
        <div className={classes.modalFooter}>
          <Button
            variant="contained"
            color="primary"
            onClick={cancelModal}
            style={{ backgroundColor: '#566672' }}
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="blueGrey"
            onClick={() => { submit(); closeModal(); }}
            style={{ backgroundColor: '#437BBE' }}
            className={classes.button}
          >
            Login
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const sessionTimeOutModal = React.forwardRef(SessionTimeOutModal);

export default sessionTimeOutModal;
