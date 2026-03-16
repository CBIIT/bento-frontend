# Risk Table Component

The Risk Table component displays survival data for multiple cohorts over time intervals with colored indicators.

## Installation

```bash
npm install @bento-core/risk-table
```

## Usage

```javascript
import RiskTable from '@bento-core/risk-table';

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

function MyComponent() {
  return (
    <RiskTable
      cohorts={cohorts}
      timeIntervals={['0 Months', '6 Months', '12 Months', '18 Months', '24 Months', '30 Months', '36 Months']}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cohorts` | `array` | `[]` | Array of cohort data objects |
| `timeIntervals` | `array` | `['0 Months', '6 Months', ...]` | Array of time interval labels |

### Cohort Object Structure

```javascript
{
  id: string,           // Unique identifier for the cohort
  name: string,         // Display name (e.g., "Cohort 12345...")
  color: string,        // Color for the indicator circle (hex or color name)
  data: {               // Object with time intervals as keys
    '0 Months': number,
    '6 Months': number,
    // ... etc
  }
}
```

## Styling

The component uses Material-UI's `withStyles` for styling. You can override styles by passing custom classes through the `classes` prop.

## Features

- White background design
- Colored circle indicators for each cohort
- Time interval columns (0, 6, 12, 18, 24, 30, 36 months)
- Responsive table layout
- Hover effects on rows

