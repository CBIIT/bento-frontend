import {
  transformInitialDataForSunburst,
} from '@bento-core/util';

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
    const {
      type, dataName, datatable_level1_field, datatable_level2_field,
      datatable_level1_colors, datatable_level2_colors,
    } = widget;

    const dataset = type === 'sunburst'
      ? transformInitialDataForSunburst(data[dataName], datatable_level1_field, datatable_level2_field, 'children', datatable_level1_colors, datatable_level2_colors)
      : removeEmptySubjectsFromDonutData(data[dataName]);

    return { ...acc, [dataName]: dataset };
  }, {});

  return formatted;
}
