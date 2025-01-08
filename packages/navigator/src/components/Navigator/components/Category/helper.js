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

export const categoryColorAndIcon = {
  administrative : {
    color: '#9C2E1F',
    background: '#691706',
    tableIcon: adminIconTable,
    pdfIcon: adminIconPdf,
    legendIcon: adminIconLegend,
  },
  study: {
    color: '#9775FF',
    background: '#4D31A2',
    tableIcon: studyIconTable,
    pdfIcon: studyIconPdf,
    legendIcon: studyIconLegend
  },
  clinical_trial: {
    color: '#00A0BA',
    background: '#043F55',
    tableIcon: clinicalTrialIconTable,
    pdfIcon: clinicalTrialIconPdf,
    legendIcon: clinicalTrialIconLegend
  },
  case: {
    color: '#FF7E14',
    background: '#672900',
    tableIcon: caseIconTable,
    pdfIcon: caseIconPdf,
    legendIcon: caseIconLegend,
  },
  biospecimen: {
    color: '#00785A',
    background: '#063126',
    tableIcon: biospecimenIconTable,
    pdfIcon: biospecimenIconPdf,
    legendIcon: biospecimenIconLegend,
  },
  clinical: {
    color: '#1C75BB',
    background: '#073A61',
    tableIcon: clinicalIconTable,
    pdfIcon: clinicalIconPdf,
    legendIcon: clinicalIconLegend,
  },
  data_file: {
    color: '#00AC0E',
    background: '#023806',
    tableIcon: dataFileIconTable,
    pdfIcon: dataFileIconPdf,
    legendIcon: dataFileIconLegend,
  },
  analysis: {
    color: '#B533A9',
    background: '#6F0065',
    tableIcon: analysisIconTable,
    pdfIcon: analysisIconPdf,
    legendIcon: analysisIconLegend,
  }
}

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

export const defaultCategory = {
  icon: IconDefault,
  color: '#9B9B9B',
};

export const getCategoryColor = (category) => {
  if (nodeCategoryList[category]) {
    return nodeCategoryList[category].color;
  }

  return defaultCategory.color;
};
