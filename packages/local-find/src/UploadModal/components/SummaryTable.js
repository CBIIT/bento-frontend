/* eslint-disable arrow-body-style */
/* eslint-disable padded-blocks */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Divider, Typography, withStyles } from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowRight';
import clsx from 'clsx';

/**
 * Creates a simple tabbed table to display the matched case IDs
 * for an uploaded file.
 *
 * @param {object} props
 * @param {object} props.classes - Material UI styles
 * @param {array} props.matched - Array of matched case IDs
 * @param {array} props.unmatched - Array of unmatched case IDs
 * @param {string|null} props.error - Error message to display
 * @returns {JSX.Element}
 */
const SummaryTable = (props) => {
  const {
    classes, matched, unmatched, error = null,
  } = props;

  const [tab, setTab] = useState('matched');

  return (
    <div className={classes.summaryContainer} id="uploadCaseSetSummarySection">
      <p className={classes.summary} id="uploadCaseSetSummaryCount">
        {`${matched.length + unmatched.length} submitted Case IDs mapped to ${matched.length} unique Bento Case IDs`}
      </p>
      {error ? (
        <Typography className={clsx(classes.summary, classes.error)}>
          {error}
        </Typography>
      ) : null}
      <p className={classes.title}>
        Summary Table
        <ArrowRight className={classes.arrowRight} />
      </p>
      <div className={classes.btnContainer}>
        <span
          className={tab === 'matched' ? classes.summaryButton : classes.unselectedButton}
          onClick={() => setTab('matched')}
          id="uploadCaseSetMatched"
        >
          <span>Matched&nbsp;-&nbsp;</span>
          <span id="uploadCaseSetMatchedCount">
            {matched.length}
          </span>
        </span>
        <span
          className={tab === 'unmatched' ? classes.summaryButton : classes.unselectedButton}
          onClick={() => setTab('unmatched')}
          id="uploadCaseSetUnMatched"
        >
          <span>Unmatched&nbsp;-&nbsp;</span>
          <span id="uploadCaseSetUnMatchedCount">
            {unmatched.length}
          </span>
        </span>
      </div>
      <div className={classes.tableBox}>
        {tab === 'matched' ? (
          matched.length ? (
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
              {matched.map((data, id) => (
                <tr key={id}>
                  <td className={classes.tableColumn} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>{data.subject_id}</td>
                  <td className={classes.emptyCell} />
                  <td className={classes.programHeading} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>{data.program_id}</td>
                </tr>
              ))}
            </table>
          ) : null
        )
          : (
            unmatched.length ? (
              <table className={classes.tableContainer} id="uploadCaseSetUnMatchedTable">
                <th id="uploadCaseSetUnMatchedHeader" className={classes.heading} style={{ textAlign: 'left', paddingLeft: 50 }}>SUBMITTED CASE ID</th>
                <tr className={classes.heading} style={{ width: '180' }}><Divider className={classes.divider} style={{ width: '48%' }} /></tr>
                {unmatched.map((data, id) => (
                  <tr key={id} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>
                    <td className={classes.tableColumn} style={{ textAlign: 'left', paddingLeft: 40 }}>{data}</td>
                  </tr>
                ))}
              </table>
            ) : null
          )}
      </div>
    </div>
  );
};

/**
 * Default styles for the component.
 */
const styles = () => ({
  tableContainer: {
    border: '1px solid #c1c1c1',
    width: '-webkit-fill-available',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 16,
  },
  summaryButton: {
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
    height: 1,
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
    maxWidth: '646px',
  },
  error: {
    color: 'red',
  },
});

export default withStyles(styles, { withTheme: true })(SummaryTable);
