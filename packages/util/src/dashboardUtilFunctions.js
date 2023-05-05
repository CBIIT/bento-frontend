import { v4 as uuid } from 'uuid';
import { mergeWith, isArray } from 'lodash';

export const COLORS_LEVEL_1 = [
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
];

export const COLORS_LEVEL_2 = [
  '#F78F49',
  '#79287C',
  '#7CC242',
  '#61479D',
  '#D4D4D4',
  '#057EBD',
  '#0C3151',
];

const NOT_PROVIDED = 'Not Specified';
/*
 Group : GroupName that will show on the page as category
 field: API return field name
    eg: {
          gender : male
          cases: 123
        }
        gender is the field
  api : API that we are using to get data.
  dtatfield: datatable field that related
  show: control show this category on the page or not

*/
export const unselectFilters = (filtersObj) => filtersObj.map((filterElement) => ({
  groupName: filterElement.groupName,
  name: filterElement.name,
  datafield: filterElement.datafield,
  isChecked: false,
}));

// eslint-disable-next-line consistent-return
function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

/**
 * Get stat data from dashboard data
 *
 * @param {object} dashboardData
 * @param {object} stats
 * @return {json}
 */

export function getStatDataFromDashboardData(dashboardData, stats) {
  const statsWithArraySubj = dashboardData.reduce((acc, subjectRow) => {
    const calculatedStats = stats.map((stat) => {
      if (stat.type === 'field') {
        return {
          [stat.statAPI]: [...(acc[stat.statAPI] || []), ...[subjectRow[stat.datatable_field]]],
        };
      }
      if (stat.type === 'array') {
        return {
          [stat.statAPI]: [...(acc[stat.statAPI] || []), ...(subjectRow[[stat.datatable_field]]
            ? subjectRow[[stat.datatable_field]] : [])],
        };
      }
      if (stat.type === 'object') {
        const statObj = (subjectRow[stat.datatable_field]
          ? subjectRow[stat.datatable_field] : []).map((f) => f[stat.datatable_sub_field]);
        return {
          [stat.statAPI]: [...(acc[stat.statAPI] || []), ...statObj],
        };
      }
      return {
        [stat.statAPI]: [],
      };
    });
    return mergeWith(acc, calculatedStats, customizer);
  }, {});

  const output = {};
  stats.forEach((stat, index) => {
    output[stat.statAPI] = [...new Set(statsWithArraySubj[index][stat.statAPI])].length;
  });
  return output;
}

/**
 * Get Studies program widget from datatable
 *
 * @param {object} data
 * @param {object} level1
 * @param {object} level2
 * @return {json}
 */

export function getSunburstDataFromDashboardData(data, level1, level2) {
  // construct data tree
  const widgetData = [];
  let colorIndex = 0;
  data.forEach((d) => {
    let existLevel1 = false;
    let existLevel2 = false;
    widgetData.map((p) => {
      if (p.title === d[level1]) { // program exist
        existLevel1 = true;
        // eslint-disable-next-line no-param-reassign
        p.caseSize += 1;
        p.children.map((study) => {
          const s = study;
          if (s.title === `${d[level1]} : ${d[level2]}`) { // study exist
            existLevel2 = true;
            s.size += 1;
            s.caseSize += 1;
          }
          return s;
        }); // end find study
        if (!existLevel2) { // new study
          colorIndex += 1;
          p.children.push({
            title: `${d[level1]} : ${d[level2]}`,
            color: COLORS_LEVEL_2[parseInt(colorIndex, 10)],
            size: 1,
            caseSize: 1,
          });
        }
      }
      return p;
    }); // end find program

    if (!existLevel1 && !existLevel2) {
      colorIndex += 1;
      widgetData.push({
        title: d[level1],
        color: COLORS_LEVEL_1[parseInt(colorIndex, 10)],
        caseSize: 1,
        children: [{
          title: `${d[level1]} : ${d[level2]}`,
          color: COLORS_LEVEL_2[parseInt(colorIndex, 10)],
          size: 1,
          caseSize: 1,
        }],
      });
    }
  }); // end foreach

  return ({
    key: uuid(),
    title: 'root',
    color: COLORS_LEVEL_1[parseInt(colorIndex, 10)],
    children: widgetData,
  });
}

/**
 * Get widegt data from datatable
 *
 * @param {object} data
 * @param {string} widgetName
 * @return {json}
 */

