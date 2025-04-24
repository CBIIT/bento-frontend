/* eslint-disable import/no-cycle */
import React from 'react';
import NodeView from '../Node/NodeView';
import {
  getCategoryColorAndIcon,
} from '../../Category/helper';
import {
  StyleCategoryTitle,
  StyledCategoryContainer,
  StyledCategoryIcon,
  StyledCatergoryOuterContainer,
  StyledCloseButton,
  StyledCloseIcon,
  StyledLeftBorder,
} from './Category.styled';

const CategoryView = ({
  category,
  nodes,
  isOverLayTable,
  onCloseOverlayTable,
  matches = {},
}) => {
  const categoryIconAndColor = getCategoryColorAndIcon(category);
  const iconURL = categoryIconAndColor?.tableIcon;

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
          <StyledCloseButton
            onClick={onCloseOverlayTable}
            className={`closeButton_${category}`}
          >
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
            textSearchDetail={{
              ...matches[node.id],
              searchText: matches?.searchText,
            }}
          />
        ))
      }
    </StyledCatergoryOuterContainer>
  );
};

export default CategoryView;
