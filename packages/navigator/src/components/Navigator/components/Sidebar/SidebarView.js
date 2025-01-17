import React from "react";
import FacetSections from "./Filter/FacetController";
import SearchTextView from "./Search/SearchView";

const SidebarView = ({
  handleClearFilter
}) => {
  return (
    <>
      <SearchTextView />
      <button onClick={handleClearFilter}> Clear All </button>
      <FacetSections />
    </>
  );
}

export default SidebarView;
