import React from 'react';
import {
  Button,
  Divider,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  tableContainer: {
    border: '1px solid #c1c1c1',
    width: '-webkit-fill-available',
    marginBottom: 10,
  },
  matchButton: {
    marginRight: 10,
  },
}
));

const SummaryTable = (props) => {
  const classes = useStyles();
  const { matchedContent, unmatchedContent } = props;
  const [isMatched, setIsMatched] = React.useState(true);

  return (
    <div>
      <p>
        Summary Table
        {matchedContent.length}
        {' '}
        matched,
        {unmatchedContent.length}
        {' '}
        unmatched
      </p>
      <div>
        <Button variant="contained" color={isMatched ? 'primary' : 'blueGrey'} className={classes.matchButton} onClick={() => setIsMatched(true)}>
          {`Matched ${matchedContent.length}`}
        </Button>
        <Button variant="contained" color={isMatched ? 'blueGrey' : 'primary'} onClick={() => setIsMatched(false)}>
          {`Unmatched ${unmatchedContent.length}`}
        </Button>
      </div>
      <Divider
        style={{
          backgroundColor: '#c1c1c1',
          height: '1px',
          margin: '10px 0px',
        }}
      />
      {isMatched ? (
        <table className={classes.tableContainer}>
          {matchedContent.map((matched, id) => (
            <tr key={id}>
              <td>{matched}</td>
            </tr>
          ))}
        </table>
      )
        : (
          <table className={classes.tableContainer}>
            {unmatchedContent.map((unmatched, id) => (
              <tr key={id}>
                <td>{unmatched}</td>
              </tr>
            ))}
          </table>
        )}
    </div>
  );
};

export default SummaryTable;
