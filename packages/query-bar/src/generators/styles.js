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
    fontSize: '12px',
    color: '#000000',
  },
  filterName: {
    textTransform: 'uppercase',
    padding: '3px 6px 3px 6px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    backgroundColor: '#E6FFF9',
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
    fontSize: '12px',
    color: '#fff',
    borderRadius: '5px',
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
    color: '#357288',
  },
  facetSectionDemographicsBackground: {
    backgroundColor: '#E2F1F5',
    border: '1px solid #646464',
  },
  facetSectionDiagnosis: {
    color: '#8C3F8D',
  },
  facetSectionDiagnosisBackground: {
    backgroundColor: '#FFF2DF',
    border: '1px solid #646464',
  },
  facetSectionSamples: {
    color: '#907642',
  },
  facetSectionSamplesBackground: {
    backgroundColor: '#F0DFBD40',
    border: '1px solid #646464',
  },
  facetSectionDatacategory: {
    color: '#A85348',
  },
  facetSectionDatacategoryBackground: {
    backgroundColor: '#F8D7D240',
    border: '1px solid #646464',
  },
  facetSectionStudy: {
    color: '#1F6BBF',
  },
  facetSectionStudyBackground: {
    backgroundColor: '#F6F0FB',
    border: '1px solid #646464',
  },
  facetSectionLibrary: {
    color: '#14A773',
  },
  facetSectionLibraryBackground: {
    backgroundColor: '#DDEAE540',
    border: '1px solid #646464',
  },
});
