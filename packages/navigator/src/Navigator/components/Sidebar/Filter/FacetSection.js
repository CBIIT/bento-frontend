import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import FacetView from './FacetView';
import * as Styled from './FacetSection.styled';

const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
};

const sortLabels = {
  sortAlphabetically: 'Sort alphabetically',
  sortByCount: 'Sort by counts',
  showMore: '...expand to see all selections',
};

const defaultExpansion = true;

const FacetSection = ({
  section,
  facetItemCount,
  handleClearSection,
  activeFacet = {},
}) => {
  const [expand, setExpand] = useState(true);
  const [sortBy, setSortBy] = useState('facetItem');

  const getCeckedItems = (items) => {
    const facets = Object.keys(items);
    const activeFacets = facets.reduce(
      (acc, facet) => {
        const item = items[facet];
        if (item.isChecked) {
          acc[facet] = item;
        }
        return acc;
      }, {},
    );
    return activeFacets;
  };
  // display clear button
  const activeFacetValues = Object.values(activeFacet);

  return (
    <>
      {
        Object.keys(section || {}).map(
          (sectionName) => (
            <>
              <Styled.FacetAccordian defaultExpanded={defaultExpansion}>
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

                <FacetView
                  checkBoxItems={section[sectionName]}
                  facetItemCount={facetItemCount}
                  sortBy={sortBy}
                />
              </Styled.FacetAccordian>
              {
                (!expand) && (
                  <>
                    <FacetView
                      checkBoxItems={getCeckedItems(section[sectionName])}
                      facetItemCount={facetItemCount}
                    />
                  </>
                )
              }
            </>
          ),
        )
      }
    </>
  );
};

export default FacetSection;
