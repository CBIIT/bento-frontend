import React, { useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { makeStyles } from '@material-ui/core';
import { Sunburst, LabelSeries } from 'react-vis';

const DEFAULT_CLASSES = makeStyles({
  label: {
    fontSize: '12px',
    textAnchor: 'middle',
    textAlign: 'center',
    fill: (props) => (props && props.textColor ? props.textColor : 'black'),
    fontFamily: (props) => (props && props.fontFamily ? props.fontFamily : 'Nunito'),
    '& text': {
      fill: (props) => (props && props.textColor ? props.textColor : 'black'),
      textAnchor: 'middle',
    },
  },
  widgetContainer: {
    marginTop: (props) => (props && props.titleLocation === 'top' ? '0px' : '18px'),
    marginBottom: (props) => (props.titleLocation === 'top' ? '18px' : '0px'),
  },
  title: {
    color: (props) => (props && props.textColor ? props.textColor : 'black'),
    fontSize: '12px',
    fontFamily: 'Nunito',
    lineHeight: '20px',
    fontWeight: 500,
    height: '20px',
    textAlign: (props) => (props && props.titleAlignment ? props.titleAlignment : 'center'),
  },
});

export const DEFAULT_CONFIG_SUNBURST = {
  // Styles used by the component and its children
  styles: {
    textColor: 'black',
    sunburst: {
      stroke: '#ddd',
      strokeOpacity: 0.3,
      strokeWidth: '0.5',
    },
  },
};

/**
 * Recursively finds the node path to the root element
 *
 * @param {*} node
 * @returns array of node titles
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [(node.data && node.data.title) || node.title].concat(
    getKeyPath(node.parent),
  );
}

/**
 * Recursively highlights the node and its children
 *
 * @param {object} d selected child node
 * @param {*} keyPath
 * @returns {object} data with node highlighted
 */
function highlightNode(d, keyPath) {
  const data = d;

  if (data.children) {
    data.children.map((child) => highlightNode(child, keyPath));
    data.style = {
      ...data.style,
      fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 0.7,
    };
  } else {
    data.style = {
      ...data.style,
      fillOpacity: keyPath && !keyPath[data.title] ? 0.2 : 1,
    };
  }

  return data;
}

/**
 * Find the number of cases in the dataset given the case title
 *
 * @param {object} dataset
 * @param {string} title
 * @returns {number} number of cases
 */
function findCaseCountByTitle(dataset, title) {
  if (title === '') {
    return dataset.children.reduce((a, c) => a + c.caseSize, 0);
  }

  if (dataset.title !== title) {
    if (dataset.children) {
      let match = 0;
      dataset.children.forEach((d) => {
        const res = findCaseCountByTitle(d, title);
        if (res !== 0) {
          match = res;
        }
      });
      return match;
    }
    return 0;
  }

  return dataset.caseSize;
}

/**
 * Handle mouse over event for the SunburstChart component
 *
 * @param {object} node hovered node object
 * @param {object} data current chart data
 * @param {function} setState react hook to set state
 * @param {function} callback callback function
 */
function valueMouseOver(node, data, setState, callback) {
  const path = getKeyPath(node).reverse();
  const pathAsMap = path.reduce((res, row) => {
    res[row.toString()] = true;
    return res;
  }, {});

  setState({
    data: callback(data, pathAsMap),
    title: node.title,
    caseSize: node.size || node.caseSize,
  });
}

/**
 * Exposes a Sunburst component with the defined configuration
 *
 * @param {object|null} uiConfig
 * @returns {object}
 */
export const SunburstChartGenerator = (uiConfig = DEFAULT_CONFIG_SUNBURST) => {
  const {
    styles,
  } = uiConfig;

  return {
    SunburstChart: ({ data, ...props }) => {
      const {
        titleLocation, width, height,
        padAngle, sliceTitle,
      } = props;

      const classes = uiConfig && uiConfig.classes && typeof uiConfig.classes === 'object'
        ? uiConfig.classes
        : DEFAULT_CLASSES({ ...props, ...styles });

      const [state, setState] = useState({
        data,
        title: '',
        caseSize: findCaseCountByTitle(data, ''),
      });

      const refHook = useRef(data);

      useEffect(() => {
        if (isEqual(refHook.current, data) === false) {
          refHook.current = data;
          setState({
            data,
            title: '',
            caseSize: findCaseCountByTitle(data, ''),
          });
        }
      }, [data]);

      return (
        <div className={classes.widgetContainer}>
          {titleLocation === 'top' && (<div className={classes.title}>{state.title}</div>)}
          <Sunburst
            data={state.data}
            height={height}
            width={width}
            cy="50%"
            cx="50%"
            colorType="literal"
            hideRootNode
            animation
            style={styles && styles.sunburst
              ? styles.sunburst
              : DEFAULT_CONFIG_SUNBURST.styles.sunburst}
            onValueMouseOver={(node) => valueMouseOver(node, state.data, setState, highlightNode)}
            padAngle={padAngle}
          >
            {/* This cannot be it's own component */}
            {/* https://github.com/uber/react-vis/issues/1095 */}
            {state.caseSize > 0 && (
              <LabelSeries
                className={classes.label}
                data={[
                  {
                    x: 0,
                    y: 0,
                    label: state.caseSize,
                  },
                  {
                    x: 0,
                    y: 1,
                    label: sliceTitle,
                  },
                ]}
              />
            )}
          </Sunburst>
          {titleLocation === 'bottom' && (<div className={classes.title}>{state.title}</div>)}
        </div>
      );
    },
  };
};

export default SunburstChartGenerator;
