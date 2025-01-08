import React from 'react';
import NodeView from '../node/NodeView';
import {
  categoryColorAndIcon,
} from '../../Category/helper';
import {
  StyleCategoryTitle,
  StyledCategoryContainer,
  StyledCategoryIcon,
  StyledCatergoryOuterContainer,
  StyledLeftBorder
} from './Category.styled';

const CategoryView = ({
  category,
  nodes
}) => {
  const categoryIconAndColor = categoryColorAndIcon[category];
  const iconURL = categoryIconAndColor.tableIcon;
  return (
    <StyledCatergoryOuterContainer
      categoryStyles={categoryIconAndColor}
      className={`catergoryOuterContainer_${category}`}
    >
      <StyledCategoryContainer
        categoryStyles={categoryIconAndColor}
        className={`categoryIconAndColor_${category}`}
      >
        <StyledCategoryIcon
          src={iconURL}
          alt="icon"
          className="categoryIcon"
        />
        <StyleCategoryTitle className={`categoryTitle_${category}`}>
          {category}
        </StyleCategoryTitle>
      </StyledCategoryContainer>
      <StyledLeftBorder
        categoryStyles={categoryIconAndColor}
        className={`leftBorder_${category}`}
      />
      {
        nodes.map((node) => (
          <NodeView
            node={node}
            key={node.id}
            title={node.title}
            category={category}
            categoryIcon={iconURL}
            description={node.description}
          />
        ))
      }
    </StyledCatergoryOuterContainer>
  );
} 

export default CategoryView;
