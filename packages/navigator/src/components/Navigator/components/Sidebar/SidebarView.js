import React from 'react';
import FacetSections from './Filter/FacetController';
import SearchTextView from './Search/SearchView';
import * as Styled from './Sidebar.styled';
import SummaryView from './Search/Summary/SummaryView';
import SearchHistoryView from './Search/History/HistoryView';

const SidebarView = ({
  handleClearFilter,
}) => (
  <Styled.SidebarContainer>
    <Styled.SearchBarTitle>
      <Styled.SearchBarTitleText>
        Filter & Search
      </Styled.SearchBarTitleText>
    </Styled.SearchBarTitle>
    <Styled.SearchInputContrainer>
      <SearchTextView />
      <Styled.ClearAllBtn onClick={handleClearFilter}>
        Clear All
      </Styled.ClearAllBtn>
    </Styled.SearchInputContrainer>
    <SummaryView />
    <SearchHistoryView />
    <FacetSections />
  </Styled.SidebarContainer>
);

export default SidebarView;