export function getDonutDataFromDashboardData(data, widgetName) {
  const output = [];
  data.reduce((accumulator, currentValue) => {
    let targetAttrs = currentValue[widgetName.toString()];

    if (!(currentValue[widgetName.toString()] instanceof Array)) {
      // if currentValue[widgetName.toString() is not an array , convert it into array
      // instead of duplicate code to handle on object type "string" and "array",
      // convert them all into array.
      targetAttrs = [targetAttrs];
    }

    targetAttrs.forEach((targetAttr) => {
      if (accumulator.has(targetAttr)) {
        accumulator.set(
          targetAttr,
          accumulator.get(targetAttr).concat(currentValue.subject_id),
        );
      } else {
        accumulator.set(targetAttr, [currentValue.subject_id]);
      }
    });

    return accumulator;
  }, new Map()).forEach(
    (value, key) => {
      output.push({ group: key, subjects: [...new Set(value)].length });
    },
  );
  return output;
}

/* filterData function evaluates a row of data with filters,
      to check if this row will be showed in the data table.

     If there is no filter, then display this row.
     If has filters and for each group of filters, at least has one filter option
     is related to the data.
     Otherwise:  Hide this row.
  */
export const filterData = (row, filters) => {
  // No filter
  if (filters.length === 0) {
    return true;
  }
  // has filters
  const groups = {};

  filters.forEach((filter) => {
    if (groups[filter.groupName] && groups[filter.groupName] === true) {
      // do nothing
    } else if (row[filter.datafield]) { // check if data has this attribute
      // array includes
      const fName = (filter.name === NOT_PROVIDED ? '' : filter.name);
      if (Array.isArray(row[filter.datafield])) {
        if (row[filter.datafield].includes(fName)) {
          groups[filter.groupName] = true;
        } else {
          groups[filter.groupName] = false;
        }
      } else if (row[filter.datafield].toString() === fName) {
        groups[filter.groupName] = true;
      } else {
        groups[filter.groupName] = false;
      }
    } else if (filter.name === NOT_PROVIDED) {
      groups[filter.groupName] = true;
    } else {
      groups[filter.groupName] = false;
    }
  });
  if (Object.values(groups).includes(false)) {
    return false;
  }
  return true;
};

/**
 * Get Filters
 *
 * @param {object} orginFilter
 * @param {object} newCheckBoxs
 * @return {json}
 */

export function getFilters(orginFilter, newCheckBoxs) {
  let ogFilter = orginFilter;
  newCheckBoxs.forEach((checkbox) => {
    let isExist = false;
    ogFilter = ogFilter.filter((filter) => {
      if (checkbox.groupName === filter.groupName && checkbox.name === filter.name) {
        isExist = true;
        return checkbox.isChecked;
      }
      return true;
    });
    if (!isExist && checkbox.isChecked) {
      ogFilter.push(checkbox);
    }
  });
  return ogFilter;
}

export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

/**
 * customSorting
 *
 * @param {array} a
 * @param {array} b
 * @param {int} i
 * @return {json}
 */

export function customSorting(a, b, i = 0) {
  if (b[i] && !a[i]) {
    return -1;
  }
  if (!b[i] && a[i]) {
    return 1;
  }
  if (isNumeric(b[i]) && isNumeric(a[i])) {
    if (b[i] === a[i]) {
      return customSorting(a, b, i + 1);
    }
    return (parseInt(a, 10) - parseInt(b, 10));
  }

  if (b[i] > a[i]) { return -1; }
  if (b[i] < a[i]) { return 1; }
  if (b[i] === a[i]) {
    if (b[i] && a[i]) {
      return customSorting(a, b, i + 1);
    }
    return 0;
  }
  return -1;
}

/**
 * Everytime the checkbox has been clicked, will call this function to update the data of checkbox
 *
 * @param {object} data
 * @param {object} allCheckBoxs
 * @param {object} activeCheckBoxs
 * @param {object} filters
 * @return {json}
 */

