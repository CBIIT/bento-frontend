import React, { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer,
} from 'recharts';
import { Button } from '@material-ui/core';
import FileSaver from 'file-saver';
import exportIcon from '../assets/Widget_Export.svg';

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
    maxLines: 3,
    lineHeight: 14,
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
     * Wrap text into multiple lines
     *
     * @param {string} text
     * @param {number} maxCharsPerLine
     * @param {number} maxLines
     * @returns {string[]} array of lines
     */
    wrapText: (text, maxCharsPerLine, maxLines = 3) => {
      const words = String(text).split(' ');
      const lines = [];
      let currentLine = '';

      for (let i = 0; i < words.length; i += 1) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];

        if (testLine.length <= maxCharsPerLine) {
          currentLine = testLine;
        } else {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = words[i];
          } else {
            // Single word longer than max, split it
            lines.push(words[i].substring(0, maxCharsPerLine));
            currentLine = words[i].substring(maxCharsPerLine);
          }

          if (lines.length >= maxLines) {
            break;
          }
        }
      }

      if (currentLine && lines.length < maxLines) {
        lines.push(currentLine);
      }

      // If we still have more words and we're at max lines, add ellipsis
      if (lines.length === maxLines && (currentLine || words.slice(lines.length).length > 0)) {
        const lastLine = lines[maxLines - 1];
        lines[maxLines - 1] = lastLine.length > maxCharsPerLine - 3
          ? `${lastLine.substring(0, maxCharsPerLine - 3)}...`
          : `${lastLine}...`;
      }

      return lines;
    },

    /**
     * Generate an active shape element for the pie chart
     *
     * @param {*} props
     * @returns {JSX.Element}
     */
    renderActiveShape: (props) => {
      const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, value, textColor, fontSize, fontWeight, fontFamily,
        titleLocation, titleAlignment, sliceTitle, totalCount, showTotalCount,
        textOverflowLength, maxLines, lineHeight, wrapText,
      } = props;

      const isCapital = String(payload.name).toUpperCase() === String(payload.name);
      const maxCharsPerLine = isCapital ? textOverflowLength : textOverflowLength + 10;
      const maxLinesValue = maxLines || 3;
      const lineHeightValue = lineHeight || 14;

      // Wrap text into multiple lines
      const wrappedLines = wrapText
        ? wrapText(payload.name, maxCharsPerLine, maxLinesValue)
        : [payload.name];

      const labelX = (titleAlignment === 'center') ? cx : (titleAlignment === 'left') ? 0 : cx * 2;
      const baseLabelY = (titleLocation === 'top') ? 9 : (cy * 2) + 15;

      // Adjust starting position so multi-line text grows upward, not downward
      // This keeps the bottom line at the same position as single-line text
      const totalTextHeight = (wrappedLines.length - 1) * lineHeightValue;
      const labelY = baseLabelY - totalTextHeight;

      const faceValue = showTotalCount === true ? `${value} / ${totalCount}` : value;

      return (
        <g>
          <text
            x={labelX}
            y={labelY}
            textAnchor={(titleAlignment === 'center') ? 'middle' : undefined}
            fill={textColor}
            fontSize={fontSize || '12px'}
            fontWeight={fontWeight || '500'}
            fontFamily={fontFamily || 'Nunito'}
            cursor="text"
          >
            {wrappedLines.map((line, index) => (
              <tspan key={index} x={labelX} dy={index === 0 ? 0 : lineHeightValue}>
                {line}
              </tspan>
            ))}
            <title>{payload.name}</title>
          </text>
          <text x={cx} y={cy} dy={0} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="bold" fontFamily={fontFamily || 'Nunito'}>
            {`${faceValue.toLocaleString()}`}
          </text>
          <text x={cx} y={cy} dy={12} textAnchor="middle" fill={textColor} fontSize={fontSize || '12px'} fontWeight="light" fontFamily={fontFamily || 'Nunito'}>
            {`${sliceTitle}`}
          </text>
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
    },
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
export const DonutChartGenerator = (uiConfig = DEFAULT_CONFIG_DONUT) => {
  const {
    styles, functions, colors,
  } = uiConfig;

  const {
    textColor, fontFamily, fontWeight, fontSize, cellPadding,
    showTotalCount, textOverflowLength, maxLines, lineHeight,
  } = styles && typeof styles === 'object' ? styles : DEFAULT_CONFIG_DONUT.styles;

  const COLORS_EVEN = colors && colors.even instanceof Array && colors.even.length > 0
    ? colors.even
    : DEFAULT_CONFIG_DONUT.colors.even;

  const COLORS_ODD = colors && colors.odd instanceof Array && colors.odd.length > 0
    ? colors.even
    : DEFAULT_CONFIG_DONUT.colors.odd;

  const mergeProps = functions && typeof functions.mergeProps === 'function'
    ? functions.mergeProps
    : DEFAULT_CONFIG_DONUT.functions.mergeProps;

  const mapDataset = functions && typeof functions.mapData === 'function'
    ? functions.mapDatasetObject
    : DEFAULT_CONFIG_DONUT.functions.mapData;

  const activeShape = functions && typeof functions.renderActiveShape === 'function'
    ? functions.renderActiveShape
    : DEFAULT_CONFIG_DONUT.functions.renderActiveShape;

  const wrapText = functions && typeof functions.wrapText === 'function'
    ? functions.wrapText
    : DEFAULT_CONFIG_DONUT.functions.wrapText;

  return {
    DonutChart: ({ data, ...props }) => {
      const {
        cx, cy,
        title, titleLocation, titleAlignment, sliceTitle,
        blendStroke, innerRadius, outerRadius, width, height,
      } = props;

      const dataset = data.map(mapDataset);
      const totalCount = dataset.length || 0;

      const [activeIndex, setActiveIndex] = useState(0);
      const refHook = useRef(data);
      const currentChart = useRef(null);

      useEffect(() => {
        if (isEqual(refHook.current, data) === false) {
          refHook.current = data;
          setActiveIndex(0);
        }
      }, [data]);

      const handleExportChart = () => {
        const chartSVG = currentChart.current.container.children[0];
        const chartWidth = chartSVG.clientWidth;
        const heightWidth = chartSVG.clientHeight;
        const svgURL = new XMLSerializer().serializeToString(chartSVG);
        const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' });
        const URL = window.URL || window.webkitURL || window;
        const blobURL = URL.createObjectURL(svgBlob);

        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = chartWidth;
          canvas.height = heightWidth;
          const context = canvas.getContext('2d');
          context.fillStyle = 'white';
          context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height);
          const png = canvas.toDataURL('image/png', 1.0);
          FileSaver.saveAs(png, `${title}.png`);
        };

        image.src = blobURL;
      };

      const defaultProps = {
        textColor,
        titleLocation,
        titleAlignment,
        sliceTitle,
        fontSize,
        fontWeight,
        fontFamily,
        totalCount,
        showTotalCount,
        textOverflowLength,
        maxLines,
        lineHeight,
        wrapText,
      };

      return (
        <>
          <Button
            onClick={() => handleExportChart()}
            style={{
              position: 'absolute',
              top: '25px',
              right: '15px',
              backgroundColor: 'transparent',
              zIndex: 1000,
              minWidth: 'auto',
              padding: '8px',
            }}
          >
            <img src={exportIcon} alt="export" />
          </Button>
          <ResponsiveContainer width={width} height={height}>
            <PieChart ref={currentChart} width={width} height={height}>
              <Pie
                data={dataset}
                activeIndex={activeIndex}
                blendStroke={blendStroke || true}
                cx={cx || '50%'}
                cy={cy || '50%'}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                dataKey="value"
                paddingAngle={cellPadding}
                activeShape={(currProps) => (mergeProps(currProps, defaultProps, activeShape))}
                onMouseEnter={(d, idx) => setActiveIndex(idx)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={data.length % 2 === 0
                      ? COLORS_EVEN[index % COLORS_EVEN.length]
                      : COLORS_ODD[index % COLORS_ODD.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
      );
    },
  };
};

export default DonutChartGenerator;
