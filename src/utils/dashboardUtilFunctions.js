import uuid from 'uuid';

export const COLORS = [
  '#39C0F0',
  '#194563',
  '#fc4b5b',
  '#2b69a3',
  '#287d6d',
  '#af66ff',
];
export const COLORS_LEVEL_1 = [
  '#c2e5dc',
  '#6ac6b6',
  '#2b69a3',
  '#287d6d',
  '#af66ff',
];

export const COLORS_LEVEL_2 = [
  '#302059',
  '#007ea5',
  '#fdb915',
  '#287d6d',
  '#302059',
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
export const mappingCheckBoxToDataTable = [
  {
    group: 'Trial Code', field: 'clinical_trial_designation', api: 'casesCountBaseOnTrialCode', datafield: 'clinical_trial_code', show: true,
  },
  {
    group: 'Trial ID', field: 'clinical_trial_id', api: 'casesCountBaseOnTrialId', datafield: 'clinical_trial_id', show: true,
  },
  {
    group: 'PubMed ID', field: 'pubmed_id', api: 'casesCountBaseOnPubMedID', datafield: 'pubmed_id', show: true,
  },
  {
    group: 'Trial Arm', field: 'trial_arm', api: 'casesCountBaseOnTrialArm', datafield: 'trial_arm', show: true,
  },
  {
    group: 'Diagnosis', field: 'disease', api: 'casesCountBaseOnDiagnosis', datafield: 'disease', show: true,
  },
  {
    group: 'Gender', field: 'gender', api: 'casesCountBaseOnGender', datafield: 'gender', show: true,
  },
  {
    group: 'Race', field: 'race', api: 'casesCountBaseOnRace', datafield: 'race', show: true,
  },
  {
    group: 'Ethnicity', field: 'ethnicity', api: 'casesCountBaseOnEthnicity', datafield: 'ethnicity', show: true,
  },
  {
    group: 'Associated File Type', field: 'file_type', api: 'casesCountBaseOnFileType', datafield: 'file_types', show: true,
  },
  {
    group: 'Associated File Format', field: 'file_format', api: 'casesCountBaseOnFileFormat', datafield: 'file_formats', show: true,
  },


];

export const unselectFilters = (filtersObj) => filtersObj.map((filterElement) => ({
  groupName: filterElement.groupName,
  name: filterElement.name,
  datafield: filterElement.datafield,
  isChecked: false,
}));

export function getStatDataFromDashboardData(data, statName) {
  switch (statName) {
    case 'case':
      return [...new Set(data.map((d) => d.case_id))].length;
    case 'file':
      return [...new Set(data.reduce((output, d) => output.concat(d.files
        ? d.files : []), []).map((f) => f.uuid))].length;
    case 'clinical_trial_code':
      return [...new Set(data.map((d) => d.clinical_trial_code))].length;
    default:
      return 0;
  }
}

// getStudiesProgramWidgetFromDT

export function getSunburstDataFromDashboardData(data) {
  // construct data tree
  const widgetData = [];
  let colorIndex = 0;
  data.forEach((d) => {
    let existTrial = false;
    let existArm = false;
    widgetData.map((trial) => {
      if (trial.title === d.clinical_trial_code) { // program exist
        existTrial = true;
        // eslint-disable-next-line no-param-reassign
        trial.caseSize += 1;
        trial.children.map((arm) => {
          const armID = arm;
          if (armID.title === `${trial.title} : ${d.arm_id}`) { // arm exist
            existArm = true;
            armID.size += 1;
            armID.caseSize += 1;
          }
          return armID;
        }); // end find arm
        if (!existArm) { // new arm
          colorIndex += 1;
          trial.children.push({
            title: `${trial.title} : ${d.arm_id}`,
            color: COLORS_LEVEL_2[parseInt(colorIndex, 10)],
            size: 1,
            caseSize: 1,
          });
        }
      }
      return trial;
    }); // end find Trial


    if (!existTrial && !existArm) {
      colorIndex += 1;
      widgetData.push({
        title: d.clinical_trial_code,
        color: COLORS_LEVEL_2[parseInt(colorIndex - 1, 10)],
        caseSize: 1,
        children: [{
          title: `${d.clinical_trial_code} : ${d.arm_id}`,
          color: COLORS_LEVEL_2[parseInt(colorIndex, 10)],
          size: 1,
          caseSize: 1,
        }],
      });
    }
  }); // end foreach

  return ({
    key: uuid.v1(),
    title: 'root',
    color: COLORS_LEVEL_2[parseInt(colorIndex, 10)],
    children: widgetData,
  });
}

// getWidegtDataFromDT
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
          accumulator.get(targetAttr).concat(currentValue.case_id),
        );
      } else {
        accumulator.set(targetAttr, [currentValue.case_id]);
      }
    });

    return accumulator;
  }, new Map()).forEach(
    (value, key) => {
      output.push({ item: key, cases: [...new Set(value)].length });
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

export function customSorting(a, b, flag, i = 0) {
  if (flag === 'alphabetical') {
    if (b[i] && !a[i]) {
      return -1;
    }
    if (!b[i] && a[i]) {
      return 1;
    }
    if (b[i] > a[i]) { return -1; }
    if (b[i] < a[i]) { return 1; }
    if (b[i] === a[i]) {
      if (b[i] && a[i]) {
        return customSorting(a, b, flag, i + 1);
      }
      return 0;
    }
  }
  return -1;
}


// Everytime the checkbox has been clicked, will call this function to update the data of checkbox
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
        item.cases = [];
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
                item.cases.push(d.case_id);
              }
            }
            // Str compare
            if (d[checkbox.datafield] === fName) {
              item.cases.push(d.case_id);
            }
          } else if (item.name === NOT_PROVIDED) { // No such attribute
            item.cases.push(d.case_id);
          }
        });
        item.cases = [...new Set(item.cases)].length;
        // update check status
        item.isChecked = false;
        filters.forEach((filter) => {
          if (checkbox.groupName === filter.groupName && item.name === filter.name) {
            item.isChecked = filter.isChecked;
          }
        });
        return item;
      }).sort((a, b) => customSorting(a.name, b.name, 'alphabetical'));
    }

    return checkbox;
  })
);


export function transformAPIDataIntoCheckBoxData(data, field) {
  const result = [];
  let preElementIndex = 0;
  data.map((el) => ({
    name: el[field.toString()] === '' || !el[field.toString()]
      ? NOT_PROVIDED : el[field.toString()],
    isChecked: false,
    cases: el.cases,
  }))
    .sort((a, b) => customSorting(a.name, b.name, 'alphabetical'))
    .forEach((el) => {
      // reduce the duplication
      if (result[parseInt(preElementIndex, 10)] && result[parseInt(preElementIndex, 10)].name) {
        if (result[parseInt(preElementIndex, 10)].name === el.name) {
          result[parseInt(preElementIndex, 10)].cases += el.cases;
        } else {
          preElementIndex += 1;
          result.push(el);
        }
      } else {
        result.push(el);
      }
    });

  return result;
}


// CustomCheckBox works for first time init Checkbox,
// that function transforms the data which returns from API into a another format
// so it contains more information and easy for front-end to show it correctly.
export function customCheckBox(data) {
  return (
    mappingCheckBoxToDataTable.map((mapping) => ({
      groupName: mapping.group,
      checkboxItems: transformAPIDataIntoCheckBoxData(data[mapping.api], mapping.field),
      datafield: mapping.datafield,
      show: mapping.show,
    }))
  );
}
