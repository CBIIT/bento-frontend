/* eslint-disable no-await-in-loop */
import React, { useState, useEffect } from 'react';
import {
  withStyles, Button, Grid,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Components from './component';
import client from '../../../utils/graphqlClient';
import {
  SEARCH_PAGE_RESULT_PROGRAM,
  SEARCH_PAGE_RESULT_STUDIES,
  SEARCH_PAGE_RESULT_SUBJECTS,
  SEARCH_PAGE_RESULT_SAMPLES,
  SEARCH_PAGE_RESULT_FILES,
  SEARCH_PAGE_RESULT_MODEL,
  SEARCH_PAGE_RESULT_ABOUT,
} from '../../../bento/search';
import { getSearchPageResults } from '../../dashboardTab/store/dashboardReducer';

function SearchPagination({
  datafield, classes, searchText, count,
}) {
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const [data, setdata] = useState([]);

  async function getAll(newPage, calcOffset) {
    // const calcOffset = (newPage - 1) * pageSize;
    const searchResp = await getSearchPageResults(searchText);

    const custodianConfigForTabData = [
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
    // Create filter to calulate the Offset
    const filterForOffset = mapCountAndName.filter((obj) => obj.value <= calcOffset);
    // eslint-disable-next-line max-len
    const val = filterForOffset.length === 0 ? 0 : filterForOffset[filterForOffset.length - 1].value;
    // eslint-disable-next-line max-len
    if (filter !== undefined) {
      // eslint-disable-next-line max-len
      return { datafieldValue: filter.nameField, offsetValue: (Math.abs(calcOffset - val) / pageSize) * pageSize };
    }
    return { datafieldValue: 'subject', offsetValue: 0 };
  }

  function getQuery(field) {
    switch (field) {
      case 'all':
        return { QUERY: SEARCH_PAGE_RESULT_SUBJECTS, field: 'all' };
      case 'subjects':
        return { QUERY: SEARCH_PAGE_RESULT_SUBJECTS, field: 'subjects' };
      case 'samples':
        return { QUERY: SEARCH_PAGE_RESULT_SAMPLES, field: 'samples' };
      case 'files':
        return { QUERY: SEARCH_PAGE_RESULT_FILES, field: 'files' };
      case 'programs':
        return { QUERY: SEARCH_PAGE_RESULT_PROGRAM, field: 'programs' };
      case 'studies':
        return { QUERY: SEARCH_PAGE_RESULT_STUDIES, field: 'studies' };
      case 'model':
        return { QUERY: SEARCH_PAGE_RESULT_MODEL, field: 'model' };
      case 'about_page':
        return { QUERY: SEARCH_PAGE_RESULT_ABOUT, field: 'about_page' };
      default:
        return { QUERY: SEARCH_PAGE_RESULT_SUBJECTS, field: 'subjects' };
    }
  }

  async function getDataForAll(inputVlaue, newPage, calcOffset) {
    const { datafieldValue, offsetValue } = await getAll(newPage, calcOffset);
    const { QUERY } = getQuery(datafieldValue);
    const allids = await client
      .query({
        query: QUERY,
        variables: {
          input: inputVlaue,
          first: pageSize,
          offset: offsetValue,
        },
      })
      .then((result) => result.data.globalSearch);
    return allids[datafieldValue];
  }

  async function getPageResults(inputVlaue, newPage) {
    if (count > 0) { // no need network calls if count is zero
      if (datafield === 'all') {
        const calcOffset = (newPage - 1) * pageSize;
        let allData = await getDataForAll(inputVlaue, newPage, calcOffset);
        // Check if we need another query to get full pageSize data
        if (allData && (allData.length !== pageSize)) {
          let calcOffset2 = (newPage - 1) * pageSize + allData.length;
          while (allData.length !== count && calcOffset2 < count && allData.length !== pageSize) {
            const data2 = await getDataForAll(inputVlaue, newPage, calcOffset2);
            allData = [...allData, ...data2];
            calcOffset2 = (newPage - 1) * pageSize + allData.length;
          }
        }
        return allData.slice(0, pageSize);
      }
      const { QUERY, field } = getQuery(datafield);
      const allids = await client
        .query({
          query: QUERY,
          variables: {
            input: inputVlaue,
            first: pageSize,
            offset: (newPage - 1) * pageSize,
          },
        })
        .then((result) => result.data.globalSearch);
      return allids[field].slice(0, pageSize);
    }
    return [];
  }

  async function onChange(newValue = [], newPage = 1) {
    const searchResp = await getPageResults(newValue, newPage);
    setdata(searchResp);
  }

  useEffect(() => {
    setPage(1);
    setdata([]);
    onChange(searchText);
  }, [searchText, datafield]);

  const onNext = () => {
    if (page < Math.ceil(count / pageSize)) {
      onChange(searchText, page + 1);
      setPage(page + 1);
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      onChange(searchText, page - 1);
      setPage(page - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 54,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    onChange(searchText, newPage);
    setPage(newPage);
    scrollToTop();
  };

  return (
    <>
      {Math.ceil(count / pageSize) !== 0 && (
      <div className={classes.totalResults}>
        <span className={classes.totalCount}>{count}</span>
        {' '}
        Results
      </div>
      ) }
      <Grid className={classes.subsection}>
        <Grid item container direction="column" className={classes.subsectionBody} xs={9}>

          { data !== undefined ? data.length !== 0 ? data.map(
          // eslint-disable-next-line max-len
            (block, index) => <Components searchText={searchText} data={block} classes index={(page - 1) * pageSize + index} />,
          )
            : <div>No data</div> : <div>No data</div>}
        </Grid>
      </Grid>
      {Math.ceil(count / pageSize) > 1 && (
      <div className={classes.paginationContainer}>
        <Button sx={{ borderRadius: 100 }} onClick={onPrevious} className={classes.prevButton}>
          <span>
            <img
              className={classes.prevIcon}
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchPrevious.svg"
              alt="previous button"
            />

          </span>
          previous
        </Button>

        <Pagination
          classes={{ ul: classes.paginationUl }}
          className={classes.paginationRoot}
          count={Math.ceil(count / pageSize)}
          page={page}
          siblingCount={2}
          boundaryCount={1}
          shape="rounded"
          hideNextButton
          hidePrevButton
          onChange={handleChangePage}
        />
        <Button sx={{ borderRadius: 100 }} onClick={onNext} className={classes.nextButton}>
          next
          <span>
            <img
              className={classes.nextIcon}
              src="https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/globalSearchNext.svg"
              alt="previous button"
            />
          </span>
        </Button>

      </div>
      )}
    </>
  );
}

const styles = {
  prevButton: {
    marginRight: '44px',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '12px',
  },
  iconSpan: {
    marginTop: '6px',
  },
  nextButton: {
    marginLeft: '44px',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'bold',

    fontSize: '12px',
  },
  nextIcon: {
    height: '12px',
    margin: '6px 6px 0px 12px',
  },
  prevIcon: {
    height: '12px',
    margin: '6px 12px 0px 12px',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '680px',
    margin: '0 auto',
    paddingBottom: '20px',
    '& > *': {
      marginTop: '8px',
    },
  },
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  paginationUl: {
    padding: '2px',
    '& .MuiPaginationItem-root': {
      color: '#565656',
      fontFamily: '"Open Sans", sans-serif',
      fontSize: '11px',
      fontWeight: 'bold',
    },
  },
  paginationRoot: {
    '& .Mui-selected': {
      backgroundColor: '#D9E8F8',
    },
  },
  content: {
    fontSize: '12px',
  },
  subsectionBody: {
    margin: '0 auto',
    maxWidth: '800px',
    // borderBottom: '1px solid #8DCAFF',
    paddingBottom: '15px',
  },
  subsection: {
    '&:last-child $subsectionBody': {
      borderBottom: 'none',
    },
  },
  descriptionPart: {
    paddingBottom: '26px',
  },
  description: {
    fontWeight: 'bold',
  },
  link: {
    color: '#DD401C',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:visited': {
      color: '#9F3D26',
    },
  },
  totalResults: {
    // margin: '0 auto',
    maxWidth: '900px',
    fontFamily: 'Nunito',
    color: '#000',
    fontSize: '20px',
    fontWeight: '300',
    margin: '16px auto',
    paddingLeft: '32px',
  },
  totalCount: {
    fontFamily: 'Inter',
  },
};

export default withStyles(styles)(SearchPagination);
