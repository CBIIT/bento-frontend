# Risk Table Example

This directory contains an example demonstrating how to use the Risk Table component.

## Running the Example

1. Make sure the risk-table package is built:
   ```bash
   cd ..
   npm run build
   ```

2. Install dependencies:
   ```bash
   cd example
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser to `http://localhost:3000`

## Example Data

The example includes sample cohort data matching the screenshot:
- 3 cohorts with different colored indicators (light blue, light green, light yellow/orange)
- Data for 7 time intervals (0, 6, 12, 18, 24, 30, 36 months)
- Percentage display set to "80.0%"

## Files

- `RiskTableExample.js` - Main example component
- `index.js` - Entry point that renders the example
- `index.html` - HTML template
- `webpack.config.js` - Webpack configuration for bundling
- `package.json` - Dependencies and scripts

