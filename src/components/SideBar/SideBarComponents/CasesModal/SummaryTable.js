import React from 'react';
import {
  Divider,
  makeStyles,
} from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  tableContainer: {
    border: '1px solid #c1c1c1',
    width: '-webkit-fill-available',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 16,
  },
  button: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00387A',
    backgroundColor: '#fff',
    borderBottom: '4px solid #437bbe',
    cursor: 'pointer',
    padding: '11px 22px',
    fontFamily: 'Lato',
    textTransform: 'uppercase',
  },
  unselectedButton: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00387A',
    backgroundColor: '#DEE0E2',
    cursor: 'pointer',
    padding: '11px 22px',
    fontFamily: 'Lato',
    textTransform: 'uppercase',
  },
  btnContainer: {
    marginBottom: 14,
  },
  summary: {
    color: '#0D4A94',
    fontSize: 14,
    textAlign: 'center',
    margin: 0,
    paddingTop: 10,
    fontFamily: 'Lato',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 300,
    color: '#000',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  arrowRight: {
    color: '#437BBE',
    fontSize: '2.5rem',
  },
  summaryContainer: {
    backgroundColor: '#CCD4DD',
    paddingLeft: 33,
    paddingRight: 33,
  },
  heading: {
    fontSize: 12,
    color: '#437BBE',
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'lato',
    fontWeight: 100,
    letterSpacing: 0.5,
  },
  header: {
    fontSize: 12,
    color: '#437BBE',
    textAlign: 'center',
    fontFamily: 'lato',
    paddingBottom: 10,
    fontWeight: 100,
    letterSpacing: 0.5,
  },
  programHeading: {
    textAlign: 'center',
  },
  divider: {
    backgroundColor: '#93C0F5',
    width: '100%',
  },
  dividerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  emptyCell: {
    width: 20,
  },
  tableColumn: {
    color: '#0D8662',
    textAlign: 'center',
  },
  tableBox: {
    maxHeight: 150,
    overflowY: 'auto',
  },
}
));

const SummaryTable = (props) => {
  const classes = useStyles();
  const { matchedContent, unmatchedContent } = props;
  const [isMatched, setIsMatched] = React.useState(true);

  return (
    <div
      className={classes.summaryContainer}
      id="uploadCaseSetSummarySection"
    >
      <p className={classes.summary} id="uploadCaseSetSummaryCount">
        {`${matchedContent.length + unmatchedContent.length} submitted Case IDs mapped to ${matchedContent.length} unique Bento Case IDs`}
      </p>
      <p className={classes.title}>
        Summary Table
        <ArrowRight className={classes.arrowRight} />
      </p>
      <div className={classes.btnContainer}>
        <span
          className={isMatched ? classes.button : classes.unselectedButton}
          onClick={() => setIsMatched(true)}
          id="uploadCaseSetMatched"
        >
          <span>Matched&nbsp;-&nbsp;</span>
          <span id="uploadCaseSetMatchedCount">
            {`${matchedContent.length}`}
          </span>
        </span>
        <span
          className={!isMatched ? classes.button : classes.unselectedButton}
          onClick={() => setIsMatched(false)}
          id="uploadCaseSetUnMatched"
        >
          <span>Unmatched&nbsp;-&nbsp;</span>
          <span id="uploadCaseSetUnMatchedCount">
            {`${unmatchedContent.length}`}
          </span>
        </span>
      </div>
      <div className={classes.tableBox}>
        {isMatched ? (
          matchedContent.length ? (
            <table className={classes.tableContainer} id="uploadCaseSetMatchedTable">
              <tr id="uploadCaseSetMatchedHeader">
                <th className={classes.header}>SUBMITTED CASE ID</th>
                <td className={classes.emptyCell} />
                <th className={classes.header}>ASSOCIATED PROGRAM</th>
              </tr>
              <tr className={classes.heading}>
                <td className={classes.columnPadding}><Divider style={{ width: '100%' }} className={classes.divider} /></td>
                <td className={classes.emptyCell} />
                <td className={classes.dividerContainer}>
                  <Divider className={classes.divider} />
                </td>
              </tr>
              {matchedContent.map((matched, id) => (
                <tr key={id}>
                  <td className={classes.tableColumn} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>{matched.subject_id}</td>
                  <td className={classes.emptyCell} />
                  <td className={classes.programHeading} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>{matched.program_id}</td>
                </tr>
              ))}
            </table>
          ) : null
        )
          : (
            unmatchedContent.length ? (
              <table className={classes.tableContainer} id="uploadCaseSetUnMatchedTable">
                <th id="uploadCaseSetUnMatchedHeader" className={classes.heading} style={{ textAlign: 'left', paddingLeft: 50 }}>SUBMITTED CASE ID</th>
                <tr className={classes.heading} style={{ width: '180' }}><Divider className={classes.divider} style={{ width: '48%' }} /></tr>
                {unmatchedContent.map((unmatched, id) => (
                  <tr key={id} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>
                    <td className={classes.tableColumn} style={{ textAlign: 'left', paddingLeft: 40 }}>{unmatched}</td>
                  </tr>
                ))}
              </table>
            ) : null
          )}
      </div>
    </div>
  );
};

export default SummaryTable;
