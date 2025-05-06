import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import CheckBoxView from './CheckBoxView';
import * as Styled from './FacetSection.styled';

const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
};

const sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections',
};

// const defaultExpansion = true;

const FacetView = ({
  checkBoxItems,
  facetItemCount,
  sectionName,
  handleClearSection,
  activeFacet,
}) => {
  const [expand, setExpand] = useState(true);
  const [sortBy, setSortBy] = useState('facetItem');

  const itemCount = Object.keys(checkBoxItems || {}).length;
  const facetItemItems = Object.keys(checkBoxItems || {}).map((key) => {
    const item = checkBoxItems[key];
    return {
      facetItem: item.facetItem,
      isChecked: item.isChecked,
      count: facetItemCount[item.facetItem]?.length || 0,
    };
  });

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

  // Primary sort based on 'sortBy' criterion
  const primarySortedItems = facetItemItems.sort((a, b) => {
    if (sortBy === 'count') {
      return alphaNumericSort(b, a);
    }
    return alphaNumericSort(a, b);
  });

  // Secondary sort to prioritize checked items
  const sortFacetItems = primarySortedItems.sort((a, b) => {
    if (a.isChecked === b.isChecked) {
      return 0;
    }
    return a.isChecked ? -1 : 1;
  });
  // display clear button
  const activeFacetValues = Object.values(activeFacet);

  const getCeckedItems = () => {
    const facets = Object.keys(checkBoxItems);
    const activeFacets = facets.reduce(
      (acc, facet) => {
        const item = checkBoxItems[facet];
        if (item.isChecked) {
          acc.push(item);
        }
        return acc;
      }, [],
    );
    return activeFacets.map((item, index) => (
      <>
        <CheckBoxView
          checkBoxItem={item}
          key={index}
          display={itemCount > (index + 1)}
        />
      </>
    ));
  };

  return (
    <>
      <Styled.FacetLabelAndResetBtn>
        <Styled.FacetAccordianSummary
          expandIcon={<Styled.MuiExpandMoreIcon />}
          onClick={() => setExpand(!expand)}
        >
          <Styled.FacetLabelDiv>
            <span>{sectionName}</span>
          </Styled.FacetLabelDiv>
        </Styled.FacetAccordianSummary>
        {
          (activeFacetValues.includes(sectionName)) && (
            <Styled.ResetBtnDiv>
              <IconButton onClick={() => handleClearSection(sectionName)}>
                <Styled.ResetIcon
                  src={resetIcon.src}
                  alt="reset-icon"
                />
              </IconButton>
            </Styled.ResetBtnDiv>
          )
        }
      </Styled.FacetLabelAndResetBtn>
      {
        (expand) && (
          <>
            <Styled.SortGroup>
              <Styled.SortGroupItem
                highlight={sortBy === 'facetItem'}
                onClick={() => setSortBy('facetItem')}
              >
                {sortLabels.sortAlphabetically}
              </Styled.SortGroupItem>
              <Styled.SortGroupItem
                highlight={sortBy === 'count'}
                onClick={() => setSortBy('count')}
              >
                {sortLabels.sortByCount}
              </Styled.SortGroupItem>
            </Styled.SortGroup>
            {
              sortFacetItems.map(
                (item, index) => (
                  <div>
                    <CheckBoxView
                      checkBoxItem={checkBoxItems[item.facetItem]}
                      key={index}
                      display={itemCount > (index + 1)}
                    />
                  </div>
                ),
              )
            }
          </>
        )
      }
      {
        (!expand) && (
          <>
            {getCeckedItems()}
          </>
        )
      }
    </>
  );
};

export default FacetView;
