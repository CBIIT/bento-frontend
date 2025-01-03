/**
 * pdf icon import
 */
import studyIconPdf from './icons/Pdf/study.png';
import caseIconPdf from './icons/Pdf/case.png';
import clinicalTrialIconPdf from './icons/Pdf/clinical_trial.png';
import adminIconPdf from './icons/Pdf/administrative.png';
import biospecimenIconPdf from './icons/Pdf/biospecimen.png';
import analysisIconPdf from './icons/Pdf/analysis.png';
import dataFileIconPdf from './icons/Pdf/data_file.png';
import clinicalIconPdf from './icons/Pdf/clinical.png';

/**
 * table icon import
 */
import studyIconTable from './icons/Table/study.svg';
import caseIconTable from './icons/Table/case.svg';
import clinicalTrialIconTable from './icons/Table/clinical_trial.svg';
import adminIconTable from './icons/Table/administrative.svg';
import biospecimenIconTable from './icons/Table/biospecimen.svg';
import analysisIconTable from './icons/Table/analysis.svg';
import dataFileIconTable from './icons/Table/data_file.svg';
import clinicalIconTable from './icons/Table/clinical.svg';


/**
 * legend icon import
 */
import studyIconLegend from './icons/Legend/lg_study.svg';
import caseIconLegend from './icons/Legend/lg_case.svg';
import clinicalTrialIconLegend from './icons/Legend/lg_clinical_trial.svg';
import adminIconLegend from './icons/Legend/lg_administrative.svg';
import biospecimenIconLegend from './icons/Legend/lg_biospecimen.svg';
import analysisIconLegend from './icons/Legend/lg_analysis.svg';
import dataFileIconLegend from './icons/Legend/lg_data_file.svg';
import clinicalIconLegend from './icons/Legend/lg_clinical.svg';

import IconDefault from './icons/icon_default.svg';

const iconUrl = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/data_model_pdf_icons/icdc/DMN/'
export const graphIconUrl = iconUrl + 'graph/';
export const legendIconUrl = iconUrl + 'legend/';
export const tableIconUrl = iconUrl + 'table/';

const nodeCategoryList = {
  administrative: {
    // icon: Administrative,
    color: '#9C2E1F',
    background: '#691706',
  },
  study: {
    // icon: Study,
    color: '#9775FF',
    background: '#4D31A2',
  },
  clinical_trial: {
    // icon: ClinicalTrial,
    color: '#00A0BA',
    background: '#043F55',
  },
  case: {
    // icon: Case,
    color: '#FF7E14',
    background: '#672900',
  },
  biospecimen: {
    // icon: Biospecimen,
    color: '#00785A',
    background: '#063126',
  },
  clinical: {
    // icon: Clinical,
    color: '#1C75BB',
    background: '#073A61',
  },
  data_file: {
    // icon: DataFile,
    color: '#00AC0E',
    background: '#023806',
  },
  metadata_file: {
    // icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    // icon: Analysis,
    color: '#B533A9',
    background: '#6F0065',
  }
};

const graphNodeCategoryList = {
  clinical: {
    // icon: IconClinicalGraph,
    color: '#05B8EE',
  },
  biospecimen: {
    // icon: IconBiospecimenGraph,
    color: '#28AE60',
  },
  data_file: {
    // icon: IconDataFileGraph,
    color: '#7EC500',
  },
  metadata_file: {
    // icon: IconMetadata,
    color: '#F4B940',
  },
  analysis: {
    // icon: IconAnalysisGraph,
    color: '#FF7ABC',
  },
  administrative: {
    // icon: IconAdministrativeGraph,
    color: '#9B2C1F',
  },
  case: {
    // icon: IconCaseGraph,
    color: '#FF7F15',
  },
  study: {
    // icon: IconStudyGraph,
    color: '#AD91FF',
  },
  clinical_trial: {
    // icon: IconClinicalTrialGraph,
    color: '#1C75BC',
  },
};

export const pdfNodeCategoryList = {
  clinical: {
    icon: clinicalIconPdf,
    color: '#05B8EE',
  },
  biospecimen: {
    icon: biospecimenIconPdf,
    color: '#28AE60',
  },
  data_file: {
    icon: dataFileIconPdf,
    color: '#7EC500',
  },
  analysis: {
    icon: analysisIconPdf,
    color: '#FF7ABC',
  },
  administrative: {
    icon: adminIconPdf,
    color: '#9B2C1F',
  },
  case: {
    icon: caseIconPdf,
    color: '#FF7F15',
  },
  study: {
    icon: studyIconPdf,
    color: '#AD91FF',
  },
  clinical_trial: {
    icon: clinicalTrialIconPdf,
    color: '#1C75BC',
  },
};

export const tableNodeCategoryList = {
  clinical: {
    icon: clinicalIconTable,
    color: '#05B8EE',
  },
  biospecimen: {
    icon: biospecimenIconTable,
    color: '#28AE60',
  },
  data_file: {
    icon: dataFileIconTable,
    color: '#7EC500',
  },
  analysis: {
    icon: analysisIconTable,
    color: '#FF7ABC',
  },
  administrative: {
    icon: adminIconTable,
    color: '#9B2C1F',
  },
  case: {
    icon: caseIconTable,
    color: '#FF7F15',
  },
  study: {
    icon: studyIconTable,
    color: '#AD91FF',
  },
  clinical_trial: {
    icon: clinicalTrialIconTable,
    color: '#1C75BC',
  },
};

export const legendNodeCategoryList = {
  clinical: {
    icon: clinicalIconLegend,
    color: '#05B8EE',
  },
  biospecimen: {
    icon: biospecimenIconLegend,
    color: '#28AE60',
  },
  data_file: {
    icon: dataFileIconLegend,
    color: '#7EC500',
  },
  analysis: {
    icon: analysisIconLegend,
    color: '#FF7ABC',
  },
  administrative: {
    icon: adminIconLegend,
    color: '#9B2C1F',
  },
  case: {
    icon: caseIconLegend,
    color: '#FF7F15',
  },
  study: {
    icon: studyIconLegend,
    color: '#AD91FF',
  },
  clinical_trial: {
    icon: clinicalTrialIconLegend,
    color: '#1C75BC',
  },
};

export const defaultCategory = {
  icon: IconDefault,
  color: '#9B9B9B',
};

export const getCategoryIconSVG = (category) => {
  if (nodeCategoryList[category]) {
    return table+category;
  }

  return defaultCategory.icon;
};

export const getCategoryColor = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }

  return defaultCategory.color;
};

export const getCategoryBackground = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].background ||  nodeCategoryList[category].color;
  }

  return defaultCategory.color;
}

export const getCategoryStyle = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category];
  }
  return defaultCategory.color;
};

export const getGraphCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return graph+category;
  }
  return table+'default.svg';
};

export const getPdfCategoryIconSVG = (category) => {
  return pdfNodeCategoryList[category];
};

export const getLegendCategoryIconSVG = (category) => {
  if (graphNodeCategoryList[category]) {
    return legend+category;
  }

  return table+'default.svg';
};
