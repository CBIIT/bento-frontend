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

export const DEFAULT_CONFIG_BAR = {
  // Color scheme used for component bars
  colors: {
    even: DEFAULT_COLORS_EVEN,
    odd: DEFAULT_COLORS_ODD,
  },
};

/**
 * Exposes a function to generate a bar chart component
 *
 * @param {object|null} uiConfig
 * @returns {object}
 */
export const BarChartGenerator = (uiConfig = DEFAULT_CONFIG_BAR) => {
  const {
    colors,
  } = uiConfig;

  const COLORS_EVEN = colors && colors.even instanceof Array && colors.even.length > 0
    ? colors.even
    : DEFAULT_CONFIG_BAR.colors.even;

  const COLORS_ODD = colors && colors.odd instanceof Array && colors.odd.length > 0
    ? colors.odd
    : DEFAULT_CONFIG_BAR.colors.odd;

  return {
    BarChart: ({ data, ...props }) => {
      const {
        width, height, currentChart,
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
              <div>{`Participants : ${payload[0].value.toLocaleString()}`}</div>
            </div>
          );
        }
        return null;
      };

      return data.length === 0
        ? (
          <>
            <ResponsiveContainer width={width} height={height}>
              <BarChart
                data={[{ group: '', subjects: 0 }]}
                ref={currentChart}
              >
                <CartesianGrid vertical={false} stroke="white" strokeDasharray="" strokeWidth={1} fill="#F0F0F0" />
                <XAxis dataKey="group" tick={false} />
                <YAxis tick={false} />
                <Bar dataKey="subjects">
                  <Cell fill="transparent" />
                </Bar>
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fontSize="14px"
                  fontWeight="400"
                  fontFamily="Open Sans"
                  fill="#0F253A"
                >
                  <tspan x="57.5%" dy="-30">No data</tspan>
                  <tspan x="57.5%" dy="18">returned for</tspan>
                  <tspan x="57.5%" dy="18">this search</tspan>
                </text>
              </BarChart>
            </ResponsiveContainer>
          </>
        )
        : (
          <>
            <ResponsiveContainer width={width} height={height}>
              <BarChart
                data={data}
                ref={currentChart}
              >
                <CartesianGrid vertical={false} stroke="white" strokeDasharray="" strokeWidth={1} fill="#F0F0F0" />
                <XAxis dataKey="group" />
                <YAxis tickFormatter={(tick) => tick.toLocaleString()} />
                <Tooltip cursor={false} content={<CustomTooltip />} />
                <Bar dataKey="subjects">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={data.length % 2 === 0
                        ? COLORS_EVEN[index % COLORS_EVEN.length]
                        : COLORS_ODD[index % COLORS_ODD.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </>
        );
    },
  };
};

export default BarChartGenerator;
