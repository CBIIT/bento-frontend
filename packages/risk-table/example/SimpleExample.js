/**
 * Simple Risk Table Example
 * This file demonstrates the basic usage of the RiskTable component
 * 
 * To use this in your project:
 * 1. Import the RiskTable component
 * 2. Prepare your cohort data
 * 3. Render the component with the data
 */

import React from 'react';
import RiskTable from '@bento-core/risk-table';

// Example cohort data structure
const exampleCohorts = [
  {
    id: 'cohort-1',
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
    id: 'cohort-2',
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
    id: 'cohort-3',
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

// Default time intervals
const defaultTimeIntervals = [
  '0 Months',
  '6 Months',
  '12 Months',
  '18 Months',
  '24 Months',
  '30 Months',
  '36 Months',
];

// Basic usage example
function BasicExample() {
  return (
    <RiskTable
      cohorts={exampleCohorts}
      percentage="80.0%"
      timeIntervals={defaultTimeIntervals}
    />
  );
}

// Example with custom percentage
function CustomPercentageExample() {
  return (
    <RiskTable
      cohorts={exampleCohorts}
      percentage="95.5%"
      timeIntervals={defaultTimeIntervals}
    />
  );
}

// Example with custom time intervals
function CustomTimeIntervalsExample() {
  const customIntervals = [
    '0 Months',
    '3 Months',
    '6 Months',
    '9 Months',
    '12 Months',
  ];

  return (
    <RiskTable
      cohorts={exampleCohorts.slice(0, 2)} // Only first 2 cohorts
      percentage="75.0%"
      timeIntervals={customIntervals}
    />
  );
}

export {
  BasicExample,
  CustomPercentageExample,
  CustomTimeIntervalsExample,
  exampleCohorts,
  defaultTimeIntervals,
};

