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
    <Styled.ResultSummaryContain>
      {noResults ? (
        <Styled.NoResult>
          0 results found. Please try another keyword.
        </Styled.NoResult>
      ) : (
        <>
          <Styled.LabelText>
            Search Results
          </Styled.LabelText>
          <Styled.ResultList>
            <Styled.ResultItem>
              <Styled.ResultCountTitleDesc>
                {summaryCount.title + summaryCount.desc}
              </Styled.ResultCountTitleDesc>
              <span>
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
