import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#9600b6',
  '#93b5de',
  '#4976b2',
  '#2f3a52',
  '#feb842',
  '#f37e56',
  '#ebb9a8',
];

export const DEFAULT_CONFIG_DONUT = {
  styles: {
    textColor: 'black',
    fontFamily: 'Nunito',
    fontWeight: 500,
    fontSize: '12px',
    cellPadding: 2,
    showTotalCount: false,
    textOverflowLength: 20,
  },

  functions: {
    mergeProps: (props, extraProps, callback) => (callback({ ...props, ...extraProps })),
    getLastIndex: (dataset) => ((dataset.length !== undefined) ? dataset.length - 1 : 0),
    mapData: (data) => ({ name: data.group, value: data.subjects }),
  },
};

export const BarChartGenerator = () => ({
  BarChart: ({ data, ...props }) => {
    const {
      width,
      height,
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
            <div>{`Publications: ${payload[0].value}`}</div>
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="group" />
          <YAxis />
          <Tooltip cursor={false} content={<CustomTooltip />} />
          <Bar dataKey="subjects">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  },
});

export default BarChartGenerator;
