import React from 'react';
import FacetSections from './Filter/FacetController';
import SearchTextView from './Search/SearchView';
import * as Styled from './Sidebar.styled';
import SummaryView from './Search/Summary/SummaryView';
import SearchHistoryView from './Search/History/HistoryView';
import { useModelContext } from '../../state/NavContextProvider';
import { onClearAllFilter } from '../../state/actions/Action';

const SidebarView = ({
  handleClearFilter,
}) => {
  /**
  * use context access data model state
  */
  const { context } = useModelContext();
  const handleClearAllFilter = () => {
    if (handleClearFilter) {
      handleClearFilter();
    }
    const { dispatch } = context;
    dispatch(onClearAllFilter());
  };

  return (
    <Styled.SidebarContainer className="sidebarContainer">
      <Styled.SearchBarTitle className="searchBarTitle">
        <Styled.SearchBarTitleText className="searchBarTitleText">
          Filter & Search
        </Styled.SearchBarTitleText>
      </Styled.SearchBarTitle>
      <Styled.SearchInputContrainer className="searchInputContrainer">
        <SearchTextView className="searchTextView" />
        <Styled.ClearAllBtn onClick={handleClearAllFilter} className="clearAllBtn">
          Clear All
        </Styled.ClearAllBtn>
      </Styled.SearchInputContrainer>
      <SummaryView />
      <SearchHistoryView />
      <FacetSections />
    </Styled.SidebarContainer>
  );
};

export default SidebarView;
