export const dashboardTable = {
  tableTitle: 'Cases',
  tableData: [
    {
      field: 'subject_id',
      label: 'Case ID',
      sort: 'asc',
      cellRenderPath: '/case',
      primary: true,
      display: true,
    },
    {
      field: 'program',
      label: 'Program Code',
      sort: 'asc',
      cellRenderPath: '/trial',
      display: true,
    },
    {
      field: 'study_acronym',
      label: 'Arm',
      sort: 'asc',
      display: true,
    },
    {
      field: 'diagnosis',
      label: 'Diagnosis',
      sort: 'asc',
      display: true,
    },
    {
      field: 'recurrence_score',
      label: 'Recurrence Score',
      sort: 'asc',
      display: true,
    },
    {
      field: 'tumor_size',
      label: 'Tumor Size (cm)',
      sort: 'asc',
      display: true,
    },
    {
      field: 'er_status',
      label: 'ER Status',
      sort: 'asc',
      display: true,
    },
    {
      field: 'pr_status',
      label: 'PR Status',
      sort: 'asc',
      display: true,
    },
    {
      field: 'age_at_index',
      label: 'Age (years)',
      sort: 'asc',
      display: true,
    },
    {
      field: 'survival_time',
      label: 'Survival (days)',
      sort: 'asc',
      display: true,
    },
  ],
};

export default dashboardTable;
