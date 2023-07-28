/* eslint-disable max-len */
import React from 'react';
// import { isEqual } from 'lodash';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

export const DEFAULT_COLORS_EVEN = [
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
];

export const DEFAULT_COLORS_ODD = [
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
  '#D4D4D4',
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
    // renderActiveShape: (props) => {
    //   const {
    //     cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    //     fill, payload, value, textColor, fontSize, fontWeight, fontFamily,
    //     titleLocation, titleAlignment, sliceTitle, totalCount, showTotalCount, textOverflowLength,
    //   } = props;

    //   const isCapital = String(payload.name).toUpperCase() === String(payload.name);
    //   const overflowLength = isCapital ? textOverflowLength : textOverflowLength + 10;

    //   const labelX = (titleAlignment === 'center') ? cx : (titleAlignment === 'left') ? 0 : cx * 2;
    //   const labelY = (titleLocation === 'top') ? 9 : cy * 2;

    //   const faceValue = showTotalCount === true ? `${value} / ${totalCount}` : value;

    //   return (
    //     <g>
    //       <text x={labelX} y={labelY} dy={0} textAnchor={(titleAlignment === 'center') ? 'middle' : undefined} fill={textColor} fontSize={fontSize || '12px'} fontWeight={fontWeight || '500'} fontFamily={fontFamily || 'Nunito'} cursor="text">
    //         {String(payload.name).length > overflowLength ? `${String(payload.name).substring(0, overflowLength)}...` : payload.name}
    //         <title>{payload.name}</title>
    //       </text>
    //       <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="bold" fontFamily={fontFamily || 'Nunito'}>
    //         {`${faceValue}`}
    //       </text>
    //       <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="light" fontFamily={fontFamily || 'Nunito'}>
    //         {`${sliceTitle}`}
    //       </text>
    //       <Sector
    //         cx={cx}
    //         cy={cy}
    //         innerRadius={innerRadius}
    //         outerRadius={outerRadius}
    //         startAngle={startAngle}
    //         endAngle={endAngle}
    //         fill={fill}
    //       />
    //       <Sector
    //         cx={cx}
    //         cy={cy}
    //         startAngle={startAngle}
    //         endAngle={endAngle}
    //         innerRadius={outerRadius + 6}
    //         outerRadius={outerRadius + 8}
    //         fill={fill}
    //       />
    //     </g>
    //   );
    // },
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
  // const {
  //   styles, functions, colors,
  // } = uiConfig;

  // const {
  //   textColor, fontFamily, fontWeight, fontSize, cellPadding,
  //   showTotalCount, textOverflowLength,
  // } = styles && typeof styles === 'object' ? styles : DEFAULT_CONFIG_DONUT.styles;

  // const COLORS_EVEN = colors && colors.even instanceof Array && colors.even.length > 0
  //   ? colors.even
  //   : DEFAULT_CONFIG_DONUT.colors.even;

  // const COLORS_ODD = colors && colors.odd instanceof Array && colors.odd.length > 0
  //   ? colors.even
  //   : DEFAULT_CONFIG_DONUT.colors.odd;

  // const mergeProps = functions && typeof functions.mergeProps === 'function'
  //   ? functions.mergeProps
  //   : DEFAULT_CONFIG_DONUT.functions.mergeProps;

  // const lastIndex = functions && typeof functions.getLastIndex === 'function'
  //   ? functions.getLastIndex
  //   : DEFAULT_CONFIG_DONUT.functions.getLastIndex;

  // const mapDataset = functions && typeof functions.mapData === 'function'
  //   ? functions.mapDatasetObject
  //   : DEFAULT_CONFIG_DONUT.functions.mapData;

  // const activeShape = functions && typeof functions.renderActiveShape === 'function'
  //   ? functions.renderActiveShape
  //   : DEFAULT_CONFIG_DONUT.functions.renderActiveShape;

  return {
    BarChart: ({ data, ...props }) => {
      const {
        width, height,
        // cx, cy,
        // titleLocation, titleAlignment, sliceTitle,
        // blendStroke, innerRadius, outerRadius,
      } = props;

      // const dataset = data.map(mapDataset);
      // const totalCount = dataset.length || 0;

      // const [activeIndex, setActiveIndex] = useState(lastIndex(data));
      // const refHook = useRef(data);

      // useEffect(() => {
      //   if (isEqual(refHook.current, data) === false) {
      //     refHook.current = data;
      //     setActiveIndex(lastIndex(data));
      //   }
      // }, [data]);

      // const defaultProps = {
      //   textColor,
      //   titleLocation,
      //   titleAlignment,
      //   sliceTitle,
      //   fontSize,
      //   fontWeight,
      //   fontFamily,
      //   totalCount,
      //   showTotalCount,
      //   textOverflowLength,
      // };

      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            // margin={{
            //   top: 5,
            //   right: 30,
            //   left: 20,
            //   bottom: 5,
            // }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="group" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
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
