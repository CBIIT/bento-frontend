/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable space-infix-ops */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable import/no-cycle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable import/order */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable arrow-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-quotes */

import React, { useState } from 'react';
import toggleSvg from "../../Category/icons/Legend/lg_link.svg";
import * as Styled from './Legend.styled';
import { useModelContext } from '../../../state/NavContextProvider';
import { categoryColorAndIcon } from '../../Category/helper';

const LegendView = () => {
  const [display, setDisplay] = useState(true);

  const { context } = useModelContext();
  const { facet2FacetItem } = context;
  const { category = [] } = facet2FacetItem;

  const CategoryItems = category.map((categoryItem) => {
    const item = categoryColorAndIcon[categoryItem];
    return (
      <Styled.CategoryContainer>
        <Styled.ImgDiv>
          <img src={item.legendIcon} alt='categoryIcon' />
        </Styled.ImgDiv>
        <Styled.CategoryText>{categoryItem}</Styled.CategoryText>
      </Styled.CategoryContainer>
    )
  });
  
  return (
    <Styled.LegendContainer display={display}>
      <Styled.LegendTitle display={display}>
        <Styled.Title display={display}>Node Category</Styled.Title>
        <Styled.ToggleButton onClick={() => setDisplay(!display)}>
          <img src={toggleSvg} alt='icon' />
        </Styled.ToggleButton>
      </Styled.LegendTitle>
      {display && CategoryItems}
    </Styled.LegendContainer>
  );
};

export default LegendView;
