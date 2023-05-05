import {
  transformInitialDataForSunburst,
} from '@bento-core/util';

const SUNBURST_COLORS_LEVEL_1 = [
  '#7dc242',
  '#274fa5',
  '#79287c',
  '#f78f48',
  '#057ebd',
];

const SUNBURST_COLORS_LEVEL_2 = [
  '#057ebd',
  '#f78f48',
  '#79287c',
  '#0e3151',
  '#057ebd',
  '#7dc242',
];

/**
 * Removes empty subjects from donut data.
 *
 * @param {object} data
 * @returns {object} filtered data
 */
const removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);

/**
 * Returns the widgets data formatted as key:dataset pairs
 *
 * @param {object} data
 * @param {object} custodianConfig
 * @return {object} formatted data
 */
export function formatWidgetData(data, custodianConfig) {
  const formatted = custodianConfig.reduce((acc, widget) => {
    const { type, dataName } = widget;

    const dataset = type === 'sunburst'
      ? transformInitialDataForSunburst(data[dataName], widget.datatable_level1_field, widget.datatable_level2_field, 'children', SUNBURST_COLORS_LEVEL_1, SUNBURST_COLORS_LEVEL_2)
      : removeEmptySubjectsFromDonutData(data[dataName]);

    return { ...acc, [dataName]: dataset };
  }, {});

  return formatted;
}
