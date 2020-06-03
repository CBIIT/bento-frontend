const mappingCheckBoxToDataTable = [
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
];

export default mappingCheckBoxToDataTable;
