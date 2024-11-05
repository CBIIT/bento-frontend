import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { TableView } from '@bento-core/table';
import { setSelectedRows } from './TableService';

/**
* Updates table row when table state is changed 1. (paginated action) and 2. filter action
*/
const TableController = ((props) => {
  const { tblRows, table } = props;
  if (!tblRows) {
    return (
      <Container maxWidth="xl">
        <CircularProgress />
      </Container>
    );
  }
  /**
  * update rows
  * set selected rows isChecked to TRUE
  */
  const updateRows = setSelectedRows(tblRows, table);
  const {
    page = 0,
    rowsPerPage = 10,
    sortBy,
    sortOrder,
    groupBy,
    searchQuery,
  } = table;

  /**
  * client table aplhanumeric sorting for column table
  * uses string prototype function for sorting
  */
  const alphaNumericSort = (a, b) => `${a[sortBy]}`.localeCompare(
    `${b[sortBy]}`, undefined, {
      numeric: true,
      sensitivity: 'base',
    },
  );

  // use group index to customize cell view
  const groupingIndex = (array) => {
    if (array.length === 0) {
      return array;
    }
    const columnValues = array.map((item) => item[groupBy]);
    const distinctGroups = [...new Set(columnValues)];
    const indexedArray = [];
    distinctGroups.forEach((group) => {
      let index = 0;
      array.forEach((row) => {
        if (row[groupBy] === group) {
          indexedArray.push({
            ...row,
            groupIndex: index,
          });
          index += 1;
        }
      });
    });
    return indexedArray;
  };

  // sort order with row group
  // 1. sort by groupBy
  // 2. sort by current sort column
  const sortWithRowGrouping = (array = []) => {
    const sorted = array.sort((a, b) => {
      // if current sort column is not groupBy column
      // apply sorting with row grouping
      if (groupBy !== sortBy) {
        const rowGrouping = `${a[groupBy]}`.localeCompare(
          `${b[groupBy]}`, undefined, {
            numeric: true,
            sensitivity: 'base',
          },
        );
        if (rowGrouping !== 0) {
          return rowGrouping;
        }
      }

      if (sortOrder === 'asc') {
        return alphaNumericSort(a, b);
      }
      return alphaNumericSort(b, a);
    });

    return groupingIndex(sorted);
  };

  const arraySort = (a, b) => {
    // handles sort for the column with the array value
    const aHasData = a[sortBy] && a[sortBy].length > 0;
    const bHasData = b[sortBy] && b[sortBy].length > 0;
    return aHasData === bHasData ? 0 : aHasData ? -1 : 1;
  };

  /**
  * sort base on table state
  */
  const sortRows = (a, b) => {
    const areValuesArrays = Array.isArray(a[sortBy]) && Array.isArray(b[sortBy]);
    if (areValuesArrays) {
      if (sortOrder === 'asc') {
        return arraySort(a, b);
      }
      return arraySort(b, a);
    }

    if (sortOrder === 'asc') {
      return alphaNumericSort(a, b);
    }
    return alphaNumericSort(b, a);
  };

  // filter rows based on input serch query
  const filterBySearchQuery = (rows) => {
    if (!searchQuery) return rows;
    const query = searchQuery.toLowerCase();
    const viewRows = rows.filter((row) => {
      const rowValues = Object.keys(row)
        .map(key => `${row[key]}`.toLowerCase()).join(' ');
      return rowValues.includes(query);
    });
    return viewRows;
  };

  // sort based on row grouping
  // groupBy column name
  const sortedRows = (groupBy) ? sortWithRowGrouping(updateRows)
    : [...updateRows].sort((a, b) => sortRows(a, b));

  // filter by search Query
  const filterRows = filterBySearchQuery(sortedRows);

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayRows = [...filterRows].slice(startIndex, endIndex);

  return (
    <>
      <TableView
        {...props}
        table={{
          ...table,
          totalRowCount: filterRows.length,
        }}
        totalRows={tblRows}
        tableRows={displayRows}
      />
    </>
  );
});

export default TableController;
