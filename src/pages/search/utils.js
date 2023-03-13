import client from '../../utils/graphqlClient';
import {
  SEARCH_PAGE_RESULT_FILES, SEARCH_PAGE_RESULT_MODEL,
  SEARCH_PAGE_RESULT_SAMPLES, SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_ABOUT, SEARCH_PAGE_RESULT_PROGRAM, SEARCH_PAGE_RESULT_SUBJECTS,
  SEARCH_PUBLIC, SEARCH_PAGE_RESULT_PROGRAM_PUBLIC, SEARCH_PAGE_RESULT_ABOUT_PUBLIC,
} from '../../bento/search';
import {
  getSearchPageResults, getPublicSearchPageResults,
} from '../dashboardTab/store/dashboardReducer';

/**
 * Calculates the search result count for the "All" tab
 *
 * @param {object} searchCounts
 * @param {boolean} isPublic is the search public or private
 * @returns {number} the total number of search results for the search
 */
function getAllCount(searchCounts, isPublic) {
  if (isPublic) {
    return (searchCounts.about_count || 0);
  }

  return (searchCounts.subject_count
    + searchCounts.sample_count + searchCounts.program_count
    + searchCounts.study_count + searchCounts.file_count
    + searchCounts.model_count + searchCounts.about_count) || 0;
}

/**
 * Maps the the GraphQL query to the correct search results query
 *
 * @param {string} field datatable field name
 */
export function getPrivateQuery(field) {
  switch (field) {
    case 'all':
      return SEARCH_PAGE_RESULT_SUBJECTS; // Starting point for ALL tab
    case 'subjects':
      return SEARCH_PAGE_RESULT_SUBJECTS;
    case 'samples':
      return SEARCH_PAGE_RESULT_SAMPLES;
    case 'files':
      return SEARCH_PAGE_RESULT_FILES;
    case 'programs':
      return SEARCH_PAGE_RESULT_PROGRAM;
    case 'studies':
      return SEARCH_PAGE_RESULT_STUDIES;
    case 'model':
      return SEARCH_PAGE_RESULT_MODEL;
    case 'about_page':
      return SEARCH_PAGE_RESULT_ABOUT;
    default:
      return SEARCH_PAGE_RESULT_SUBJECTS;
  }
}

/**
 * Maps the the GraphQL query to the correct search results query
 *
 * @param {string} field datatable field name
 */
export function getPublicQuery(field) {
  switch (field) {
    case 'all':
      return SEARCH_PUBLIC; // Starting point for ALL tab
    case 'subjects':
      return SEARCH_PAGE_RESULT_SUBJECTS;
    case 'samples':
      return SEARCH_PAGE_RESULT_SAMPLES;
    case 'files':
      return SEARCH_PAGE_RESULT_FILES;
    case 'programs':
      return SEARCH_PAGE_RESULT_PROGRAM_PUBLIC;
    case 'studies':
      return SEARCH_PAGE_RESULT_STUDIES;
    case 'model':
      return SEARCH_PAGE_RESULT_MODEL;
    case 'about_page':
      return SEARCH_PAGE_RESULT_ABOUT_PUBLIC;
    default:
      return SEARCH_PAGE_RESULT_SUBJECTS;
  }
}

/**
 * Performs an API query for the search results page
 *
 * @param {string} datafield
 * @param {object} input search query variable input
 * @param {boolean} isPublic is the search public or private
 */
export async function queryAPI(datafield, input, isPublic) {
  const data = await client.query({
    query: isPublic ? getPublicQuery(datafield) : getPrivateQuery(datafield),
    variables: input,
    context: {
      clientName: isPublic ? 'publicService' : '',
    },
  }).then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch));

  return data[datafield];
}

/**
 * Helper function to get the search results for the "All" tab
 *
 * This function determines the correct data field to query for the "All" tab
 *
 * @param {string} searchText
 * @param {number} calcOffset
 * @param {number} pageSize
 * @param {boolean} isPublic
 */
export async function getAll(searchText, calcOffset, pageSize, isPublic) {
  const searchResp = isPublic
    ? await getPublicSearchPageResults(searchText)
    : await getSearchPageResults(searchText);

  const custodianConfigForTabData = isPublic
    ? [{ countField: 'about_count', nameField: 'about_page' }]
    : [
      { countField: 'subject_count', nameField: 'subjects' },
      { countField: 'sample_count', nameField: 'samples' },
      { countField: 'file_count', nameField: 'files' },
      { countField: 'program_count', nameField: 'programs' },
      { countField: 'study_count', nameField: 'studies' },
      { countField: 'model_count', nameField: 'model' },
      { countField: 'about_count', nameField: 'about_page' },
    ];

  let acc = 0;
  const mapCountAndName = custodianConfigForTabData.map((obj) => {
    acc += searchResp[obj.countField];
    return { ...obj, value: acc };
  });

  // Create filter for next Query
  const filter = mapCountAndName.filter((obj) => obj.value > calcOffset)[0];
  const filterForOffset = mapCountAndName.filter((obj) => obj.value <= calcOffset);
  const val = filterForOffset.length === 0
    ? 0
    : filterForOffset[filterForOffset.length - 1].value;

  if (filter !== undefined) {
    return {
      datafieldValue: filter.nameField,
      offsetValue: (Math.abs(calcOffset - val) / pageSize) * pageSize,
    };
  }

  return { datafieldValue: isPublic ? 'about_page' : 'subject', offsetValue: 0 };
}

