/* eslint-disable no-unused-vars */
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
  SEARCH_PAGE_RESULT_VALUES,
  SEARCH_PAGE_RESULT_ABOUT,
} from '../../../bento/search';

function SearchPagination({
  datafield, classes, searchText, count,
}) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [data, setdata] = useState([]);

  function getQuery(field) {
    switch (field) {
      case 'all': {
        return SEARCH_PAGE_RESULT_SUBJECTS;
      }
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
      case 'values':
        return SEARCH_PAGE_RESULT_VALUES;
      case 'about_page':
        return SEARCH_PAGE_RESULT_ABOUT;
      default:
        return SEARCH_PAGE_RESULT_SUBJECTS;
    }
  }

  async function getSearchPageResults(inputVlaue, newPage) {
    const allids = await client
      .query({
        query: getQuery(datafield),
        variables: {
          input: inputVlaue,
          first: pageSize,
          offset: (newPage - 1) * pageSize,
        },
      })
      .then((result) => result.data.globalSearch);
    return allids[datafield];
  }

  async function onChange(newValue = [], newPage = 1) {
    const searchResp = await getSearchPageResults(newValue, newPage);
    setdata(searchResp);
  }

  useEffect(() => {
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

  const handleChangePage = (event, newPage) => {
    onChange(searchText, newPage);
    setPage(newPage);
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
    maxWidth: '680px',
    margin: '0 auto',
    paddingBottom: '80px',
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
    maxWidth: '1000px',
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
    maxWidth: '1100px',
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
