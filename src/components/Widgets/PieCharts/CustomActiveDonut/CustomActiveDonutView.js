import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer,
} from 'recharts';

const COLORS_EVEN = [
  '#fdb915',
  '#381f5f',
  '#007ea5',
  '#6ac6b6',
  '#c33b27',
  '#c2e5dc',
  '#8b5996',
];


const COLORS_ODD = [
  '#381f5f',
  '#007ea5',
  '#6ac6b6',
  '#c33b27',
  '#c2e5dc',
  '#8b5996',
  '#fdb915',
];

const renderActiveShape = (props) => {
  // const RADIAN = Math.PI / 180;
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, textColor, fontSize,
  } = props;
  // const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 2) * cos;
  // const sy = cy + (outerRadius + 2) * sin;
  // const mx = cx + (outerRadius + 5) * cos;
  // const my = cy + (outerRadius + 5) * sin;
  // const ex = mx + (cos >= 0 ? 1 : -1) * 20;
  // const ey = my;
  // const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text y={9} fill={textColor} fontSize={fontSize || '12px'} fontWeight="600" fontFamily="Lato">{String(payload.name).length > 23 ? `${String(payload.name).substr(0, 23)}...` : payload.name}</text>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="500" fontFamily="Open Sans">{`${value}`}</text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize="12px" fontWeight="500" fontFamily="Open Sans">Cases</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 8}
        fill={fill}
      />

    </g>
  );
};


export default class CustomActiveDonut extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const {
      data: DataObj, textColor,
    } = this.props;
    const data = DataObj.map((obj) => ({
      name: obj.item,
      value: obj.cases,
    }));

    const { activeIndex } = this.state;

    return (
      <ResponsiveContainer width={185} height={210}>
        <PieChart textColor={textColor}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={90}
            cy={98}
            textColor={textColor}
            innerRadius={45}
            outerRadius={80}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            blendStroke
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={data.length % 2 === 0 ? COLORS_EVEN[index % COLORS_EVEN.length] : COLORS_ODD[index % COLORS_ODD.length]} textColor={textColor} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
