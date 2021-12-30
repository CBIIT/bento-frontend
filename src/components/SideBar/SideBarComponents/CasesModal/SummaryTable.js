import React from 'react';
import {
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  tableContainer: {
    border: '1px solid #c1c1c1',
    width: '-webkit-fill-available',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 13,
  },
  button: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00387A',
    backgroundColor: '#fff',
    borderBottom: '5px solid #00387A',
  },
  unselectedButton: {
    fontSize: 12,
    fontWeight: 500,
    color: '#00387A',
    backgroundColor: '#DEE0E2',
  },
  summary: {
    color: '#0D4A94',
    fontSize: 14,
    textAlign: 'center',
    margin: 0,
    paddingTop: 31,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 300,
    color: '#000',
  },
  arrowRight: {
    color: '#437BBE',
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
  },
  programHeading: {
    textAlign: 'center',
  },
  divider: {
    backgroundColor: '#93C0F5',
    width: '80%',
  },
  dividerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  tableColumn: {
    color: '#0D8662',
    textAlign: 'center',
  },
  tableBox: {
    maxHeight: 150,
    overflowY: 'scroll',
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
      <div>
        <Button variant="contained" className={isMatched ? classes.button : classes.unselectedButton} onClick={() => setIsMatched(true)}>
          {`Matched ${matchedContent.length}`}
        </Button>
        <Button variant="contained" className={!isMatched ? classes.button : classes.unselectedButton} onClick={() => setIsMatched(false)}>
          {`Unmatched ${unmatchedContent.length}`}
        </Button>
      </div>
      <div className={classes.tableBox}>
        {isMatched ? (
          matchedContent.length ? (
            <table className={classes.tableContainer}>
              <tr>
                <th className={classes.heading}>SUBMITTED CASE ID</th>
                <th className={classes.heading}>ASSOCIATED PROGRAM</th>
              </tr>
              <tr className={classes.heading}>
                <td><Divider style={{ width: '100%' }} className={classes.divider} /></td>
                <td className={classes.dividerContainer}>
                  <Divider className={classes.divider} />
                </td>
              </tr>
              {matchedContent.map((matched, id) => (
                <tr key={id} style={id % 2 ? { backgroundColor: '#fff' } : { backgroundColor: '#F8F8F8' }}>
                  <td className={classes.tableColumn}>{matched.subject_id}</td>
                  <td className={classes.programHeading}>{matched.program_id}</td>
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
