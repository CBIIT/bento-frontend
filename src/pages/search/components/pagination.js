/* eslint-disable */
import React, { useState } from 'react';
import {
  withStyles, Button
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

function SearchPagination({classes}) {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(100);
  const [pageSize, setPageSize] = useState(3);

  const onNext = (e) => {
    if(page < count){
      setPage(page + 1)
      }
  };

  const onPrevious = (e) => {
    if(page > 1){
    setPage(page - 1)
    }
  };

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  return (
    <>
    <div className={classes.root1}>

      <div className={classes.root}>
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
      count={count}
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
      </div>
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
  prevIcon: {
    height: '12px',
    margin: '0px 12px 0px 6px',
  },
  nextButton: {
    marginLeft: '44px',
    fontFamily: '"Open Sans", sans-serif',
    fontWeight: 'bold',

    fontSize: '12px',
      },
      nextIcon: {
        height: '12px',
        margin: '0px 6px 0px 12px',
      },
  root1: {

  },
  root: {
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
    "& .MuiPaginationItem-root": {
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
};

export default withStyles(styles)(SearchPagination);