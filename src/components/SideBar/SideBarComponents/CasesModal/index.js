/* eslint-disable */
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
  getAllIds,
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

const FacetModal = ({ closeModal,type, ...modalProps }) => {
  const classes = useStyles();

  const [fileContent, setFileContent] = React.useState('');
  const [subjectIds, setSubjectIds] = React.useState([]);
  const [matchIds, setMatchIds] = React.useState([]);
  const [unmatchedIds, setUnmatchedIds] = React.useState([]);

  const submitCase = () => {
    closeModal();
  };

  const handleContent = (content) => {
    const matchData = [];
    const fileData = content && content.toString().split('\n');
    const unmatchData = [...fileData];
    subjectIds.map((subId) => fileData.filter((id) => {
      if (subId.toLowerCase() === id.toLowerCase()) {
        matchData.push(id);
        const index = unmatchData.indexOf(subId);
        if (index > -1) {
          unmatchData.splice(index, 1);
        }
      }
      return matchData;
    }));
    setMatchIds(matchData);
    setUnmatchedIds(unmatchData);
  };

  const handleChange = ({ target: { value } }) => { setFileContent(value); handleContent(value); };

  const handleFileUpload = (content) => {
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
            <FileUploader onFileUpload={handleFileUpload} />
          </div>
        </div>
        {fileContent && <SummaryTable matchedContent={matchIds} unmatchedContent={unmatchedIds} />}
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
