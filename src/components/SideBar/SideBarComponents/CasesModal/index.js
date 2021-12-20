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
  getAllIds, uploadBulkModalSearch,
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

const FacetModal = ({ closeModal, type, ...modalProps }) => {
  const classes = useStyles();

  const [fileContent, setFileContent] = React.useState('');
  const [subjectIds, setSubjectIds] = React.useState([]);
  const [matchIds, setMatchIds] = React.useState([]);
  const [unmatchedIds, setUnmatchedIds] = React.useState([]);
  const [isClear, setIsClear] = React.useState(false);

  const submitCase = () => {
    uploadBulkModalSearch(unmatchedIds, 'subject');
    closeModal();
  };

  const clearData = () => {
    setFileContent('');
    setMatchIds([]);
    setUnmatchedIds([]);
    setIsClear(true);
  };

  const cancelModal = () => {
    closeModal();
    clearData();
  };

  // async function setInitIds() {
  //   const response = await getAllIds(type);
  //   if (response.subjectIds) {
  //     setSubjectIds(response.subjectIds);
  //   }
  // }

  async function handleContent(content) {
    // if (subjectIds.length === 0) {
    //   await setInitIds();
    // }
    if (content.trim()) {
      const matchData = [];
      const fileData = content && content.toString().split('\n');
      const newArr = [];
      fileData.map((file) => {
        const fileItemArray = file.split(',');
        // eslint-disable-next-line
        newArr.push.apply(newArr, fileItemArray);
        return newArr;
      });
      const unmatchData = [...newArr];
      subjectIds.map((subId) => newArr.filter((id, index) => {
        const trimId = id.trim();
        const trimSubId = subId.trim();
        if (trimId && trimSubId.toLowerCase() === trimId.toLowerCase()) {
          matchData.push(trimId);
          const isExist = unmatchData.findIndex((item) => (
            item.trim().toLowerCase() === trimSubId.toLowerCase()
          ));
          if (isExist > -1) {
            unmatchData.splice(isExist, 1);
          }
        } else if (!trimId) {
          unmatchData.splice(index, 1);
        }
        return matchData;
      }));
      setMatchIds(matchData);
      setUnmatchedIds(unmatchData);
    }
  }

  const handleChange = ({ target: { value } }) => { setFileContent(value); handleContent(value); };

  const handleFileUpload = (content) => {
    setIsClear(false);
    setFileContent(content);
    handleContent(content);
  };

  React.useEffect(() => {
    (async () => {
      const response = await getAllIds(type);
      if (response.subjectIds) {
        setSubjectIds(response.subjectIds);
      }
    })();
  }, []);

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
            onChange={handleChange}
            placeholder="eg. BENTO-CASE-06, BENTO-CASE-22"
          />
          <div className={classes.uploadFile}>
            <p>Or choose a file to upload</p>
            <FileUploader onFileUpload={handleFileUpload} isClear={isClear} />
          </div>
        </div>
        {fileContent && <SummaryTable matchedContent={matchIds} unmatchedContent={unmatchedIds} />}
        <div className={classes.modalFooter}>
          <Button variant="contained" color="primary" onClick={cancelModal} className={classes.button}>Cancel</Button>
          <Button variant="contained" color="blueGrey" onClick={clearData} className={classes.button}>Clear</Button>
          <Button variant="contained" color="blueGrey" onClick={submitCase} className={classes.button}>Submit</Button>
        </div>
      </div>
    </Modal>
  );
};

export default FacetModal;