/**
 * Wrapper for the queryAPI function to get the All tab's data
 *
 * @param {string} inputValue the search input value
 * @param {number} calcOffset the offset value
 * @param {number} pageSize the pagination page size
 * @param {boolean} isPublic whether to use the public or private query
 */
export async function getDataForAll(inputValue, calcOffset, pageSize, isPublic) {
  const {
    datafieldValue,
    offsetValue,
  } = await getAll(inputValue, calcOffset, pageSize, isPublic);

  const input = {
    input: inputValue,
    first: pageSize,
    offset: offsetValue,
  };

  return queryAPI(datafieldValue, input, isPublic);
}

/**
 * Gets the data for the All tab
 *
 * @param {string} search the search input value
 * @param {number} pageSize the pagination page size
 * @param {number} newPage the current page number
 * @param {number} count the total number of results for the All tab
 * @param {boolean} isPublic whether to use the public or private query
 */
export async function getAllData(search, pageSize, newPage, count, isPublic) {
  // Fetch the initial data for the All tab
  let allData = await getDataForAll(search, (newPage - 1) * pageSize, pageSize, isPublic);

  // If the current set of data is less than the page size,
  // we need to query the next datafield for it's data
  if (allData && (allData.length !== pageSize)) {
    // Limit the number of queries to 5 to prevent infinite loops
    let apiQueries = 0;

    // Calculate the offset for the next datafield
    let calcOffset2 = (newPage - 1) * pageSize + allData.length;

    // Loop until we have enough data to fill the page
    // eslint-disable-next-line max-len
    while (apiQueries < 5 && allData.length !== count && calcOffset2 < count && allData.length !== pageSize) {
      // eslint-disable-next-line no-await-in-loop
      const data2 = await getDataForAll(search, calcOffset2, pageSize, isPublic);
      allData = [...allData, ...data2];
      calcOffset2 = (newPage - 1) * pageSize + allData.length;
      apiQueries += 1;
    }
  }

  return allData && allData.slice(0, pageSize);
}

/**
 * Generates a structured configuration object for the tab sections
 * used by the Global Search SearchResults component
 *
 * @param {object} classes material-ui classes object
 * @param {object} searchCounts search counts object
 * @param {boolean} isPublic is the search public or private
 * @returns {object} table section config
 */
export const getTabSections = (classes, searchCounts, isPublic) => [
  {
    name: 'All',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.allTab,
    },
    count: getAllCount(searchCounts, isPublic) || 0,
    value: '1',
    getData: async (search, pageSize, currentPage) => {
      const newCount = getAllCount(searchCounts, isPublic);
      const allData = await getAllData(search, pageSize, currentPage, newCount, isPublic);

      return (allData || []).slice(0, pageSize);
    },
  },
  {
    name: 'Cases',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.subjectTab,
    },
    count: searchCounts.subject_count || 0,
    value: `${isPublic ? 'inactive-' : ''}2`,
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('subjects', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
  {
    name: 'Samples',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.sampleTab,
    },
    count: searchCounts.sample_count || 0,
    value: `${isPublic ? 'inactive-' : ''}3`,
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('samples', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
  {
    name: 'Files',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.fileTab,
    },
    count: searchCounts.file_count || 0,
    value: `${isPublic ? 'inactive-' : ''}4`,
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('files', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
  {
    name: 'Programs',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.programTab,
    },
    count: searchCounts.program_count || 0,
    value: `${isPublic ? 'inactive-' : ''}5`,
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('programs', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
  {
    name: 'Studies',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.studyTab,
    },
    count: searchCounts.study_count || 0,
    value: `${isPublic ? 'inactive-' : ''}6`,
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('studies', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
  {
    name: 'Data Model',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.dataTab,
    },
    count: searchCounts.model_count || 0,
    value: `${isPublic ? 'inactive-' : ''}7`,
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('model', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
  {
    name: 'About',
    classes: {
      root: classes.buttonRoot,
      wrapper: classes.aboutTab,
    },
    count: searchCounts.about_count || 0,
    value: '8',
    getData: async (search, pageSize, currentPage) => {
      const input = {
        input: search,
        first: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      const data = await queryAPI('about_page', input, isPublic);

      return data.slice(0, pageSize);
    },
  },
];
