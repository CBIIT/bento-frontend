import React from "react";
import FacetSections from "./Filter/FacetController";
import SearchTextView from "./Search/SearchView";

import * as Styled from './Sidebar.styled';

const SidebarView = ({
  handleClearFilter
}) => {
  return (
    <Styled.SidebarContainer>
      <Styled.SearchBarTitle>
        <Styled.SearchBarTitleText>
          Filter & Search
        </Styled.SearchBarTitleText>
      </Styled.SearchBarTitle>
      <Styled.SearchInputContrainer>
        <SearchTextView />
        <button onClick={handleClearFilter}>
          Clear All
        </button>
      </Styled.SearchInputContrainer>
      <FacetSections />
    </Styled.SidebarContainer>
  );
}

export default SidebarView;
