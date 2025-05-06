import React, { useState } from 'react';
import toggleSvg from '../../Category/icons/Legend/lg_link.svg';
import * as Styled from './Legend.styled';
import { useModelContext } from '../../../state/NavContextProvider';
import { getCategoryColorAndIcon } from '../../Category/helper';
import relationshipSvg from '../../Category/icons/Legend/lg_relationship_links.svg';

const LegendView = () => {
  const [display, setDisplay] = useState(true);

  const { context } = useModelContext();
  const { facet2FacetItem } = context;
  const { category = [] } = facet2FacetItem;

  const CategoryItems = category.map((categoryItem) => {
    const item = getCategoryColorAndIcon(categoryItem);
    return (
      <Styled.CategoryContainer>
        <Styled.ImgDiv>
          <img src={item?.legendIcon} alt="relationshipIcon" />
        </Styled.ImgDiv>
        <Styled.CategoryText>{categoryItem}</Styled.CategoryText>
      </Styled.CategoryContainer>
    );
  });

  return (
    <Styled.LegendContainer display={display}>
      <Styled.LegendTitle display={display}>
        <Styled.Title display={display}>Node Category</Styled.Title>
        <Styled.ToggleButton onClick={() => setDisplay(!display)}>
          <img src={toggleSvg} alt="icon" />
        </Styled.ToggleButton>
      </Styled.LegendTitle>
      {display && (
        <>
          <Styled.CategoryContainer>
            <Styled.ImgDiv>
              <img src={relationshipSvg} alt="categoryIcon" />
            </Styled.ImgDiv>
            <Styled.CategoryText>relationship links</Styled.CategoryText>
          </Styled.CategoryContainer>
          {CategoryItems}
        </>
      )}
    </Styled.LegendContainer>
  );
};

export default LegendView;
