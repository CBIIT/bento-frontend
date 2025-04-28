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
  StyledCatTitleAndIcon,
} from './Category.styled';

const CategoryView = ({
  category,
  nodes,
  isOverLayTable,
  onCloseOverlayTable,
  matches = {},
  tableViewConfig = {},
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
        <StyledCatTitleAndIcon>
          <StyledCategoryIcon
            src={iconURL}
            alt="icon"
            className="categoryIcon"
          />
          <StyleCategoryTitle className={`categoryTitle_${category}`}>
            {category}
          </StyleCategoryTitle>
        </StyledCatTitleAndIcon>
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
            tableColumns={tableViewConfig?.columns}
          />
        ))
      }
    </StyledCatergoryOuterContainer>
  );
};

export default CategoryView;
