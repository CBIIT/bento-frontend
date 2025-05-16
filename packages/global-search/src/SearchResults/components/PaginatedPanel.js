import React, { useEffect, useState } from 'react';
import {
  withStyles, Button, Grid, CircularProgress, Typography,
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
const PaginatedPanel = (props) => {
  const {
    classes, searchText, count,
    getTabData, pageSize, resultCardMap,
    field,
  } = props;

  if (!getTabData || typeof getTabData !== 'function') {
    return (
      <Typography variant="h5" color="error">
        No handler found to fetch paginated data.
      </Typography>
    );
  }

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [searchText, count]);

  return (
    <>
      {Math.ceil(count / pageSize) !== 0 && (
      <div className={classes.totalResults}>
        <span id="global_search_results_count" className={classes.totalCount}>{count}</span>
        {' '}
        Results
      </div>
      ) }
      <Grid className={classes.subsection}>
        <Grid item container direction="column" className={classes.subsectionBody} xs={9}>
          {renderCards()}
        </Grid>
      </Grid>
      {Math.ceil(count / pageSize) > 1 && (
      <div className={classes.paginationContainer}>
        <Button id="global_search_paginate_prev" onClick={onPrevious} className={classes.prevButton}>
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

        <Button id="global_search_paginate_next" onClick={onNext} className={classes.nextButton}>
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