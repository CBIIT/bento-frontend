import React from 'react';
import * as Styled from './Summary.styled';
import { useModelContext } from '../../../../state/NavContextProvider';

const SummaryView = () => {
  const { context } = useModelContext();
  const { isSearchMode, summary: summaryCount } = context;
  if (!isSearchMode) {
    return <></>;
  }

  const noResults = Object.keys(summaryCount || {}).length < 1;

  return (
    <Styled.ResultSummaryContain className="resultSummaryContain">
      {noResults ? (
        <Styled.NoResult className="noResultMsg">
          0 results found. Please try another keyword.
        </Styled.NoResult>
      ) : (
        <>
          <Styled.LabelText className="labelText">
            Search Results
          </Styled.LabelText>
          <Styled.ResultList className="resultList">
            <Styled.ResultItem className="resultItem">
              <Styled.ResultCountTitleDesc className="resultCountTitleDesc">
                {summaryCount.title + summaryCount.desc}
              </Styled.ResultCountTitleDesc>
              <span className="matchCounts">
                Match(es) in nodes
                <br />
                (title and description)
              </span>
            </Styled.ResultItem>
            <Styled.ResultItem>
              <Styled.ResultCountProps>
                {summaryCount.properties}
              </Styled.ResultCountProps>
              &nbsp;
              <span>Match(es) in node properties</span>
            </Styled.ResultItem>
          </Styled.ResultList>
        </>
      )}
    </Styled.ResultSummaryContain>
  );
};

export default SummaryView;
