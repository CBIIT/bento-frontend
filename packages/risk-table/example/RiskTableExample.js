import React from 'react';
import RiskTable from '@bento-core/risk-table';

/**
 * Example usage of the Risk Table component
 * This demonstrates how to use the RiskTable with sample data
 */
const RiskTableExample = () => {
  // Sample cohort data matching the screenshot
  const cohorts = [
    {
      id: '1',
      name: 'Cohort 12345...',
      color: '#ADD8E6', // Light blue
      data: {
        '0 Months': 122,
        '6 Months': 119,
        '12 Months': 95,
        '18 Months': 17,
        '24 Months': 10,
        '30 Months': 1,
        '36 Months': 0,
      },
    },
    {
      id: '2',
      name: 'Cohort 12345...',
      color: '#90EE90', // Light green
      data: {
        '0 Months': 421,
        '6 Months': 154,
        '12 Months': 84,
        '18 Months': 13,
        '24 Months': 9,
        '30 Months': 0.5,
        '36 Months': 0,
      },
    },
    {
      id: '3',
      name: 'Cohort 12345...',
      color: '#FFD700', // Light yellow/orange
      data: {
        '0 Months': 385,
        '6 Months': 210,
        '12 Months': 85,
        '18 Months': 11,
        '24 Months': 7,
        '30 Months': 0,
        '36 Months': 0,
      },
    },
  ];

  const timeIntervals = [
    '0 Months',
    '6 Months',
    '12 Months',
    '18 Months',
    '24 Months',
    '30 Months',
    '36 Months',
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#F5F5F5' }}>
      <h1 style={{ fontFamily: 'Nunito, sans-serif', marginBottom: '30px' }}>
        Risk Table Component Example
      </h1>
      <RiskTable
        cohorts={cohorts}
        percentage="80.0%"
        timeIntervals={timeIntervals}
      />
    </div>
  );
};

export default RiskTableExample;

