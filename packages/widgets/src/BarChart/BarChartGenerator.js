/* eslint-disable max-len */
import React from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export const DEFAULT_COLORS_EVEN = [
  '#0053A0',
  '#279BCC',
  '#62E5B6',
  '#FED339',
  '#A44B19',
  '#D6D8DF',
  '#EFA56F',
];

export const DEFAULT_COLORS_ODD = [
  '#0053A0',
  '#279BCC',
  '#62E5B6',
  '#FED339',
  '#A44B19',
  '#D6D8DF',
  '#EFA56F',
];

export const DEFAULT_CONFIG_DONUT = {
  // Styles used by the component and its children
  styles: {
    textColor: 'black',
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '12px',
    cellPadding: 2,
    showTotalCount: false,
    textOverflowLength: 20,
  },

  // Helper functions used by the component
  functions: {
    /**
     * Merge Props and return result of callback
     *
     * @param {object} props
     * @param {object} extraProps
     * @param {function} callback
     * @return {any} result of callback
     */
    mergeProps: (props, extraProps, callback) => (callback({ ...props, ...extraProps })),

    /**
     * Return last index of dataset
     *
     * @param {object|array} dataset
     * @returns {number} last index of array
     */
    getLastIndex: (dataset) => ((dataset.length !== undefined) ? dataset.length - 1 : 0),

    /**
     * Map dataset to {name, value} pairs
     *
     * Note:
     * - Called by Array.map()
     *
     * @param {object} data
     * @returns {object} {name, value}
     */
    mapData: (data) => ({ name: data.group, value: data.subjects }),

    /**
     * Generate an active shape element for the pie chart
     *
     * @param {*} props
     * @returns {JSX.Element}
     */
  },

  // Color scheme used for component slices
  colors: {
    even: DEFAULT_COLORS_EVEN,
    odd: DEFAULT_COLORS_ODD,
  },
};

/**
 * Exposes a function to generate a donut chart component
 *
 * @param {object|null} uiConfig
 * @returns {object}
 */
// eslint-disable-next-line no-unused-vars, arrow-body-style
export const BarChartGenerator = (uiConfig = DEFAULT_CONFIG_DONUT) => {
  return {
    BarChart: ({ data, ...props }) => {
      const {
        width, height,
      } = props;

      const tooltipStyle = {
        border: '1px solid #CCCCCC',
        background: '#FFFFFF',
        padding: '10px',
        color: '#000000',
      };

      const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div style={tooltipStyle}>
              <div>{`${label}`}</div>
              <div>{`Participants : ${payload[0].value}`}</div>
            </div>
          );
        }
        return null;
      };

      return (
        <ResponsiveContainer width={width} height={height}>
          <BarChart
            data={data}
          >
            <CartesianGrid vertical={false} stroke="white" strokeDasharray="" strokeWidth={1} fill="#F0F0F0" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="subjects">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={DEFAULT_COLORS_ODD[index % DEFAULT_COLORS_ODD.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    },
  };
};

export default BarChartGenerator;
