import React, { useEffect, useState, useRef } from 'react';
import {
  withStyles, Grid, CircularProgress, Typography,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { ResultCard } from './ResultCard';

/**
 * This component provides a wrapper for the paginated search results
 *
 * NOTE: Each PaginatedPanel represents a tab in the search results page
 * e.g. Files, Cases, etc.
 *
 * @param {object} props
 * @param {object} props.classes - Material UI styles
 * @param {string} props.searchText - The search text used for the search query
 * @param {number} props.count - The total number of results for this tab
 * @param {function} props.getTabData - The function to fetch paginated data
 * @param {number} props.pageSize - The number of results to fetch per page
 * @param {string} props.field - The field to search on
 * @param {object} [props.resultCardMap] - The mapping of search result types to JSX components
 */

const useOutsideAlerter = (ref) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target || (event.target.getAttribute('id') !== 'pageSizeBlock' && event.target.getAttribute('id') !== 'pageSizeArrow' && ref.current && !ref.current.contains(event.target))) {
        const toggle = document.getElementById('pageSizeBlock');
        if (document.getElementById('pagelist').style.visibility !== 'hidden') {
          toggle.click();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

const PaginatedPanel = (props) => {
  const {
    classes, searchText, count,
    getTabData, resultCardMap,
    field,
  } = props;

  if (!getTabData || typeof getTabData !== 'function') {
    return (
      <Typography variant="h5" color="error">
        No handler found to fetch paginated data.
      </Typography>
    );
  }

  const sizelist = [10, 20, 50, 100];
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageListVisible, setPageListVisible] = useState(0);
  const [pageSize, setSize] = useState(sizelist[0]);
  const perPageSelection = useRef(null);
  useOutsideAlerter(perPageSelection);

  async function onChange(newPage = 1) {
    // Reset data if search text is empty or there are no results
    if (!count || !searchText || searchText.length <= 0) {
      setData([]);
      return;
    }

    setLoading(true);
    const searchResp = await getTabData(field, pageSize, newPage).catch(() => []);
    setLoading(false);
    setData(searchResp);
  }

  const onNext = () => {
    if (page >= Math.ceil(count / pageSize)) {
      return;
    }

    onChange(page + 1);
    setPage(page + 1);
  };

  const onPrevious = () => {
    if (page <= 1) {
      return;
    }

    onChange(page - 1);
    setPage(page - 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 54,
      behavior: 'smooth',
    });
  };

  const handleChangePage = (event, newPage) => {
    onChange(newPage);
    setPage(newPage);
    scrollToTop();
  };

  const onPageSizeClick = (e) => {
    setSize(Number(e.target.innerText));
    setPageListVisible(!pageListVisible);
  };

  const renderCards = () => {
    if (loading) {
      return (
        <div className={classes.loadingMessageWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (!data || data.length <= 0) return <div style={{ marginTop: '20px' }}>No data</div>;

    return data.map((d, index) => (
      <ResultCard
        data={d}
        index={(page - 1) * pageSize + index}
        resultMap={resultCardMap}
        classes={classes}
        searchText={searchText}
        type={field}
      />
    ));
  };

  useEffect(() => {
    onChange();
  }, [searchText, count, pageSize]);

  return (
    <>
      {Math.ceil(count / pageSize) !== 0 && (
        <div className={classes.totalResults}>
          <span id="global_search_results_count" className={classes.totalCount}>{count}</span>
          {' '}
          Results
        </div>
      )}
      <Grid className={classes.subsection}>
        <Grid item container direction="column" className={classes.subsectionBody} xs={9}>
          {renderCards()}
        </Grid>
      </Grid>
      {Math.ceil(count / pageSize) !== 0 && (
        <div className={classes.paginationContainer}>
          <div className={classes.perPageContainer}>
            Results per Page:
            <div id="pageSizeBlock" className={classes.pageSizeContainer} onClick={() => setPageListVisible(!pageListVisible)}>
              {pageSize}
              <span id="pageSizeArrow" className={pageListVisible ? classes.pageSizeArrowUp : classes.pageSizeArrowDown} />
            </div>
            <div ref={perPageSelection} id="pagelist" className={classes.pageSizeList} style={pageListVisible ? null : { visibility: 'hidden' }}>
              {
                sizelist.map((sizeItem, idx) => {
                  const key = `size_${idx}`;
                  return (
                    sizeItem !== pageSize && (
                      <div key={key} className={classes.pageSizeItem} onClick={onPageSizeClick}>
                          {sizeItem}
                      </div>
                    )
                  );
                })
              }
            </div>
            <div className={classes.showingContainer}>
              Showing
              &nbsp;
              <div className={classes.showingRangeContainer}>
                {pageSize * (page - 1) + 1}
                -
                {pageSize * page < count ? pageSize * page : count}
                &nbsp;
              </div>
              of&nbsp;
              {count}
            </div>
          </div>
          <div className={classes.pageContainer}>
            <div
              className={page === 1
                ? classes.prevButtonDisabledContainer
                : classes.prevButtonContainer}
              onClick={onPrevious}
            >
              <div className={page === 1 ? classes.prevButtonDisabled : classes.prevButton} />
            </div>
            <Pagination
              disabletouchripple="true"
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
            <div
              className={page === Math.ceil(count / pageSize)
                ? classes.nextButtonDisabledContainer
                : classes.nextButtonContainer}
              onClick={onNext}
            >
              <div className={page === Math.ceil(count / pageSize)
                ? classes.nextButtonDisabled
                : classes.nextButton}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  prevButton: {
    marginRight: '44px',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'bold',
    fontSize: '12px',
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
    maxWidth: '800px',
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
      color: '#045B80',
      fontFamily: 'Poppins',
      fontSize: '14px',
      fontWeight: '300',
      minWidth: '25px',
      margin: '0',
      padding: '0 7px',
    },
    '& .MuiPaginationItem-page': {
      transition: 'none',
    },
  },
  paginationRoot: {
    '& .Mui-selected': {
      backgroundColor: 'transparent',
      fontWeight: '600',
    },
    '& .Mui-selected:hover': {
      backgroundColor: 'transparent',
    },
    '& .MuiPagination-ul': {
      padding: '0',
    },
    '& .MuiPagination-ul:hover': {
      cursor: 'pointer',
    },
    '& .MuiPagination-ul > li': {
      height: '32px;',
      borderTop: '1px solid #99A1B7',
      borderRight: '1px solid #99A1B7',
      borderBottom: '1px solid #99A1B7',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiPaginationItem-page': {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
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
  loadingMessageWrapper: {
    textAlign: 'center',
  },
};

export default withStyles(styles)(PaginatedPanel);
