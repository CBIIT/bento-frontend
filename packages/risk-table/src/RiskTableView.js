import React from 'react';
import { withStyles } from '@material-ui/core';

/**
 * Risk Table component displays survival data for multiple cohorts over time intervals
 *
 * @param {object} classes - Material-UI classes
 * @param {array} cohorts - Array of cohort data objects
 * @param {string} cohorts[].id - Cohort identifier
 * @param {string} cohorts[].name - Cohort display name
 * @param {string} cohorts[].color - Color for the cohort indicator circle (hex or color name)
 * @param {object} cohorts[].data - Object with time intervals as keys and values as numbers
 * @param {string} percentage - Percentage value to display (e.g., "80.0%")
 * @param {array} timeIntervals - Array of time interval labels
 *   (e.g., ["0 Months", "6 Months", ...])
 *
 * @returns {object} A React component
 */
const RiskTable = ({
  classes,
  cohorts = [],
  percentage = '80.0%',
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
      id,
      name,
      color,
      data = {},
    } = cohort;

    return (
      <tr className={classes.cohortRow}>
        <td className={classes.cohortCell}>
          <div className={classes.cohortIndicator}>
            <div
              className={classes.cohortCircle}
              style={{ backgroundColor: color }}
            />
            <span className={classes.cohortName}>{name || `Cohort ${id}`}</span>
          </div>
        </td>
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
      <div className={classes.percentageTopLeft}>{percentage}</div>
      <table className={classes.table}>
        <thead>
          <tr className={classes.headerRow}>
            <th className={classes.firstHeaderCell} aria-label="Cohort" />
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
      <div className={classes.percentageBottomLeft}>{percentage}</div>
    </div>
  );
};

/**
 * Default styles for the Risk Table component
 */
const styles = () => ({
  container: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Nunito, sans-serif',
  },
  percentageTopLeft: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#333333',
  },
  percentageBottomLeft: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#333333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '30px',
    marginBottom: '30px',
  },
  headerRow: {
    backgroundColor: '#FFFFFF',
  },
  firstHeaderCell: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: '#333333',
    border: 'none',
    fontFamily: 'Nunito, sans-serif',
  },
  secondHeaderCell: {
    position: 'relative',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: '#333333',
    border: '2px solid #080202ff',
    fontFamily: 'Nunito, sans-serif',
    paddingLeft: '16px',
    paddingRight: '16px',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-20px',
      bottom: '-1.5px',
      height: '1px',
      width: '25px',
      backgroundColor: '#080101ff',
    },
  },
  headerCell: {
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: 600,
    color: '#333333',
    border: '2px solid #080202ff',
    fontFamily: 'Nunito, sans-serif',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  cohortRow: {
    position: 'relative',
    '&:hover': {
      backgroundColor: '#F9F9F9',
    },
  },
  cohortCell: {
    padding: '12px 16px',
    verticalAlign: 'middle',
  },
  cohortIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  cohortCircle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
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
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '-20px',
      bottom: '-1.5px',
      height: '1px',
      width: '25px',
      backgroundColor: '#080101ff',
    },
  },
  dataCell: {
    padding: '12px 16px',
    textAlign: 'right',
    fontSize: '13px',
    color: '#333333',
    fontFamily: 'Nunito, sans-serif',
    border: '2px solid #080101ff',
  },
});

RiskTable.defaultProps = {
  classes: {},
  cohorts: [],
  percentage: '80.0%',
  timeIntervals: ['0 Months', '6 Months', '12 Months', '18 Months', '24 Months', '30 Months', '36 Months'],
};

const StyledRiskTable = withStyles(styles)(RiskTable);
export default StyledRiskTable;
