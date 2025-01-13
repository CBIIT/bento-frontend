import React from "react";
import FacetSections from "./Filter/FacetController";

const SidebarView = ({
  handleClearFilter
}) => {
  return (
    <>
      <button onClick={handleClearFilter}> Clear All </button>
      <FacetSections />
    </>
  );
}

export default SidebarView;
