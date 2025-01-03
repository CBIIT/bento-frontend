import React from 'react';
import NodeView from '../node/NodeView';
import {
  defaultCategory,
  getCategoryStyle,
  tableNodeCategoryList
} from '../../Category/helper';
import {
  StyleCategoryTitle,
  StyledCategoryContainer,
  StyledCategoryIcon,
  StyledLeftBorder
} from './Category.styled';

const CategoryView = ({
  category,
  nodes
}) => {

  const categoryStyles = getCategoryStyle(category);
  const iconURL = tableNodeCategoryList[category].icon || defaultCategory.icon;
  return (
    <div>
      <StyledCategoryContainer categoryStyles={categoryStyles} >
        <StyledCategoryIcon src={iconURL} alt="icon" />
        <StyleCategoryTitle>{category}</StyleCategoryTitle>
      </StyledCategoryContainer>
      <StyledLeftBorder categoryStyles={categoryStyles} />
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
    </div>
  );
} 

export default CategoryView;
