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
  StyledCloseButton,
  StyledCloseIcon,
  StyledLeftBorder
} from './Category.styled';

const CategoryView = ({
  category,
  nodes,
  isOverLayTable,
  onCloseOverlayTable
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
        { isOverLayTable && (
          <StyledCloseButton onClick={onCloseOverlayTable}>
            <StyledCloseIcon />
          </StyledCloseButton>
        )}
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
            isOverLayTable={isOverLayTable}
          />
        ))
      }
    </StyledCatergoryOuterContainer>
  );
} 

export default CategoryView;
