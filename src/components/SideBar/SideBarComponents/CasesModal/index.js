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
import {
  uploadBulkModalSearch, getAllSubjectIds,
} from '../../../../pages/dashboardTab/store/dashboardReducer';
import FileUploader from '../../../FileUploader';
import SummaryTable from './SummaryTable';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    minWidth: '32%',
    borderRadius: '10px',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
  },
  closeIcon: {
    fontFamily: 'lato',
    fontWeight: 300,
    cursor: 'pointer',
  },
  modalTitle: {
    fontFamily: 'lato',
    borderBottom: '1px solid rgba(#000,0.3)',
    fontSize: 20,
    color: '#4D6787',
    padding: '17px 33px 12px 33px',
    margin: '0px',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: 33,
    paddingLeft: 33,
    backgroundColor: '#CCD4DD',
  },
  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadFile: {
    width: '49%',
    border: '1px solid white',
    margin: '20px 4px',
    padding: 10,
    textAlign: 'center',
  },
  orTitle: {
    position: 'fixed',
    color: '#437BBE',
    fontSize: 17,
    border: '1px solid #fff',
    borderRadius: '50%',
    padding: 8,
    width: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -41,
    backgroundColor: '#CCD4DD',
    fontFamily: 'Lato',
    fontWeight: 'bold',
  },
  textSection: {
    width: '49%',
    border: '1px solid white',
    margin: '20px 4px',
    padding: '7px 25px 13px 29px',
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
  uploadButton: {
    borderRadius: '5px',
    boxSizing: 'border-box',
    height: 38,
    border: '1px solid #626262',
    fontSize: 11,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#437BBE',
  },
  modalRoot: {
    background: 'rgba(0,0,0,0.2)',
  },
  textArea: {
    height: '151px !important',
    width: '100%',
    border: '1.5px solid #437BBE',
    borderRadius: 10,
    fontSize: 14,
    fontFamily: 'Lato',
    fontStyle: 'italic',
    color: '#437BBE',
    '&::placeholder': {
      fontSize: 11,
      fontFamily: 'Lato',
      fontStyle: 'italic',
      color: '#437BBE',
    },
  },
  listTitle: {
    fontWeight: 300,
    fontFamily: 'Nunito',
    color: 'black',
    fontSize: 16,
  },
  tooltipIcon: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12,
    marginLeft: 5,
  },
  horizontal: {
    height: 1,
    width: 214,
    border: '1px solid #FFFFFF',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
  },
  fileUploader: {
    justifyContent: 'center',
    marginTop: 5,
    display: 'block',
  },
  uploaderComponent: {
    paddingRight: 70,
  },
  fileName: {
    margin: 'unset',
    color: '#0D4A94',
    fontSize: 14,
  },
  fileNameContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  filesection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  refresh: {
    color: '#1F2F50',
    height: 14,
    cursor: 'pointer',
  },
}));

const FacetModal = ({
  closeModal, type, ...modalProps
}, ref) => {
  const classes = useStyles();

  const [fileContent, setFileContent] = React.useState('');
  const [matchIds, setMatchIds] = React.useState([]);
  const [unmatchedIds, setUnmatchedIds] = React.useState([]);
  const [isClear, setIsClear] = React.useState(false);
  const [uploadedFileName, setUploadedFileName] = React.useState('');

  const submitCase = () => {
    uploadBulkModalSearch(matchIds.map((obj) => obj.subject_id), 'subject');
    closeModal();
  };

  const clearData = () => {
    setFileContent('');
    setMatchIds([]);
    setUnmatchedIds([]);
    setIsClear(true);
  };

  React.useImperativeHandle(ref, () => ({
    clear() {
      clearData();
    },
  }));

  const cancelModal = () => {
    closeModal();
  };

  async function handleContent(content) {
    if (content.trim()) {
      const fileData = content && content.toString().split('\n');
      const newArr = [];
      fileData.map((file) => {
        const fileItemArray = file.split(',');
        const fileItems = [];
        fileItemArray.map((item) => {
          if (item && item.trim()) {
            const newItem = item.replace('\r', '');
            fileItems.push(newItem.trim());
          }
          return fileItems;
        });
        // eslint-disable-next-line
        newArr.push.apply(newArr, fileItems);
        return newArr;
      });
      const unmatchData = [...newArr];
      const unMatchedContent = [];
      const matchedSubIds = await getAllSubjectIds(unmatchData);
      unmatchData.map((subId) => {
        const trimSubId = subId.trim();
        const isExist = matchedSubIds.findIndex((item) => (
          item.subject_id.trim().toLowerCase() === trimSubId.toLowerCase()
        ));
        if (isExist <= -1) {
          const isItemExist = unMatchedContent.findIndex((item) => (
            item.toLowerCase() === trimSubId.toLowerCase()
          ));
          if (isItemExist <= -1) {
            unMatchedContent.push(trimSubId);
          }
        }
        return unmatchData;
      });
      setMatchIds(matchedSubIds);
      setUnmatchedIds(unMatchedContent);
    } else {
      setMatchIds([]);
      setUnmatchedIds([]);
    }
  }

  const handleChange = ({ target: { value } }) => { setFileContent(value); handleContent(value); };

  const handleFileUpload = (content, fileName) => {
    setIsClear(false);
    setFileContent(content);
    handleContent(content);
    setUploadedFileName(fileName);
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
          <span>Upload Case Set</span>
          <span className={classes.closeIcon} onClick={cancelModal}>x</span>
        </h1>
        <div className={classes.modalContainer}>

          <div className={classes.textSection}>
            <div className={classes.inputLabel}>
              <Typography>
                <p className={classes.listTitle}>Add a list of Case IDs:</p>
              </Typography>
              <Tooltip title="Add the case indentifier." placement="left-start" className={classes.tooltipIcon}>
                <HelpIcon />
              </Tooltip>
            </div>
            <TextareaAutosize
              value={fileContent}
              name="caseDescription"
              onChange={handleChange}
              placeholder="eg. BENTO-CASE-06, BENTO-CASE-22"
              className={classes.textArea}
            />
          </div>
          <div className={classes.uploadFile}>
            <div className={classes.orTitle}>or</div>
            <div className={classes.inputLabel}>
              <Typography>
                <p className={classes.listTitle}>Choose a file to upload:</p>
              </Typography>
              <Tooltip title="Add the case indentifier." placement="left-start" className={classes.tooltipIcon}>
                <HelpIcon />
              </Tooltip>
            </div>
            <FileUploader
              clearData={clearData}
              onFileUpload={handleFileUpload}
              isClear={isClear}
              uploadedFileName={uploadedFileName}
              classes={classes}
            />
          </div>
        </div>
        {fileContent && <SummaryTable matchedContent={matchIds} unmatchedContent={unmatchedIds} />}
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
            onClick={clearData}
            style={{ backgroundColor: '#437BBE' }}
            className={classes.button}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="blueGrey"
            onClick={submitCase}
            style={{ backgroundColor: '#03A383' }}
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const facetModal = React.forwardRef(FacetModal);

export default facetModal;
