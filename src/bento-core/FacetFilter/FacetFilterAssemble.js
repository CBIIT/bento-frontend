import React, { useEffect, useReducer } from 'react';
import { Button, Divider } from '@material-ui/core';
import { generateClearAllFilterBtn } from './generator/component';
import FacetFilterController from './FacetFilterController';

const FacetFilterAssemble = ({
}) => {

  /**
  * generate clear all btn
  */
  const CustomClearAllFiltersBtn = ({onClearAllFilters, disable}) => {
    return (
      <Button disabled={disable} onClick={onClearAllFilters}>
        CLEAR ALL
      </Button>
    );
  };

  const ClearAllFiltersButton = () => generateClearAllFilterBtn(CustomClearAllFiltersBtn);

  /**
   * generate Divider
   */
  const FacetSectionDivider = ({id, index}) => {
    return (
      <Divider
        style={{
          height: '5px',
          backgroundColor: '#000',
        }}
        id={id}
      />
    );
  };

  return (
    <>
      <FacetFilterController
        ClearAllFiltersButton={ClearAllFiltersButton}
        FacetSectionDivider={FacetSectionDivider}
      >
      </FacetFilterController>
    </>
  );
}

export default FacetFilterAssemble;
