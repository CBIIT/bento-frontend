/**
 * Generate the default styling for the component
 */
export default () => ({
  queryWrapper: {
    height: '120px',
    backgroundColor: '#f1f1f1',
    padding: '14px 14px 0px 35px',
    overflowY: 'auto',
  },
  queryContainer: {
    marginLeft: 5,
    position: 'relative',
    lineHeight: '2.4em',
    fontFamily: 'Nunito',
    fontSize: '14px',
    color: '#0e3151',
  },
  filterName: {
    textTransform: 'uppercase',
    padding: '3px 6px 3px 6px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
  },
  filterCheckboxes: {
    padding: '3px 6px 3px 6px',
    borderRadius: 5,
    fontSize: 12,
    fontWeight: 600,
    border: '0.5px solid #646464',
    width: 'fit-content',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  bracketsOpen: {
    fontSize: 20,
    fontFamily: 'Nunito',
    color: '#646464',
    marginRight: 3,
    fontWeight: 600,
  },
  bracketsClose: {
    fontSize: 20,
    fontFamily: 'Nunito',
    color: '#646464',
    marginLeft: 3,
    fontWeight: 600,
  },
  ellipsis: {
    fontFamily: 'Nunito',
    fontWeight: 600,
    fontSize: 10,
    marginLeft: 3,
  },
  operators: {
    color: '#646464',
    marginLeft: '3px',
    marginRight: '3px',
    borderBottom: 'none',
    textDecoration: 'none',
    fontSize: 10,
    fontWeight: 'bold',
  },
  clearQueryButton: {
    margin: '1px',
    marginLeft: -6,
    fontWeight: 600,
    fontSize: '13px',
    color: '#fff',
    borderRadius: '15px',
    fontFamily: 'Nunito',
    boxSizing: 'border-box',
    backgroundColor: '#646464',
    textTransform: 'capitalize',
    border: '1px solid #B4B4B4',
    padding: '1px 5px 0px 6px',
    '&:hover': {
      backgroundColor: '#646464',
    },
  },
  divider: {
    padding: '0 0 3px 0',
    fontSize: '23px',
    borderRight: '1px solid #969696',
    marginLeft: 7,
  },
  /* Custom Styling by Project */
  localFind: {
    color: '#7AA6B6',
  },
  localFindBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionCases: {
    color: '#7AA6B6',
  },
  facetSectionCasesBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionFiles: {
    color: '#E636E4',
  },
  facetSectionFilesBackground: {
    backgroundColor: '#F5C3F1',
  },
  facetSectionDemographics: {
    color: '#7AA6B6',
  },
  facetSectionDemographicsBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionDiagnosis: {
    color: '#7AA6B6',
  },
  facetSectionDiagnosisBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionSamples: {
    color: '#7AA6B6',
  },
  facetSectionSamplesBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionDatacategory: {
    color: '#7AA6B6',
  },
  facetSectionDatacategoryBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionStudy: {
    color: '#7AA6B6',
  },
  facetSectionStudyBackground: {
    backgroundColor: '#E4ECE9',
  },
  facetSectionLibrary: {
    color: '#7AA6B6',
  },
  facetSectionLibraryBackground: {
    backgroundColor: '#E4ECE9',
  },
});
