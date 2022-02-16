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
    marginBottom: 10,
  },
  button: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00387A',
    backgroundColor: '#fff',
    borderBottom: '4px solid #00387A',
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
    marginBottom: 10,
  },
  summary: {
    color: '#0D4A94',
    fontSize: 14,
    textAlign: 'center',
    margin: 0,
    paddingTop: 31,
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
  },
  header: {
    fontSize: 12,
    color: '#437BBE',
    textAlign: 'center',
    fontFamily: 'lato',
    paddingBottom: 10,
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
    <div className={classes.summaryContainer}>
      <p className={classes.summary}>
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
        >
          {`Matched - ${matchedContent.length}`}
        </span>
        <span
          className={!isMatched ? classes.button : classes.unselectedButton}
          onClick={() => setIsMatched(false)}
        >
          {`Unmatched - ${unmatchedContent.length}`}
        </span>
      </div>
      <div className={classes.tableBox}>
        {isMatched ? (
          matchedContent.length ? (
            <table className={classes.tableContainer}>
              <tr>
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
              <table className={classes.tableContainer}>
                <th className={classes.heading} style={{ textAlign: 'left' }}>SUBMITTED CASE ID</th>
                <tr className={classes.heading} style={{ width: '180' }}><Divider className={classes.divider} /></tr>
                {unmatchedContent.map((unmatched, id) => (
                  <tr key={id} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>
                    <td className={classes.tableColumn} style={{ textAlign: 'left' }}>{unmatched}</td>
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
