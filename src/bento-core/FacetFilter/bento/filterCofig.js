/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quote-props */
/* eslint-disable semi */

import { InputTypes } from "../components/inputs/Types";

export const facetSearchData = [
  {
    section: "Case",
    label: 'Age',
    api: 'filterSubjectCountByAge',
    ApiPath: ['filterSubjectCountByAge'],
    apiForFiltering: 'filterSubjectCountByFileType',
    datafield: 'age_at_index',
    ApiLowerBoundName: "lowerBound",
    ApiUpperBoundName: "upperBound",
    show: true,
    slider: true,
    type: InputTypes.SLIDER,
    minLowerBound: 0,
    maxUpperBound: 100,
    quantifier: 'Years',
    facetValues: [0, 100],
  },
  {
    section: "Case",
    type: InputTypes.CHECKBOX,
    label: 'Program',
    facetFilterName: "programs",
    datafield: 'programs',
    ApiPath: ["searchSubjects", "filterSubjectCountByProgram"],
    ApiEntryName: "group",
    ApiCountName: "subjects",
    sort_type: 'alphanumeric_sort',
    show: true,
    facetValues: [
      {
        name: "TAILORx", /** page data - passed as props */
        subjects: "1000", /** page data - passed as props */
        datafield: 'programs',
        isChecked: false, /** provided by redux store */
      },
      {
        name: "ATAILORx", /** page data - passed as props */
        subjects: "700", /** page data - passed as props */
        isChecked: false, /** provided by redux store */
        datafield: 'programs',
      },
      {
        name: "RTAILORx Space", /** page data - passed as props */
        subjects: "500", /** page data - passed as props */
        isChecked: false, /** provided by redux store */
        datafield: 'programs',
      }
    ]
  },
  {
    section: "Case",
    type: InputTypes.CHECKBOX,
    label: 'Tumor Grade',
    facetFilterName: "tumor_grades",
    datafield: 'tumor_grades',
    ApiPath: ["searchSubjects", "filterSubjectCountByTumorGrade"],
    ApiEntryName: "group",
    ApiCountName: "subjects",
    sort_type: 'alphanumeric_sort',
    show: true,
    facetValues: [
      {
        name: "TAILORx", /** page data - passed as props */
        subjects: "1000", /** page data - passed as props */
        datafield: 'tumor_grades',
        isChecked: false, /** provided by redux store */
      },
      {
        name: "ATAILORx", /** page data - passed as props */
        subjects: "700", /** page data - passed as props */
        isChecked: false, /** provided by redux store */
        datafield: 'tumor_grades',
      },
      {
        name: "RTAILORx Space", /** page data - passed as props */
        subjects: "500", /** page data - passed as props */
        isChecked: false, /** provided by redux store */
        datafield: 'tumor_grades',
      }
    ]
  },
  {
    section: "Samples",
    type: InputTypes.CHECKBOX,
    label: 'Tissue Type',
    facetFilterName: "tissue_type",
    datafield: 'tissue_type',
    ApiPath: ["searchSubjects", "filterSubjectCountByTissueType"],
    ApiEntryName: "group",
    ApiCountName: "subjects",
    sort_type: 'alphanumeric_sort',
    show: true,
    facetValues: [
      {
        name: "TAILORx", /** page data - passed as props */
        subjects: "1000", /** page data - passed as props */
        datafield: 'tissue_type',
        isChecked: false, /** provided by redux store */
      },
      {
        name: "ATAILORx", /** page data - passed as props */
        subjects: "700", /** page data - passed as props */
        isChecked: false, /** provided by redux store */
        datafield: 'tissue_type',
      },
      {
        name: "RTAILORx Space", /** page data - passed as props */
        subjects: "500", /** page data - passed as props */
        isChecked: false, /** provided by redux store */
        datafield: 'tissue_type',
      }
    ]
  },
];

export const dataStatus = {
  programs: {
    "TailorX": false
  },
}

export const facetSectionVariables = {
  Cases: {
    color: '#10A075',
    backgroundColor: '#C0E9D7',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: true,
  },
  Samples: {
    color: '#10BEFF',
    backgroundColor: '#C3EAF5',
    checkBoxColorsOne: '#C9EBF7',
    checkBoxColorsTwo: '#E8F8FE',
    height: '5px',
    isExpanded: true,
  },
  Files: {
    color: '#E636E4',
    backgroundColor: '#F5C3F1',
    checkBoxColorsOne: '#FBE3FB',
    checkBoxColorsTwo: '#FFF2FF',
    height: '5px',
    isExpanded: true,
  },
};

export const facetValues = [
  {
    name: "TAILORx", /** page data - passed as props */
    subjects: "1000", /** page data - passed as props */
    datafield: 'programs',
    isChecked: false, /** provided by redux store */
  },
  {
    name: "ATAILORx", /** page data - passed as props */
    subjects: "500", /** page data - passed as props */
    isChecked: false, /** provided by redux store */
    datafield: 'programs',
  },
  {
    name: "RTAILORx Space", /** page data - passed as props */
    subjects: "500", /** page data - passed as props */
    isChecked: false, /** provided by redux store */
    datafield: 'programs',
  }
];

export const facetValues1 = [
  {
    name: "TAILORx", /** page data - passed as props */
    subjects: "1000", /** page data - passed as props */
    datafield: 'tumor_grades',
    isChecked: false, /** provided by redux store */
  },
  {
    name: "ATAILORx", /** page data - passed as props */
    subjects: "500", /** page data - passed as props */
    isChecked: false, /** provided by redux store */
    datafield: 'tumor_grades',
  },
  {
    name: "RTAILORx Space", /** page data - passed as props */
    subjects: "500", /** page data - passed as props */
    isChecked: false, /** provided by redux store */
    datafield: 'tumor_grades',
  }
];

export const facetValues2 = [
  {
    name: "TAILORx", /** page data - passed as props */
    subjects: "1000", /** page data - passed as props */
    datafield: 'tissue_type',
    isChecked: false, /** provided by redux store */
  },
  {
    name: "ATAILORx", /** page data - passed as props */
    subjects: "500", /** page data - passed as props */
    isChecked: false, /** provided by redux store */
    datafield: 'tissue_type',
  },
  {
    name: "RTAILORx Space", /** page data - passed as props */
    subjects: "500", /** page data - passed as props */
    isChecked: false, /** provided by redux store */
    datafield: 'tissue_type',
  }
];

export const dataState = {
  program: facetValues,
  tumor_grades: facetValues1,
  tissue_type: facetValues2,
}



export const facetActionsConfig = {
  resetIcon: {
    src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
    alt: 'Reset icon',
    height: '12 px',
    width: '12 px'
  }
} 
