import React from 'react';
import { withStyles, Tooltip } from '@material-ui/core';

/**
 * Risk Table component displays survival data for multiple cohorts over time intervals
 *
 * @param {object} classes - Material-UI classes
 * @param {array} cohorts - Array of cohort data objects
 * @param {string} cohorts[].id - Cohort identifier
 * @param {string} cohorts[].name - Cohort display name
 * @param {string} cohorts[].color - Color for the cohort indicator circle (hex or color name)
 * @param {object} cohorts[].data - Object with time intervals as keys and values as numbers
 * @param {array} timeIntervals - Array of time interval labels
 *   (e.g., ["0 Months", "6 Months", ...])
 *
 * @returns {object} A React component
 */
const RiskTable = ({
  classes,
  cohorts = [],
  timeIntervals = ['0 Months', '6 Months', '12 Months', '18 Months', '24 Months', '30 Months', '36 Months'],
}) => {
  /**
   * Render a cohort row with colored indicator and data values
   *
   * @param {object} cohort - Cohort data object
   *
   * @returns {object} A React component
   */
  const CohortRow = ({ cohort }) => {
    const {
      name,
      color,
      data = {},
    } = cohort;

    const cohortDisplayName = name || `Cohort ${cohort.id}`;

    return (
      <tr className={classes.cohortRow}>
        <td className={classes.cohortCell}>
          <div className={classes.cohortIndicator}>
            <Tooltip
              title={cohortDisplayName}
              placement="top"
            >
              <span className={classes.cohortName}>{cohortDisplayName}</span>
            </Tooltip>
            <div
              className={classes.cohortCircle}
              style={{ backgroundColor: color }}
            />
          </div>
        </td>
        <td className={classes.emptyDataCell} />
        {timeIntervals.map((interval, index) => {
          const value = data[interval] !== undefined ? data[interval] : '-';
          return (
            <td key={interval} className={index === 0 ? classes.secondDataCell : classes.dataCell}>
              {value}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className={classes.container}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.headerRow}>
            <th className={classes.firstHeaderCell} aria-label="Cohort" />
            <th className={classes.emptyHeaderCell} aria-label="Separator" />
            {timeIntervals.map((interval, index) => (
              <th
                key={interval}
                className={index === 0 ? classes.secondHeaderCell : classes.headerCell}
              >
                {interval}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cohorts.map((cohort, index) => (
            <CohortRow
              key={cohort.id || index}
              cohort={cohort}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Default styles for the Risk Table component
 */
const styles = () => ({
  container: {
    position: 'relative',
    fontFamily: 'Nunito, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    marginTop: '30px',
    marginBottom: '30px',
  },
  headerRow: {
    backgroundColor: 'transparent',
  },
  firstHeaderCell: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: '#333333',
    border: 'none',
    fontFamily: 'Nunito, sans-serif',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  emptyHeaderCell: {
    width: '15px',
    borderBottom: '2px solid #000000',
    padding: 0,
  },
  secondHeaderCell: {
    position: 'relative',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 600,
    color: '#333333',
    border: '2px solid #3e3c3cff',
    fontFamily: 'Nunito, sans-serif',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerCell: {
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 600,
    color: '#333333',
    border: '2px solid #080202ff',
    fontFamily: 'Nunito, sans-serif',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cohortRow: {
    position: 'relative',
    '&:hover': {
      backgroundColor: '#F9F9F9',
    },
  },
  cohortCell: {
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
  },
  emptyDataCell: {
    borderBottom: '2px solid #000000',
    padding: 0,
  },
  cohortIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  cohortCircle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
    border: '1px solid #555555',
  },
  cohortName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#333333',
    fontFamily: 'Nunito, sans-serif',
  },
  secondDataCell: {
    position: 'relative',
    padding: '12px 16px',
    textAlign: 'right',
    fontSize: '13px',
    color: '#333333',
    fontFamily: 'Nunito, sans-serif',
    border: '2px solid #080101ff',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  dataCell: {
    padding: '12px 16px',
    textAlign: 'right',
    fontSize: '13px',
    color: '#333333',
    fontFamily: 'Nunito, sans-serif',
    border: '2px solid #080101ff',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

RiskTable.defaultProps = {
  classes: {},
  cohorts: [],
  timeIntervals: ['0 Months', '6 Months', '12 Months', '18 Months', '24 Months', '30 Months', '36 Months'],
};

const StyledRiskTable = withStyles(styles)(RiskTable);
export default StyledRiskTable;
