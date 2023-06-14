# Overview

This component provides a Bento-oriented implementation of the <https://uber.github.io/react-vis/documentation/other-charts/sunburst-diagram> sunburst chart. See below for basic usage.

# Usage

## Quick Start

<details>
  <summary>Basic Usage</summary>

  ```javascript
  // Import the component generator
  import { SunburstChartGenerator } from '...'; // Note: Update ... to the component path

  // Initialize the component with default options
  // Generator will use DEFAULT_CONFIG_SUNBURST by default
  const { SunburstChart } = SunburstChartGenerator();

  const dataset = {
    key: 'example-123-456',
    title: 'root',
    color: '#274fa5',
    children: [
      {
        title: 'TAILORx',
        color: '#7dc242',
        caseSize: 1000,
        children: [
          {
            title: 'TAILORx : C',
            color: '#057ebd',
            caseSize: 347,
            size: 347,
            style: {
              fillOpacity: 1,
            },
          },
          {
            title: 'TAILORx : B',
            color: '#f78f48',
            caseSize: 310,
            size: 310,
            style: {
              fillOpacity: 0.2,
            },
          },
          {
            title: 'TAILORx : D',
            color: '#79287c',
            caseSize: 175,
            size: 175,
            style: {
              fillOpacity: 0.2,
            },
          },
          {
            title: 'TAILORx : A',
            color: '#0e3151',
            caseSize: 168,
            size: 168,
            style: {
              fillOpacity: 0.2,
            },
          },
        ],
        style: {
          fillOpacity: 0.7,
        },
      },
    ],
    style: {
      fillOpacity: 0.7,
    },
  };

  // Use chart somewhere
  const chart = (<SunburstChart
    data={dataset}
    sliceTitle={'Cases'}
    width={250}
    height={173}
    titleLocation={'bottom'}
    titleAlignment={'center'}
  />);
  ```

</details>

<details>
  <summary>Ready-To-Go Example</summary>

  If you would like code you can copy-and-paste to test out the component, see below.
  This example provides a wrapper (`<SunburstChartUsage />`) for the chart with a example dataset.

  **Note**: You may need to update the import paths.

  ### App.js

  ```javascript
  import SunburstChartUsage from './SunburstChartUsage';

  // ... now use the example component <SunburstChartUsage /> somewhere in your app
  ```

  ### SunburstChartUsage.js

  ```javascript
  import React from 'react';
  import { SunburstChartGenerator, DEFAULT_CONFIG_SUNBURST } from './SunburstChart/SunburstChartGenerator';

  // For this example, I'm using DEFAULT_CONFIG_SUNBURST
  // You can override the default options or pass null to the generator
  // The generator handles partial configs, too (i.e. custom styles but not functions)
  const { SunburstChart } = SunburstChartGenerator(DEFAULT_CONFIG_SUNBURST);

  const SunburstChartUsage = () => {
  const dataset = {
      key: 'example-123-456',
      title: 'root',
      color: '#274fa5',
      children: [
        {
          title: 'TAILORx',
          color: '#7dc242',
          caseSize: 1000,
          children: [
            {
              title: 'TAILORx : C',
              color: '#057ebd',
              caseSize: 347,
              size: 347,
              style: {
                fillOpacity: 1,
              },
            },
            {
              title: 'TAILORx : B',
              color: '#f78f48',
              caseSize: 310,
              size: 310,
              style: {
                fillOpacity: 0.2,
              },
            },
            {
              title: 'TAILORx : D',
              color: '#79287c',
              caseSize: 175,
              size: 175,
              style: {
                fillOpacity: 0.2,
              },
            },
            {
              title: 'TAILORx : A',
              color: '#0e3151',
              caseSize: 168,
              size: 168,
              style: {
                fillOpacity: 0.2,
              },
            },
          ],
          style: {
            fillOpacity: 0.7,
          },
        },
      ],
      style: {
        fillOpacity: 0.7,
      },
    };

    return (
      <SunburstChart
        data={data}
        sliceTitle={'Cases'}
        width={185}
        height={210}
        titleLocation="bottom"
        titleAlignment="center"
      />
    );
  };

  export default SunburstChartUsage;
  ```

</details>

## Generator Configuration

See the available `DEFAULT_CONFIG_SUNBURST` object to understand the component generator options. You can choose to override `styles` or `functions` together or independently. You DO NOT need to override all of the options if
you don't want to. The component generator will only use the options you provide, and attempt to use the default otherwise.

```javascript
const DEFAULT_CONFIG_SUNBURST = {}
```

# Exports

The SunburstChart component exports the following components and objects by default. You may use them as necessary.

- `DEFAULT_CONFIG_SUNBURST` - A default configuration object used by the component
- `SunburstChartGenerator(uiConfig = DEFAULT_CONFIG_SUNBURST)` - The component generator function

# Props

This SunburstChart component, which is generated by the provided generator, accepts the following props directly. The default value is specified, along with the possible values.

```javascript
<SunburstChart
  data={[]}               // your dataset
  sliceTitle=""           // The title for each slice (e.g. Cases, Observations)
  titleLocation="top"     // top, bottom
  titleAlignment="center" // left, right, center
  width={0}
  height={0}
  padAngle={0}            // the padding between cells
/>
```
