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
  cohortNameCharLimit = 18,
}) => {
  const hasData = cohorts && cohorts.length > 0;
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

    const showTooltip = cohortDisplayName.length > cohortNameCharLimit;
    return (
      <tr className={classes.cohortRow}>
        <td className={classes.cohortCell}>
          <div className={classes.cohortIndicator}>
            {showTooltip ? (
              <Tooltip
                title={cohortDisplayName}
                placement="top"
                classes={{ tooltip: classes.whiteTooltip }}
              >
                <span className={classes.cohortName}>
                  {showTooltip && `${cohortDisplayName.slice(0, cohortNameCharLimit)}...`}
                </span>
              </Tooltip>
            ) : (
              <span className={classes.cohortName}>{cohortDisplayName}</span>
            )}
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
              <div className={classes.cellContent}>{value}</div>
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className={classes.container}>
      {!hasData && (
        <div className={classes.noDataMessage}>No data provided</div>
      )}
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
          {hasData ? (
            cohorts.map((cohort, index) => (
              <CohortRow
                key={cohort.id || index}
                cohort={cohort}
              />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, rowIndex) => (
              <tr key={rowIndex} className={classes.cohortRow}>
                <td className={classes.cohortCell} style={rowIndex === 0 ? { borderTop: 'none' } : {}}>
                  <div style={{ height: '5px' }} />
                </td>
                <td className={classes.emptyDataCell} />
                {Array.from({ length: 7 }).map((__, colIndex) => (
                  <td
                    key={colIndex}
                    className={colIndex === 0 && rowIndex !== 0
                      ? classes.secondDataCell
                      : classes.dataCell}
                  >
                    <div className={classes.cellContent} style={{ height: rowIndex === 0 ? '0px' : '10px' }}>&nbsp;</div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Default styles for the Risk Table component
 */
const styles = () => ({
  noDataMessage: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 600,
    color: '#666666',
    fontFamily: 'Nunito, sans-serif',
    marginBottom: '10px',
    marginTop: '10px',
    position: 'absolute',
    top: '45%',
    left: '50%',
  },
  whiteTooltip: {
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
    fontSize: 13,
    border: '1px solid #598ac5',
    maxWidth: 235,
  },
  container: {
    position: 'relative',
    fontFamily: 'Nunito, sans-serif',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '30px',
    marginBottom: '30px',
  },
  headerRow: {
    backgroundColor: 'transparent',
  },
  firstHeaderCell: {
    textAlign: 'left',
    fontSize: '10px',
    fontWeight: 600,
    color: '#333333',
    border: 'none',
    fontFamily: 'Nunito, sans-serif',
    width: '130px',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  emptyHeaderCell: {
    width: '15px',
    borderBottom: '1px solid #666666',
    padding: 0,
  },
  secondHeaderCell: {
    position: 'relative',
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: 700,
    color: '#3A7587',
    border: '1px solid #666666',
    fontFamily: 'Nunito, sans-serif',
    lineHeight: '10px',
    letterSpacing: '0.02em',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerCell: {
    textAlign: 'center',
    fontSize: '10px',
    fontWeight: 700,
    color: '#3A7587',
    border: '1px solid #666666',
    fontFamily: 'Nunito, sans-serif',
    lineHeight: '10px',
    letterSpacing: '0.02em',
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
    width: '130px',
  },
  emptyDataCell: {
    borderBottom: '1px solid #666666',
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
  cellContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  secondDataCell: {
    position: 'relative',
    padding: '12px 16px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '11px',
    lineHeight: '11px',
    letterSpacing: 0,
    color: '#333333',
    fontFamily: 'Nunito, sans-serif',
    border: '1px solid #666666',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  dataCell: {
    padding: '12px 16px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: '11px',
    lineHeight: '11px',
    letterSpacing: 0,
    color: '#333333',
    fontFamily: 'Nunito, sans-serif',
    border: '1px solid #666666',
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
  cohortNameCharLimit: 18,
};

const StyledRiskTable = withStyles(styles)(RiskTable);
export default StyledRiskTable;