export const getCheckBoxData = (data, allCheckBoxs, activeCheckBoxs, filters) => (
  // deepc copy data of orignal checkbox
  JSON.parse(JSON.stringify(allCheckBoxs)).map((ck) => {
    const checkbox = ck;
    // For current working category, we only update the checkbox data check status.
    // number of cases and sorting order will remain the same.
    if (checkbox.groupName === activeCheckBoxs.groupName) {
      // deep copy current working cate's checkboxs.
      checkbox.checkboxItems = JSON.parse(JSON.stringify(activeCheckBoxs.checkboxItems));
      // update the checkbox items' status
      checkbox.checkboxItems = checkbox.checkboxItems.map((el) => {
      // for each item , update check status.
        const item = el;
        item.isChecked = false;
        filters.forEach((filter) => {
          if (item.name === filter.name) {
            item.isChecked = filter.isChecked;
          }
        });
        return item;
      });
    } else {
      // For category that are hidden,
      // number of cases and sorting order will change.
      checkbox.checkboxItems = checkbox.checkboxItems.map((el) => {
        const item = el;

        // init item's value of number of cases to zero
        item.subjects = [];
        // get filters that are not in this checkbox group
        const filtersNotInThisCheckboxGroup = filters.filter(
          (f) => (f.groupName !== checkbox.groupName),
        );
        // filter the data
        const subData = data.filter((d) => (filterData(d, filtersNotInThisCheckboxGroup)));

        // Calcuate number of cases
        subData.forEach((d) => {
          const fName = (item.name === NOT_PROVIDED ? '' : item.name);
          if (d[checkbox.datafield]) {
            // value in the array
            if (Array.isArray(d[checkbox.datafield])) {
              if (d[checkbox.datafield].includes(fName)) {
                item.subjects.push(d.subject_id);
              }
            }
            // Str compare
            if (d[checkbox.datafield] === fName) {
              item.subjects.push(d.subject_id);
            }
          } else if (item.name === NOT_PROVIDED) { // No such attribute
            item.subjects.push(d.subject_id);
          }
        });
        item.subjects = [...new Set(item.subjects)].length;
        // update check status
        item.isChecked = false;
        filters.forEach((filter) => {
          if (checkbox.groupName === filter.groupName && item.name === filter.name) {
            item.isChecked = filter.isChecked;
          }
        });
        return item;
      }).sort((a, b) => customSorting(a.name, b.name));
    }

    return checkbox;
  })
);

/**
 * Transform initial data for sunburst
 *
 * @param {object} data
 * @param {string} level1
 * @param {string} level2
 * @param {string} level1Children
 * @param {array} level1Colors
 *  * @param {array} leve2Colors
 * @return {json}
 */

export function transformInitialDataForSunburst(data, level1 = 'program', level2 = 'arm', level1Children = 'children', level1Colors = COLORS_LEVEL_1, level2Colors = COLORS_LEVEL_2) {
  const output = {};
  output.key = uuid();
  output.title = 'root';
  output.color = level1Colors[parseInt(1, 10)];
  output.children = data.map((level1Child, index) => ({
    title: level1Child[level1],
    color: level1Colors[parseInt(index, 10)],
    caseSize: level1Child.caseSize,
    children: level1Child[level1Children].map((level2Child, index2) => ({
      title: `${level1Child[level1]} : ${level2Child[level2]}`,
      color: level2Colors[parseInt(index2, 10)],
      caseSize: level2Child.caseSize,
      size: level2Child.caseSize,
    })),
  }));
  return output;
}

// function sortPreference(str) { return { '<'1, '<='2, '>='3, '>': 4 };
export function sortPreference(str) {
  if (/^<.*$/.test(str)) {
    return 1;
  }
  if (/^<=.*$/.test(str)) {
    return 2;
  }
  if (/^\(\d,\d]$/.test(str)) {
    return 3;
  }
  if (/^\[\d,\d\]$/.test(str)) {
    return 4;
  }

  if (/^\[\d,\d\)/.test(str)) {
    return 5;
  }
  if (/^\(\d,\d\)/.test(str)) {
    return 6;
  }

  if (/^>=.*$/.test(str)) {
    return 7;
  }
  if (/^>.*$/.test(str)) {
    return 8;
  }
  return 9;
}

export function customSort(checkboxData) {
  // eslint-disable-next-line
  checkboxData.map((rec) => rec.numberInGroup = rec.name.match(/\d+/g) === null ? null : rec.name.match(/\d+/g).map(Number));

  checkboxData.sort((a, b) => {
    const amin = a.numberInGroup !== null ? Math.min(...a.numberInGroup) : 'string';
    const bmin = b.numberInGroup !== null ? Math.min(...b.numberInGroup) : 'string';
    if (amin === bmin) {
      if (amin === 'string' && bmin === 'string') {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        return aName < bName ? -1 : aName > bName ? 1 : 0;
      }

      const anameSortPref = sortPreference(a.name);
      const bnameSortPref = sortPreference(b.name);
      return anameSortPref < bnameSortPref ? -1 : anameSortPref > bnameSortPref ? 1 : 0;
    }
    return amin < bmin ? -1 : amin > bmin ? 1 : 0;
  });
  return checkboxData;
}

/**
 * Transform API Data into CheckBox Data
 *
 * @param {object} data
 * @param {object} field
 * @param {string} caseCountField
 * @return {json}
 */
