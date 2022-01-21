import {
  facetSearchData, resetIcon, facetSectionVariables,
  defaultFacetSectionVariables,
  sortLabels, showCheckboxCount,
  resetIconFilter,
} from '../../bento/dashboardData';

import customSectionFunctions from './customSidebarComponents/customSectionFunctions';

const sideBarConfig = {
  sideBar: {
    functions: null,
    ui: null,
    styles: null,
    props: {
      facetSearchData,
      resetIcon,
    },
  },
  sideBarSections: {
    functions: customSectionFunctions,
    ui: null,
    styles: null,
    props: {
      facetSectionVariables,
      defaultFacetSectionVariables,
      sortLabels,
      showCheckboxCount,
      resetIconFilter,
    },
  },
  sideBarGroups: {
    functions: null,
    ui: null,
    styles: null,
    props: {},
  },
  sideBarCheckBox: {
    functions: null,
    ui: null,
    styles: null,
    props: {},
  },
};

export default sideBarConfig;