export function transformAPIDataIntoCheckBoxData(data, field, caseCountField = 'subjects', customNumberSort = false) {
  const result = [];
  let preElementIndex = 0;
  data.map((el) => ({
    name: el[field.toString()] === '' || !el[field.toString()]
      ? NOT_PROVIDED : el[field.toString()],
    isChecked: false,
    subjects: el[caseCountField],
  }))
    .forEach((el) => {
      // reduce the duplication
      if (result[parseInt(preElementIndex, 10)] && result[parseInt(preElementIndex, 10)].name) {
        if (result[parseInt(preElementIndex, 10)].name === el.name) {
          result[parseInt(preElementIndex, 10)].subjects += el[caseCountField];
        } else {
          preElementIndex += 1;
          result.push(el);
        }
      } else {
        result.push(el);
      }
    });
  // Sorting based on Filter Intm name
  const sortBasedOnItemName = result.slice(0).sort((obj1, obj2) => {
    const x = obj1.name.toLowerCase();
    const y = obj2.name.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });
  return customNumberSort ? customSort(sortBasedOnItemName) : sortBasedOnItemName;
}

/**
 *  CustomCheckBox works for first time init Checkbox,
that function transforms the data which returns from API into a another format
so it contains more information and easy for front-end to show it correctly.
 *  * @param {object} currentGroupCount
 *  * @param {object} willUpdateGroupCount
 * * @param {string} caseCountField
 * @return {json}
 */
export function customCheckBox(data, facetSearchData1, caseCountField = 'subjects') {
  return (
    facetSearchData1.map((mapping) => ({
      groupName: mapping.label,
      checkboxItems: transformAPIDataIntoCheckBoxData(
        data[mapping.api],
        mapping.field,
        caseCountField,
        mapping.customNumberSort,
      ),
      datafield: mapping.datafield,
      show: mapping.show,
      section: mapping.section,
      tooltip: mapping.tooltip,
    }))
  );
}

/**
 * Sets the active filters checkboxes isChecked to true .
 *
 * @param {object} checkboxData
 *  * @param {object} Filters
 * @return {json}
 */

export function updateCurrentSelection(checkboxGroup, Filters) {
  const result = checkboxGroup.checkboxItems.map((checkboxItem) => {
    if (checkboxItem.name === Filters.name) {
      return { ...checkboxItem, isChecked: Filters.isChecked };
    }
    return checkboxItem;
  });
  return { ...checkboxGroup, checkboxItems: result };
}

/**
 *  Updates the checkboxes subject counts from newly recieved API data.
 *  Doesn't updated the recent selected group
 *  * @param {object} currentGroupCount
 *  * @param {object} willUpdateGroupCount
 * * @param {object} currentCheckboxSelection
 * * @param {object} facetSearchData
 * @return {json}
 */

export function updateCheckBox(
  currentGroupCount,
  willUpdateGroupCount,
  currentCheckboxSelection,
  facetSearchData,
) {
  return (
    facetSearchData.map((mapping) => {
      if (mapping.label === currentCheckboxSelection.groupName
        && currentCheckboxSelection.isChecked) {
        const currentGroup = currentGroupCount.filter(
          (data) => data.groupName === currentCheckboxSelection.groupName,
        )[0];
        return updateCurrentSelection(currentGroup, currentCheckboxSelection);
      }
      return {
        groupName: mapping.label,
        checkboxItems:
          transformAPIDataIntoCheckBoxData(willUpdateGroupCount[mapping.api], mapping.field),
        datafield: mapping.datafield,
        show: mapping.show,
        section: mapping.section,
      };
    })
  );
}

/**
 * Sets the active filters  group checkboxes  isChecked to true .
 *
 * @param {object} checkboxData
 *  * @param {array} filters
 * @return {json}
 */

function setSelectedVlauesToTrue(checkboxItems, filters) {
  const result = checkboxItems.map((checkboxItem) => {
    if (filters.includes(checkboxItem.name)) return { ...checkboxItem, isChecked: true };
    return checkboxItem;
  });
  return result;
}

/**
 * Sets the active filters checkboxes isChecked to true .
 *
 * @param {object} checkboxData
 *  * @param {object} Filters
 * @return {json}
 */

export function setSelectedFilterValues(checkboxData, Filters) {
  const result = checkboxData.map((filterGroup) => {
    if (Array.isArray(Filters[filterGroup.datafield])
     && Filters[filterGroup.datafield].length !== 0) {
      return {
        groupName: filterGroup.groupName,
        checkboxItems: setSelectedVlauesToTrue(
          filterGroup.checkboxItems,
          Filters[filterGroup.datafield],
        ),
        datafield: filterGroup.datafield,
        show: filterGroup.show,
        section: filterGroup.section,
        tooltip: filterGroup.tooltip,
      };
    }
    return filterGroup;
  });
  return result;
}
